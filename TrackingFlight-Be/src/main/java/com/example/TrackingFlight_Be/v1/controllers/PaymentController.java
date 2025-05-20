package com.example.TrackingFlight_Be.v1.controllers;



import com.example.TrackingFlight_Be.auth.common.entity.User;
import com.example.TrackingFlight_Be.v1.config.Config;
import com.example.TrackingFlight_Be.v1.dto.request.PaymentResponse;
import com.example.TrackingFlight_Be.v1.entity.Payment;
import com.example.TrackingFlight_Be.v1.entity.Ticket;
import com.example.TrackingFlight_Be.v1.repositories.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

import static com.example.TrackingFlight_Be.v1.config.Config.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @GetMapping("/create_payment")
    public ResponseEntity<?> createPayment(HttpServletRequest req) throws UnsupportedEncodingException {
        String orderType = "other";
//        long amount = Integer.parseInt(req.getParameter("amount"))*100;
        String bankCode = req.getParameter("bankCode");
        long amount = 10000000;

        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = Config.getIpAddress(req);

        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
//        if (bankCode != null && !bankCode.isEmpty()) {
//            vnp_Params.put("vnp_BankCode", bankCode);
//        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = req.getParameter("language");
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
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

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
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
        return ResponseEntity.status(HttpStatus.OK).body(paymentResponse);
//        com.google.gson.JsonObject job = new JsonObject();
//        job.addProperty("code", "00");
//        job.addProperty("message", "success");
//        job.addProperty("data", paymentUrl);
//        Gson gson = new Gson();
//        resp.getWriter().write(gson.toJson(job));

    }

    @GetMapping("/vnpay_return")
    public ResponseEntity<?> vnpayReturn(HttpServletRequest req) {
        Map<String, String> vnp_Params = new HashMap<>();
        for (Enumeration<String> params = req.getParameterNames(); params.hasMoreElements();) {
            String paramName = params.nextElement();
            vnp_Params.put(paramName, req.getParameter(paramName));
        }

        String vnp_SecureHash = vnp_Params.remove("vnp_SecureHash");
        // Xác thực chữ ký
        String hashData = vnp_Params.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .filter(e -> e.getValue() != null && !e.getValue().isEmpty())
                .map(e -> e.getKey() + "=" + e.getValue())
                .reduce((a, b) -> a + "&" + b)
                .orElse("");

        String calculatedHash = Config.hmacSHA512(Config.secretKey, hashData);

        if (!calculatedHash.equals(vnp_SecureHash)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Chữ ký không hợp lệ");
        }

        String responseCode = vnp_Params.get("vnp_ResponseCode");
        String txnRef = vnp_Params.get("vnp_TxnRef");
        String amountStr = vnp_Params.get("vnp_Amount"); // đơn vị VNĐ * 100
        Long amount = Long.parseLong(amountStr) / 100;

        if ("00".equals(responseCode)) {
            // Thanh toán thành công -> Lưu Payment
            // Giả sử bạn có phương thức lấy userId và ticketId từ session hoặc param
//            Long userId = getCurrentUserId(); // phương thức bạn tự implement
//            Long ticketId = getTicketIdFromTxnRef(txnRef); // phương thức lấy ticketId từ txnRef hoặc param

            Payment payment = new Payment();
            payment.setAmount(amount.floatValue());
            payment.setStatus("SUCCESS");
            payment.setPaymentMethod("VNPay");
            payment.setCreatedAt(LocalDateTime.now());
            payment.setUpdatedAt(LocalDateTime.now());

            // Lấy User và Ticket từ DB (giả sử đã có repository)
//            User user = UserRepository.findById(userId).orElse(null);
//            Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
//
//            payment.setUser(user);
//            payment.setTicket(ticket);
//
//            paymentRepository.save(payment);

            // Trả về trang thành công hoặc thông báo
            return ResponseEntity.ok("Thanh toán thành công!");
        } else {
            // Thanh toán không thành công
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thanh toán không thành công");
        }
    }
}
