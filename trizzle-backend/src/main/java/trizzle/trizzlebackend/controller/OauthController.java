package trizzle.trizzlebackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import trizzle.trizzlebackend.OauthService.GoogleOauthService;
import trizzle.trizzlebackend.OauthService.KakaoOauthService;
import trizzle.trizzlebackend.domain.User;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login/oauth2/code")
public class OauthController {

    @Autowired
    GoogleOauthService googleOauthService = new GoogleOauthService();
    @Autowired
    KakaoOauthService kakaoOauthService = new KakaoOauthService();

    @GetMapping("/google")  // google oauth2 redirect uri -> /login/oauth2/code/google?code={} 형식
    public ResponseEntity googleLogin(@RequestParam String code) {
        User userInfo = googleOauthService.getUserInfo(code);
        return ResponseEntity.ok()
                .body(userInfo);
    }

    @GetMapping("/kakao")
    public ResponseEntity kakaoLogin(@RequestParam String code) {
        String token = kakaoOauthService.getAccessToken(code);
        return ResponseEntity.ok()
                .body(token);
    }
}
