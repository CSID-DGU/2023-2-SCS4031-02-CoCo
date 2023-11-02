package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import trizzle.trizzlebackend.OauthService.GoogleOauthService;
import trizzle.trizzlebackend.OauthService.KakaoOauthService;
import trizzle.trizzlebackend.domain.User;
import trizzle.trizzlebackend.service.LoginService;

import java.util.Map;

@RestController
@RequestMapping("/login/oauth2/code")
public class OauthController {

    private final LoginService loginService;
    private final GoogleOauthService googleOauthService;
    private final KakaoOauthService kakaoOauthService;

    public OauthController(LoginService loginService, GoogleOauthService googleOauthService, KakaoOauthService kakaoOauthService) {
        this.loginService = loginService;
        this.googleOauthService = googleOauthService;
        this.kakaoOauthService = kakaoOauthService;
    }

    @GetMapping("/google")  // google oauth2 redirect uri -> /login/oauth2/code/google?code={} 형식
    public ResponseEntity googleLogin(@RequestParam String code, HttpServletResponse response) {
        String token = googleOauthService.getAccessToken(code);
        User userInfo = googleOauthService.getUserInfo(token);
        Map<String, String> result =loginService.login(token, userInfo);

        return responseMethod(result, response);
    }

    @GetMapping("/kakao")   // // kakao oauth2 redirect uri -> /login/oauth2/code/google?code={} 형식
    public ResponseEntity kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        String token = kakaoOauthService.getAccessToken(code);
        User userInfo = kakaoOauthService.getUserInfo(token);
        Map<String, String> result = loginService.login(token, userInfo);

        return responseMethod(result, response);
    }

    private ResponseEntity responseMethod(Map<String, String> result, HttpServletResponse response) {
        String responseMessage = result.get("message");

        // 로그인 성공하고 accessToken 생성되었을 경우
        if (responseMessage.equals("login success")) {
            String accessToken = result.get("accessToken");

            // cookie 설정 (cookie에 accessToken 담아서 응답)
            Cookie cookie = new Cookie("accessToken", accessToken);
            cookie.setMaxAge(3600);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            return ResponseEntity.ok()
                    .body("{\"message\": \"" + responseMessage + "\"}");    // {"message":"login access"}
        }

        // 로그인 결과 account_id와 nickname 추가로 필요한 경우
        return ResponseEntity.ok()
                .body(result);
    }
}
