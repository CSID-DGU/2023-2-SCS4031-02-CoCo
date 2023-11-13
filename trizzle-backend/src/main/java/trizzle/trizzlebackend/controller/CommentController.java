package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Comment;
import trizzle.trizzlebackend.service.CommentService;
import trizzle.trizzlebackend.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class CommentController {

    private final CommentService commentService;
    private final UserService userService;
    @Value("${jwt.secret}")
    private String secretKey;

    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    };

    @PostMapping("/comments")
    public ResponseEntity postComment(@RequestBody Comment comment, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        Comment com = commentService.insertComment(comment, accountId);
        String profileImg = userService.searchUser(accountId).getProfileImage();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "save success");
        response.put("comment", com);
        response.put("profileImg", profileImg);
        return ResponseEntity.ok().body(response);
    };

    @GetMapping("/post/{postId}/comments")
    public ResponseEntity getCommentByPost(@PathVariable("postId") String postId, HttpServletRequest request ){
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<Object> comments = commentService.findByPost(postId, accountId);
        return ResponseEntity.ok().body(comments);
    };

    @GetMapping("/review/{postId}/comments")
    public ResponseEntity getCommentByReview(@PathVariable("postId") String postId, HttpServletRequest request ){
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<Object> comments = commentService.findByReview(postId, accountId);
        return ResponseEntity.ok().body(comments);
    };

    @GetMapping("/mypage/comments")
    public ResponseEntity getCommentById(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<Comment> comments = commentService.findByAccount(accountId);

        return ResponseEntity.ok().body(comments);
    };

    @DeleteMapping("/post/{postId}/comments/{commentId}")
    public ResponseEntity postDeleteComment(@PathVariable("commentId") String commentId, @PathVariable("postId") String postId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        Comment comment = commentService.searchComment(commentId);
        commentService.deleteComment(comment);

        List<Object> commentLists = commentService.findByPost(postId, accountId);
        return ResponseEntity.ok().body(commentLists);
    };

    @DeleteMapping("/review/{postId}/comments/{commentId}")
    public ResponseEntity reviewDeleteComment(@PathVariable("commentId") String commentId, @PathVariable("postId") String postId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        Comment comment = commentService.searchComment(commentId);
        commentService.deleteComment(comment);

        List<Object> commentLists = commentService.findByReview(postId, accountId);
        return ResponseEntity.ok().body(commentLists);
    };

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity mypageDeleteComment(@PathVariable("commentId") String commentId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        Comment comment = commentService.searchComment(commentId);
        commentService.deleteComment(comment);

        List<Comment> commentLists = commentService.findByAccount(accountId);
        return ResponseEntity.ok().body(commentLists);
    };

    @PatchMapping("/comments/fix/{commentId}")
    public ResponseEntity fixComment(@PathVariable("commentId") String commentId) {
        Comment comment = commentService.fixComment(commentId);

        return ResponseEntity.ok().body(comment);
    };
}
