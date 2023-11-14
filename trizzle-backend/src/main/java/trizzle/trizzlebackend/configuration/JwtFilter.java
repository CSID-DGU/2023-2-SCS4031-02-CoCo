package trizzle.trizzlebackend.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.parser.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.error.ErrorCode;
import trizzle.trizzlebackend.error.ErrorResponse;
import trizzle.trizzlebackend.error.TokenError;

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
                throw new TokenError("로그인이 필요합니다", ErrorCode.Unauthorized);
            }

            // Token Expired 되었는지 여부
            if (JwtUtil.isExpired(token, secretKey)) {
                throw new TokenError("다시 로그인해주세요", ErrorCode.Unauthorized);
            }

            // userId token에서 꺼내기
            String accountId = JwtUtil.getAccountId(token, secretKey);
            log.info("{}", accountId);

            //권한부여
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(accountId, null, List.of(new SimpleGrantedAuthority("USER")));

            // 원래 동작 수행
            filterChain.doFilter(request, response);
        } catch (TokenError e) {
            log.error(e.getMessage());
            ErrorResponse res = new ErrorResponse(e.getErrorCode());
            res.setMessage(e.getMessage());
            response.setStatus(e.getErrorCode().getStatus());
            response.getWriter().write(res.toString());
        }
    }
}
