package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.ElasticPost;
import trizzle.trizzlebackend.domain.ElasticReview;
import trizzle.trizzlebackend.domain.Plan;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.dto.response.ReviewDto;
import trizzle.trizzlebackend.service.ReviewService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
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
        ReviewDto reviewDto = reviewService.searchReview(reviewId, request);
        return ResponseEntity.ok()
                .body(reviewDto);
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

    @GetMapping("/otherreviews/{accountId}")
    public ResponseEntity getOtherReviews(@PathVariable("accountId") String accountId) {
        List<Review> reviews = reviewService.findPublicReview(accountId);
        return ResponseEntity.ok()
                .body(reviews);
    }

    @GetMapping("/search")
    public ResponseEntity getSearchPost(@RequestParam(value = "region", required = false) String region,
                                        @RequestParam(value = "keyword", required = false) String keyword,
                                        @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                        @RequestParam(value = "sort", required = false, defaultValue = "new") String sort) {
        Pageable pageable = PageRequest.of(page, 20);

        switch (sort) {
            case "new":
                pageable = PageRequest.of(page, 20, Sort.by("reviewRegistrationDate").descending());
                break;
            case "old":
                pageable = PageRequest.of(page, 20, Sort.by("reviewRegistrationDate").ascending());
                break;
            case "like":
                pageable = PageRequest.of(page, 20, Sort.by("likeCount").descending());
                break;
        }

        Page<ElasticReview> posts = reviewService.findAllReview(pageable);
        return ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/myreviews/{reviewId}")
    public ResponseEntity deleteMyReview(@PathVariable("reviewId") String reviewId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        Review review = reviewService.checkMyReview(reviewId, accountId);

        if (review != null) {
            reviewService.deleteReview(reviewId, accountId);
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
    public ResponseEntity myReviewWithPlaceId(@PathVariable("placeId") String placeId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        List<Review> reviews = reviewService.findMyReviewsWithPlaceId(accountId, placeId);

        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/placeReviews/{placeId}")
    public ResponseEntity reviewWithPlaceId(@PathVariable("placeId") String placeId) {
        List<Review> reviews = reviewService.findReviewsWithPlaceId(placeId);

        return ResponseEntity.ok(reviews);
    }

    /*review 연동*/
    @PutMapping("/connect/{reviewId}")
    public ResponseEntity reviewConnect(@PathVariable("reviewId") String reviewId, @RequestBody Plan plan, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);


        String message = reviewService.reviewConnect(plan, reviewId, accountId);

        return ResponseEntity.ok()
                .body("{\"message\": \"" + message + "\"}");
    }
}
