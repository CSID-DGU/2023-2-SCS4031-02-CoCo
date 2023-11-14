package trizzle.trizzlebackend.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
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

            //token 꺼내기
            String token = JwtUtil.getAccessTokenFromCookie(request);

            // cookie에 token 없을경우 block
            if (token == null) {
                throw new ServletException("토큰이 존재하지 않습니다.");
            }

            // Token Expired 되었는지 여부
            if (JwtUtil.isExpired(token, secretKey)) {
                throw new ServletException("토큰이 만료되었습니다.");
            }

            // userId token에서 꺼내기
            String accountId = JwtUtil.getAccountId(token, secretKey);
            log.info("{}", accountId);

            //권한부여
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(accountId, null, List.of(new SimpleGrantedAuthority("USER")));

            //detail
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}