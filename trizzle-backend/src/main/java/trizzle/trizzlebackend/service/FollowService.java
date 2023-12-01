package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Follow;
import trizzle.trizzlebackend.repository.FollowRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;

    public boolean convertFollow(String followerId, String followeeId) {
        Follow existingFollow = followRepository.findByFollowerIdAndFolloweeId(followerId, followeeId); // follow 기록 있는지 확인

        if (existingFollow == null) {
            LocalDateTime dateTime = LocalDateTime.now();
            Follow follow = Follow.builder()
                    .followRegistrationDate(dateTime)
                    .followerId(followerId)
                    .followeeId(followeeId)
                    .build();
            followRepository.save(follow);
            return true;
        } else {
            followRepository.delete(existingFollow);
            return false;
        }
    }
}
