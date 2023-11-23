package trizzle.trizzlebackend.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.domain.User;
import trizzle.trizzlebackend.service.PostService;
import trizzle.trizzlebackend.service.ReviewService;
import trizzle.trizzlebackend.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/user")
public class UserContoller {

    private final UserService userService;
    private final PostService postService;
    private final ReviewService reviewService;

    @Value("${jwt.secret}")
    private String secretKey;


    public UserContoller(
            UserService userService,
            PostService postService,
            ReviewService reviewService) {
        this.userService = userService;
        this.postService = postService;
        this.reviewService = reviewService;
    };

    @GetMapping("")
    public ResponseEntity searchUser(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        User user = userService.searchUser(accountId);

        return ResponseEntity.ok().body(user);
    };

    @GetMapping("/feed/{accountId}")
    public ResponseEntity getFeedData(@PathVariable("accountId") String accountId, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        String account = new String();
        if (accountId.equals("my")) {
            String token = JwtUtil.getAccessTokenFromCookie(request);
            account = JwtUtil.getAccountId(token, secretKey);

        } else {
            account = accountId;
        }
        ;
        User userData = userService.searchUser(account);
        List<Post> userPosts = postService.findMyPosts(account).stream()
                .limit(3)
                .collect(Collectors.toList());
        List<Review> userReviews = reviewService.findMyReviews(account).stream()
                .limit(3)
                .collect(Collectors.toList());
        response.put("profile", userData);
        response.put("posts", userPosts);
        response.put("reviews", userReviews);

        return ResponseEntity.ok().body(response);
    };

    @PutMapping("/{accountId}")
    public ResponseEntity updateUser(@PathVariable("accountId") String accountId ,@RequestBody User user,HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String account = JwtUtil.getAccountId(token, secretKey);
        if(account.equals(accountId)) {
            User updatedUser = userService.updateUser(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "success");
            response.put("updatedUser", updatedUser);

            return ResponseEntity.ok().body(response);
        }else {
            String message = "wrong approach";
            return ResponseEntity.ok()
                    .body("{\"message\": \"" + message + "\"}");
        }
    };

    @PatchMapping("/profileimg")
    public ResponseEntity updateUserProfileImg(@RequestBody String profileImg, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String account = JwtUtil.getAccountId(token, secretKey);
        User user = userService.patchProfileImg(profileImg, account);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "success");
        response.put("user", user);

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/header")
    public ResponseEntity getProfileImg(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        if(token == null || JwtUtil.isExpired(token, secretKey)) {
            String message = "not login";
            return ResponseEntity.ok()
                    .body("{\"message\": \"" + message + "\"}");
        } else {
            String account = JwtUtil.getAccountId(token, secretKey);
            Map<String, String> response = userService.getHeaderUserInfo(account);
            return ResponseEntity.ok().body(response);
        }
    }
};
