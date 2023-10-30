package trizzle.trizzlebackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import trizzle.trizzlebackend.OauthService.GoogleOauthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login/oauth2/code")
public class OauthController {

    @Autowired
    GoogleOauthService googleOauthService = new GoogleOauthService();

    @GetMapping("/google")  // google oauth2 redirect uri -> /login/oauth2/code/google?code={} 형식
    public ResponseEntity googleLogin(@RequestParam String code) {
        String token = googleOauthService.getAccessToken(code);
        return ResponseEntity.ok()
                .body(token);
    }
}
