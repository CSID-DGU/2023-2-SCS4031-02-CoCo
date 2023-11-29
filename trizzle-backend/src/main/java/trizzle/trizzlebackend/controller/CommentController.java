package trizzle.trizzlebackend.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Comment;
import trizzle.trizzlebackend.domain.Notification;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.error.TokenError;
import trizzle.trizzlebackend.service.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final NotificationService notificationService;
    private final PostService postService;
    private final ReviewService reviewService;
    private final UserService userService;
    @Value("${jwt.secret}")
    private String secretKey;


    @PostMapping("/api/comments")
    public ResponseEntity postComment(@RequestBody Comment comment, HttpServletRequest request) {
        try {
            String token = JwtUtil.getAccessTokenFromCookie(request);
            String accountId = JwtUtil.getAccountId(token, secretKey);

            Comment com = commentService.insertComment(comment, accountId);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "success");
            List<Object> comments = new ArrayList<>();

            if(com.getReviewId() == null) {
                comments = commentService.findByPost(com.getPostId(), accountId);

            } else {
                comments = commentService.findByReview(com.getReviewId(), accountId);
            }
            response.put("comments", comments);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred.");
        }
    };

    @GetMapping("/api/comments")
    public ResponseEntity getComments(@RequestParam(value = "postId", required = false) String postId,
                                      @RequestParam(value = "reviewId", required = false) String reviewId,
                                      HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = new String();
        if(token == null || JwtUtil.isExpired(token, secretKey)) accountId = "";
        else accountId = JwtUtil.getAccountId(token, secretKey);

        List<Object> comments;
            if (postId != null) {
                comments = commentService.findByPost(postId, accountId);
            } else if (reviewId != null) {
                comments = commentService.findByReview(reviewId, accountId);
            } else {
                if(accountId.equals("")) return ResponseEntity.ok().body("please login");
                List<Comment> userComments = commentService.findByAccount(accountId);
                return ResponseEntity.ok().body(userComments);
            }

            return ResponseEntity.ok().body(comments);
    }

    @DeleteMapping("/api/{type}/{postId}/comments/{commentId}")
    public ResponseEntity deleteComment(
            @PathVariable("type") String type,
            @PathVariable("postId") String postId,
            @PathVariable("commentId") String commentId,
            HttpServletRequest request) {

        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        Comment comment = commentService.searchComment(commentId);
        commentService.deleteComment(comment);

        List<Object> commentLists;

        switch (type) {
            case "post":
                commentLists = commentService.findByPost(postId, accountId);
                break;
            case "review":
                commentLists = commentService.findByReview(postId, accountId);
                break;
            case "mypage":
                List<Comment> commentList = commentService.findByAccount(accountId);
                return ResponseEntity.ok().body(commentList);
            default:
                return ResponseEntity.badRequest().body("Invalid comment type");
        }

        return ResponseEntity.ok().body(commentLists);
    }


    @PatchMapping("/api/{type}/comments/fix/{commentId}")
    public ResponseEntity fixComment(@PathVariable("type") String type,@PathVariable("commentId") String commentId, HttpServletRequest request) {
        Comment comment = commentService.fixComment(commentId);
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        List<Object> commentLists = new ArrayList<>();

        switch (type) {
            case "post":
                String postId = comment.getPostId();
                commentLists = commentService.findByPost(postId, accountId);
                break;
            case "review":
                String reviewId = comment.getReviewId();
                commentLists = commentService.findByReview(reviewId, accountId);
                break;
        }
        return ResponseEntity.ok().body(commentLists);
    };
}
