package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.service.ReviewService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    @Value("${jwt.secret}")
    private String secretKey;
    @PostMapping("")
    public ResponseEntity createReview(@RequestBody Review review, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        String reviewId = reviewService.insertReview(review, accountId).getId();
        Map<String, String> response = new HashMap<>();
        response.put("message", "save success");
        response.put("reviewId",reviewId);
        return ResponseEntity.ok()
                .body(response);
    }
}
