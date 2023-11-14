package trizzle.trizzlebackend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    @Value("${jwt.secret}")
    private String secretKey;
    public Post insertPost(Post post, String accountId) {
        post.setAccountId(accountId);
        LocalDateTime dateTime = LocalDateTime.now();
        post.setPostRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장

        return postRepository.save(post);
    }

    public Post searchPost(String postId, HttpServletRequest request) {
        Optional<Post> postOptional = postRepository.findById((postId));
        if (postOptional.isPresent()) {   // reviewId에 해당하는 review가 있을 경우
            Post post = postOptional.get();

            if (post.isPostSecret()) {  // 비공개일 경우 cookie의 accountId와 review의 accountId 비교
                String token = JwtUtil.getAccessTokenFromCookie(request);
                String accountId;
                if (token == null) {    // token없는 경우 null반환
                    return null;
                } else{
                    accountId = JwtUtil.getAccountId(token,secretKey);
                }

                if (accountId.equals(post.getAccountId())) {     //cookie의 accountId와 review의 accountId 일치하는 경우
                    return post;
                } else return null;

            } else { // 공개 review일 경우 review 반환
                return post;
            }

        } else {                            // reviewId에 해당하는 review가 없을 경우
            return null;
        }
    }

    public Post findPost(String postId) {
        Optional<Post> postOptional = postRepository.findById((postId));
        return postOptional.orElse(null);
    }

    public Post updatePost(Post post, String postId, String accountId) {
        post.setId(postId);
        return insertPost(post, accountId);
    }

    public List<Post> findMyPosts(String accountId) {
        List<Post> myPosts = postRepository.findByAccountId(accountId);
        return myPosts;
    }

    public void deletePost(String postId) {
        postRepository.deleteById(postId);
    }
}
