package trizzle.trizzlebackend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.*;
import trizzle.trizzlebackend.dto.response.PostDto;
import trizzle.trizzlebackend.repository.*;
import trizzle.trizzlebackend.elasticSearch.ElasticsearchOperations;
import trizzle.trizzlebackend.repository.ElasticPostRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;
    private final LikeRepository likeRepository;
    private final UserService userService;
    private final PlanService planService;
    @Autowired
    private ElasticPostRepository elasticPostRepository;
    @Value("${jwt.secret}")
    private String secretKey;
    public Post insertPost(Post post, String accountId) {   // 게시글 저장, 수정, 좋아요 수 업데이트에 사용
        if (post.getId() == null) {
            post.setAccountId(accountId);
            LocalDateTime dateTime = LocalDateTime.now();
            post.setPostRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장
        }

        /*post로 게시한 plan일 경우 plan에 postId 저장하기 위해*/
        Post insert = postRepository.save(post);
        Plan plan = insert.getPlan();
        plan.setPostId(insert.getId());
        planService.updatePlan(plan, plan.getId(), plan.getAccountId());

        /*elasticSearch 위해*/
        if (!insert.isPostSecret()) { // 공개 post만 검색가능하게 저장되도록
            ElasticPost elasticPost= new ElasticPost();
            elasticPost.setData(insert.getId(),insert.getAccountId(), insert.getPostTitle(), insert.getPostRegistrationDate(),
                    insert.isPostSecret(),insert.getPlan(), insert.getLikeCount(), insert.getBookmarkCount(), insert.getThumnail(), insert.getCommentCount());
            elasticPostRepository.save(elasticPost);
        }
        return insert;

    }

    @Transactional
    public PostDto searchPost(String postId, HttpServletRequest request) {
        Optional<Post> postOptional = postRepository.findById((postId));
        if (postOptional.isPresent()) {   // postId에 해당하는 post가 있을 경우
            Post post = postOptional.get();
            post.increaseViewCounts();  // 조회수 증가
            postRepository.save(post);
            User postUser = userService.searchUser(post.getAccountId());
            PostDto postDto = new PostDto();
            postDto.setPost(post);
            postDto.setPostUser(postUser);

            if (post.isPostSecret()) {  // 비공개일 경우 cookie의 accountId와 post의 accountId 비교
                String token = JwtUtil.getAccessTokenFromCookie(request);
                String accountId;
                if (token == null) {    // token없는 경우 null반환
                    return null;
                } else{
                    accountId = JwtUtil.getAccountId(token,secretKey);
                }

                if (accountId.equals(post.getAccountId())) {     //cookie의 accountId와 post의 accountId 일치하는 경우
                    return postDto;
                } else return null;

            } else { // 공개 post일 경우 post 반환
                String token = JwtUtil.getAccessTokenFromCookie(request);
                String accountId;
                if (token == null) { // token 없다면(로그인 안했다면 post정보만)
                    return postDto;
                } else {
                    accountId = JwtUtil.getAccountId(token,secretKey);
                }
                
                Like like = likeRepository.findByPostIdAndAccountId(postId, accountId);
                if (like != null) { // 좋아요 했으면 isLike true로
                    postDto.setLike(true);
                } else {   // 좋아요 안했으면 isLike false로
                    postDto.setLike(false);
                }

                Bookmark bookmark = bookmarkRepository.findByPostIdAndAccountId(postId, accountId);
                if (bookmark != null) { // 북마크 했으면 isBookmark true로
                    postDto.setBookmark(true);
                } else { // 북마크 안했으면 isBookmark false로
                    postDto.setBookmark(false);
                } 
                
                return postDto;
            }

        } else {                            // postId 해당하는 post가 없을 경우
            return null;
        }
    }

    //일단은 데이터 수가 적으니 모든 포스트 나오도록
    public Page<ElasticPost> findAllPost(Pageable pageable) { //pageable은 한 페이지당 몇 개의 데이터를 넣어서 몇 페이지를 불러올 것이며 어떻게 정렬할 것인지
        Page<ElasticPost> elasticPost = elasticPostRepository.findAll(pageable);
        return elasticPost;
    };

    public Page<ElasticPost> searchElasticPost(String location, String keyword, Pageable pageable) {
        Page<ElasticPost> posts;
        if(location.equals("전체")) {
            posts = elasticPostRepository.searchByPostTitleOrPlanContaining(keyword, pageable);
        } else {
            posts = elasticPostRepository.searchByPostTitleOrPlanContainingAndPlanPlanLocation(keyword, location, pageable);
        }

//        if(posts.isEmpty()) {
//            if(location.equals("전체")) posts = findAllPost(pageable);
//            else posts = elasticPostRepository.findByPlanPlanLocation(location, pageable);
//        }
        return posts;
    }


    public Post findPost(String postId) {
        Optional<Post> postOptional = postRepository.findById((postId));
        return postOptional.orElse(null);
    }

    public ElasticPost findElasticPost(String postId) {
        ElasticPost post = elasticPostRepository.findById(postId);
        return post;
    }

    public Post updatePost(Post post, String postId, String accountId) {
        post.setId(postId);
        return insertPost(post, accountId);
    }

    public List<Post> findMyPosts(String accountId) {
        List<Post> myPosts = postRepository.findByAccountId(accountId);
        return myPosts;
    }

    public List<Post> findNotSecretPosts(String accountId) {
        List<Post> publicPosts = postRepository.findByAccountIdAndPostSecret(accountId, false);
        return publicPosts;
    }

    public void deletePost(String postId) {
        elasticPostRepository.deleteById(postId);
        postRepository.deleteById(postId);
    }

    public List<Post> findBookmarkPosts(String accountId) {
        String type = "post";
        List<Bookmark> bookmarks = bookmarkRepository.findByAccountIdAndType(accountId, type);
        List<Post> posts = new ArrayList<>();

        for (Bookmark bookmark : bookmarks) {
            Post post = postRepository.findById(bookmark.getPostId()).orElse(null);
            if (post != null) {
                posts.add(post);
            }
        }

        return posts;
    }

    public Post checkMyPost(String postId, String accountId) {
        return postRepository.findByIdAndAccountId(postId, accountId);

    }

    public List<Post> findTop4Posts() {
        List<Post> posts = postRepository.findTop4ByPostSecretOrderByLikeCountDesc(false);
        return posts;
    }

    public Page<ElasticPost> findRandomPosts(){
        Pageable pageable = PageRequest.of(0, 6, Sort.by("postRegistrationDate").descending());
        Page<ElasticPost> posts = elasticPostRepository.findAll(pageable);
        return posts;
    }
}
