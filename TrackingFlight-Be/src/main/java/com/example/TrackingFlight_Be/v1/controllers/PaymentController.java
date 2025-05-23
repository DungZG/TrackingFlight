package com.example.TrackingFlight_Be.v1.controllers;




import com.example.TrackingFlight_Be.v1.config.Config;
import com.example.TrackingFlight_Be.v1.dto.request.PaymentResponse;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import com.example.TrackingFlight_Be.v1.entity.Payment;
import com.example.TrackingFlight_Be.v1.entity.Ticket;
import com.example.TrackingFlight_Be.v1.entity.User;
import com.example.TrackingFlight_Be.v1.repositories.FlightRepository;
import com.example.TrackingFlight_Be.v1.repositories.PaymentRepository;
import com.example.TrackingFlight_Be.v1.repositories.TicketRepository;
import com.example.TrackingFlight_Be.v1.repositories.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

import static com.example.TrackingFlight_Be.v1.config.Config.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    @GetMapping("/create_payment")
    public ResponseEntity<?> createPayment(HttpServletRequest req, HttpServletResponse response) throws UnsupportedEncodingException {
        String orderType = "other";

        // Lấy thông tin từ params hoặc cố định test
        String bankCode = req.getParameter("bankCode");
        String amountParam = req.getParameter("amount");
        long amount = (amountParam != null && !amountParam.isEmpty()) ? Long.parseLong(amountParam) * 100 : 0; // ví dụ 100k * 100 (VNPAY nhận amount theo đơn vị *100)
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = Config.getIpAddress(req);
        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", Config.vnp_Version);
        vnp_Params.put("vnp_Command", Config.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);

        // Bạn có thể đính kèm dữ liệu vào vnp_OrderInfo (vd: userId=xx;flightId=yy;seat=A1)
        String orderInfo = "Thanh toan don hang: " + vnp_TxnRef + ";userId=123;flightId=456;seat=A1";
        vnp_Params.put("vnp_OrderInfo", orderInfo);
        vnp_Params.put("vnp_OrderType", orderType);

        String locale = req.getParameter("language");
        if (locale != null && !locale.isEmpty()) {
            vnp_Params.put("vnp_Locale", locale);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }

        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Sắp xếp tham số
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Iterator<String> itr = fieldNames.iterator(); itr.hasNext(); ) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString())).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setStatus("Ok");
        paymentResponse.setMessage("success");
        paymentResponse.setUrl(paymentUrl);

        return ResponseEntity.ok(paymentResponse);
    }

    @GetMapping("/vnpay_return")
    public void vnpayReturn(HttpServletRequest req, HttpServletResponse response) throws IOException {
        Map<String, String> vnp_Params = new HashMap<>();
        Enumeration<String> params = req.getParameterNames();
        while(params.hasMoreElements()) {
            String paramName = params.nextElement();
            vnp_Params.put(paramName, req.getParameter(paramName));
        }

        String vnp_SecureHash = vnp_Params.remove("vnp_SecureHash");

        String hashData = vnp_Params.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .filter(e -> e.getValue() != null && !e.getValue().isEmpty())
                .map(e -> e.getKey() + "=" + e.getValue())
                .reduce((a,b) -> a + "&" + b)
                .orElse("");

        String calculatedHash = Config.hmacSHA512(Config.secretKey, hashData);

        if (!calculatedHash.equals(vnp_SecureHash)) {
            response.sendRedirect("http://localhost:4200/user/payment/fail");
            return;
        }

        String responseCode = vnp_Params.get("vnp_ResponseCode");
        if (!"00".equals(responseCode)) {
            response.sendRedirect("http://localhost:4200/user/payment/fail");
            return;
        }

        // Nếu tới đây nghĩa là thanh toán thành công
        String txnRef = vnp_Params.get("vnp_TxnRef");
        String amountStr = vnp_Params.get("vnp_Amount");
        Long amount = Long.parseLong(amountStr) / 100;

        String orderInfo = vnp_Params.get("vnp_OrderInfo");
        Map<String, String> orderData = new HashMap<>();
        if (orderInfo != null && orderInfo.contains(";")) {
            String[] parts = orderInfo.split(";");
            for (String part : parts) {
                if (part.contains("=")) {
                    String[] kv = part.split("=");
                    orderData.put(kv[0].trim(), kv[1].trim());
                }
            }
        }

        Long userId = Long.parseLong(orderData.getOrDefault("userId", "0"));
        Long flightId = Long.parseLong(orderData.getOrDefault("flightId", "0"));
        String seatNumber = orderData.getOrDefault("seat", "");
        String ticketType = "Tiêu Chuẩn";
        String ticketClass = "Economy";

        User user = userRepository.findById(userId).orElse(null);
        Flight flight = flightRepository.findById(flightId).orElse(null);

        if (user == null || flight == null) {
            response.sendRedirect("http://localhost:4200/user/payment/fail");
            return;
        }

        Payment payment = new Payment();
        payment.setAmount(amount.floatValue());
        payment.setStatus("SUCCESS");
        payment.setPaymentMethod("VNPay");
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setFlight(flight);
        ticket.setTicketType(ticketType);
        ticket.setSeatNumber(seatNumber);
        ticket.setBookingTime(LocalDateTime.now());
        ticket.setPayment(payment);
        ticket.setTicketClass(ticketClass);
        ticket.setPrice(amount.floatValue());
        ticket.setStatus("BOOKED");

        ticketRepository.save(ticket);

        // Redirect về trang thành công và gửi các tham số cần thiết
        String redirectUrl = String.format(
                "http://localhost:4200/user/payment/success?vnp_TxnRef=%s&vnp_Amount=%d&vnp_PayDate=%s",
                txnRef, amount, vnp_Params.getOrDefault("vnp_PayDate", ""));

        response.sendRedirect(redirectUrl);
    }
}
