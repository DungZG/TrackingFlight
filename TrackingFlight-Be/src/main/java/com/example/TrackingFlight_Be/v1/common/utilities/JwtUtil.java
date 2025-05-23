package com.example.TrackingFlight_Be.v1.common.utilities;
import io.jsonwebtoken.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    // Khóa bí mật (tốt nhất lấy từ file config hoặc biến môi trường)
    private final String SECRET_KEY = "your-256-bit-secret-your-256-bit-secret"; // 32 ký tự

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Thời gian sống của token (ví dụ 10h)
    private final long expirationMs = 10 * 60 * 60 * 1000;

    // Tạo token dựa vào username
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Lấy username từ token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Kiểm tra token còn hiệu lực hay không
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token không hợp lệ
            return false;
        }
    }
}
