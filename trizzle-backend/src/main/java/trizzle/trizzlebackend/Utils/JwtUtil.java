package trizzle.trizzlebackend.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;


public class JwtUtil {

    /* JWT에서 userId가져오는 메소드*/
    public static String getUserId(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().get("userId", String.class);
    }

    /* JWT 만료되었는지 확인하는 메소드*/
    public static boolean isExpired(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().getExpiration().before(new Date());
    }

    /*JWT 생성하는 메소드 */
    public static String createJwt(String userId, String secretKey, Long expiredMS) {
        Claims claims = Jwts.claims();
        claims.put("userId", userId);   // claim(payload에 들어갈 정보)으로 userId

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMS))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
