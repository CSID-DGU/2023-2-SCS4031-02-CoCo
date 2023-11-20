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
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.service.PostService;

import java.util.HashMap;
import java.util.List;
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

    @GetMapping("/search")
    public ResponseEntity getSearchPost(@RequestParam(value = "region", required = false) String region,
                                        @RequestParam(value = "keyword", required = false) String keyword,
                                        @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                        @RequestParam(value = "sort", required = false, defaultValue = "new") String sort) {
        Pageable pageable = PageRequest.of(page, 20);

        switch (sort) {
            case "new":
                pageable = PageRequest.of(page, 20, Sort.by("postRegistrationDate").descending());
                break;
            case "old":
                pageable = PageRequest.of(page, 20, Sort.by("postRegistrationDate").ascending());
                break;
            case "like":
                pageable = PageRequest.of(page, 20, Sort.by("likeCount").descending());
                break;
        }

        Page<ElasticPost> posts = postService.findAllPost(pageable);
        return ResponseEntity.ok().body(posts);
    }

    @PutMapping("/{postId}")
    public ResponseEntity updatePost(@RequestBody Post post, @PathVariable("postId") String id, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        String postId = postService.updatePost(post, id, accountId).getId();

        Map<String, String> response = new HashMap<>();
        response.put("message", "update success");
        response.put("postId", postId);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/myposts")
    public ResponseEntity getMyPosts(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<Post> myPosts = postService.findMyPosts(accountId);
        return ResponseEntity.ok()
                .body(myPosts);
    }

    @DeleteMapping("/myposts/{postId}")
    public ResponseEntity deleteMyPost(@PathVariable("postId") String postId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        Post post = postService.searchPost(postId, request);

        if (post != null) {
            postService.deletePost(postId);
            String message = "delete success";
            List<Post> myPosts = postService.findMyPosts(accountId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", message);
            response.put("myplans", myPosts);

            return ResponseEntity.ok()
                    .body(response);
        } else {
            String message = "wrong approach";
            return ResponseEntity.ok()
                    .body("{\"message\": \"" + message + "\"}");
        }
    }

    @GetMapping("/bookmarks")
    public ResponseEntity getBookmarkPosts(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        List<Post> bookmarkPosts = postService.findBookmarkPosts(accountId);

        return ResponseEntity.ok(bookmarkPosts);
    }

    @GetMapping("/home")
    public ResponseEntity getTop4Posts() {
        List<Post> posts = postService.findTop4Posts();
        return ResponseEntity.ok(posts);
    }
}
