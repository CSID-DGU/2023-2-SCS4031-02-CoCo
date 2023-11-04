package trizzle.trizzlebackend.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import trizzle.trizzlebackend.Utils.JwtUtil;

import java.io.IOException;
import java.util.List;


@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final String secretKey;

    public JwtFilter(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

            // header에 token 없거나 Bearer 로 보내지 않으면 block
            if (authorization == null || !authorization.startsWith("Bearer ")) {
                throw new ServletException("Authorization 헤더가 잘못되었습니다.");
            }

            // Token 꺼내기
            String token = authorization.split(" ")[1];
            // Token Expired 되었는지 여부
            if (JwtUtil.isExpired(token, secretKey)) {
                throw new ServletException("토큰이 만료되었습니다.");
            }

            // userId token에서 꺼내기
            String userId = JwtUtil.getUserId(token, secretKey);
            log.info("{}", userId);

            //권한부여
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userId, null, List.of(new SimpleGrantedAuthority("USER")));

            //detail
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (Exception e) {
            log.error(e.getMessage());
        }



        filterChain.doFilter(request, response);
    }
}
