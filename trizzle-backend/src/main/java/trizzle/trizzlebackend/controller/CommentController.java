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
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        Comment com = commentService.insertComment(comment, accountId);
        String profileImg = userService.searchUser(accountId).getProfileImage();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "save success");
        response.put("comment", com);
        response.put("profileImg", profileImg);
        return ResponseEntity.ok().body(response);
    };

    @GetMapping("/{postId}/comments")
    public ResponseEntity getCommentByPost(@PathVariable("postId") String postId, HttpServletRequest request ){
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        List<Object> comments = commentService.findByPost(postId, accountId);
        return ResponseEntity.ok().body(comments);
    };

    @GetMapping("/mypage/comments")
    public ResponseEntity getCommentById(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        List<Comment> comments = commentService.findByAccount(accountId);

        return ResponseEntity.ok().body(comments);
    };

    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity postDeleteComment(@PathVariable("commentId") String commentId, @PathVariable("postId") String postId, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);

        Comment comment = commentService.searchComment(commentId);
        commentService.deleteComment(comment);

        List<Object> commentLists = commentService.findByPost(postId, accountId);
        return ResponseEntity.ok().body(commentLists);
    };

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity mypageDeleteComment(@PathVariable("commentId") String commentId, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
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
