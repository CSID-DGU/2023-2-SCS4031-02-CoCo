package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.service.PostService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    @Value("${jwt.secret}")
    private String secretKey;
    private final PostService postService;

    @PostMapping("")
    public ResponseEntity createPost(@RequestBody Post post, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        String postId = postService.insertPost(post, accountId).getId();
        Map<String, String> response = new HashMap<>();
        response.put("message", "save success");
        response.put("postId", postId);
        return ResponseEntity.ok()
                .body(response);

    }

    @GetMapping("/{postId}")
    public ResponseEntity getPost(@PathVariable("postId") String postId, HttpServletRequest request) {
        Post post = postService.searchPost(postId, request);
        return ResponseEntity.ok()
                .body(post);
    }


}
