package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.service.ReviewService;

import java.util.HashMap;
import java.util.List;
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
        response.put("reviewId", reviewId);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity getReview(@PathVariable("reviewId") String reviewId, HttpServletRequest request) {
        Review review = reviewService.searchReview(reviewId, request);
        return ResponseEntity.ok()
                .body(review);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity updateReview(@RequestBody Review review, @PathVariable("reviewId") String id, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        String reviewId = reviewService.updateReview(review, id, accountId).getId();

        Map<String, String> response = new HashMap<>();
        response.put("message", "update success");
        response.put("reviewId", reviewId);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/myreviews")
    public ResponseEntity getMyReviews(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<Review> myReviews = reviewService.findMyReviews(accountId);
        return ResponseEntity.ok()
                .body(myReviews);
    }

    @DeleteMapping("/myreviews/{reviewId}")
    public ResponseEntity deleteMyReview(@PathVariable("reviewId") String reviewId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        Review review = reviewService.searchReview(reviewId, request);

        if (review != null) {
            reviewService.deleteReview(reviewId);
            String message = "delete success";
            List<Review> myReviews = reviewService.findMyReviews(accountId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", message);
            response.put("myplans", myReviews);

            return ResponseEntity.ok()
                    .body(response);
        } else {
            String message = "wrong approach";
            return ResponseEntity.ok()
                    .body("{\"message\": \"" + message + "\"}");
        }
    }

    @GetMapping("/bookmarks")
    public ResponseEntity getBookmarkReviews(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        List<Review> bookmarkReviews = reviewService.findBookmarkReviews(accountId);

        return ResponseEntity.ok(bookmarkReviews);
    }

    @GetMapping("/place/{placeId}")
    public ResponseEntity reviewWithPlaceId(@PathVariable("placeId") String placeId) {
        List<Review> reviews = reviewService.findReviewsWithPlaceId(placeId);

        return ResponseEntity.ok(reviews);
    }
}
