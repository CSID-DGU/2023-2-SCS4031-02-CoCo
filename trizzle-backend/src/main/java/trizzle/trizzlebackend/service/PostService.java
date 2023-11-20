package trizzle.trizzlebackend.service;

import com.tdunning.math.stats.Sort;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.repository.ElasticPostRepository;
import trizzle.trizzlebackend.domain.ElasticPost;
import trizzle.trizzlebackend.elasticSearch.ElasticsearchOperations;
import trizzle.trizzlebackend.repository.ElasticPostRepository;
import trizzle.trizzlebackend.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    @Autowired
    private ElasticPostRepository elasticPostRepository;
    @Value("${jwt.secret}")
    private String secretKey;
    public Post insertPost(Post post, String accountId) {
        post.setAccountId(accountId);
        LocalDateTime dateTime = LocalDateTime.now();
        post.setPostRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장
        Post insert = postRepository.save(post);
        ElasticPost elasticPost= new ElasticPost();
        elasticPost.setData(insert.getId(),insert.getAccountId(), insert.getPostTitle(), insert.getPostRegistrationDate(),
                insert.isPostSecret(),insert.getPlan());
        elasticPostRepository.save(elasticPost);

        return insert;

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

    //일단은 데이터 수가 적으니 모든 포스트 나오도록
    public Page<ElasticPost> findAllPost(Pageable pageable) { //pageable은 한 페이지당 몇 개의 데이터를 넣어서 몇 페이지를 불러올 것이며 어떻게 정렬할 것인지
        Page<ElasticPost> elasticPost = elasticPostRepository.findAll(pageable);
        return elasticPost;
    };


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
