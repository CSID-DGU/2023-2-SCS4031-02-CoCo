package trizzle.trizzlebackend.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class AuthenticationConfig {
    @Value("${jwt.secret}")
    private String secretKey;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                .httpBasic(HttpBasicConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/login/google"),
                                new AntPathRequestMatcher("/api/login/kakao"),
                                new AntPathRequestMatcher("/api/login/oauth2/code/google"),
                                new AntPathRequestMatcher("/api/login/oauth2/code/kakao"),
                                new AntPathRequestMatcher("/api/login/additionalUserInfo"),
                                new AntPathRequestMatcher("/api/reviews/{reviewId}", "GET"),
                                new AntPathRequestMatcher("/api/posts/{postId}", "GET"),
                                new AntPathRequestMatcher("/api/upload/initiate"),
                                new AntPathRequestMatcher("/v2/video"),
                                new AntPathRequestMatcher("/api/upload/preSignedUrl"),
                                new AntPathRequestMatcher("/api/upload/complete"),
                                new AntPathRequestMatcher("/api/comments", "GET"),
                                new AntPathRequestMatcher("/api/user/header", "GET"),
                                new AntPathRequestMatcher("/api/user/feed/{accountId}", "GET"),
                                new AntPathRequestMatcher("/api/posts/search", "GET"),
                                new AntPathRequestMatcher("/api/posts/home", "GET"),
                                new AntPathRequestMatcher("/api/posts/otherposts/{accountId}", "GET"),
                                new AntPathRequestMatcher("/api/reviews/search", "GET"),
                                new AntPathRequestMatcher("/api/reviews/otherreviews/{accountId}", "GET"),
                                new AntPathRequestMatcher(("/api/inquiries/"), "GET")
                        ).permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtFilter(secretKey), UsernamePasswordAuthenticationFilter.class)
                .build();

    }
}
