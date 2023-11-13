package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.repository.PostRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    public Post insertPost(Post post, String accountId) {
        post.setAccountId(accountId);
        LocalDateTime dateTime = LocalDateTime.now();
        post.setPostRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장

        return postRepository.save(post);
    }
}
