package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.User;
import trizzle.trizzlebackend.service.UserService;



@RestController
@RequestMapping("/user")
public class UserContoller {

    private final UserService userService;

    @Value("${jwt.secret}")
    private String secretKey;


    public UserContoller(UserService userService) {
        this.userService = userService;
    };

    @GetMapping("")
    public ResponseEntity searchUser(HttpServletRequest request) {
//        Cookie tokenCookie = WebUtils.getCookie(request, "accessToken");
//        if(tokenCookie == null) return ResponseEntity.ok("로그인이 필요합니다.");

//        String token = tokenCookie.getValue();
        // 토큰 파싱
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);
        User user = userService.searchUser(accountId);

        return ResponseEntity.ok().body(user);
    };
};
