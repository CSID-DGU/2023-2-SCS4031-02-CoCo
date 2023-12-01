package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Follow;
import trizzle.trizzlebackend.domain.User;
import trizzle.trizzlebackend.dto.follow.FollowUserDto;
import trizzle.trizzlebackend.repository.FollowRepository;
import trizzle.trizzlebackend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public boolean convertFollow(String followerId, String followeeId) {
        if (followerId.equals(followeeId)) {
            return false;
        }
        Follow existingFollow = followRepository.findByFollowerIdAndFolloweeId(followerId, followeeId); // follow 기록 있는지 확인
        User follower = userRepository.findByAccountId(followerId);
        User followee = userRepository.findByAccountId(followeeId);

        if (existingFollow == null) {
            LocalDateTime dateTime = LocalDateTime.now();
            Follow follow = Follow.builder()
                    .followRegistrationDate(dateTime)
                    .followerId(followerId)
                    .followeeId(followeeId)
                    .build();
            followRepository.save(follow);
            /*나의 팔로잉 수 증가 */
            follower.increaseFollowingCount();
            userRepository.save(follower);
            /*내가 팔로우한 사람의 팔로워 수 증가 */
            followee.increaseFollowerCount();
            userRepository.save(followee);
            return true;
        } else { // 팔로우 취소
            followRepository.delete(existingFollow);
            /*나의 팔로잉 수 감소*/
            follower.decreaseFollowingCount();
            userRepository.save(follower);
            /*내가 팔로우 취소한 사람의 팔로워 수 감소*/
            followee.decreaseFollowerCount();
            userRepository.save(followee);
            return false;
        }
    }

    /*나를 팔로우 한 사람들(팔로워) 불러오기*/
    public List<FollowUserDto> findFollowers(String accountId) {
        List<Follow> follows = followRepository.findByFolloweeId(accountId);    // 나를 팔로우 한 기록들 찾음
        List<FollowUserDto> followers = new ArrayList<>();

        if (follows.isEmpty()) {
            return null;
        }

        for (Follow follow : follows) {
            User user = userRepository.findByAccountId(follow.getFollowerId()); // 나를 팔로우 한 사람(팔로워)
            if (user != null) {
                FollowUserDto followUserDto = FollowUserDto.builder()
                        .accountId(user.getAccountId())
                        .nickname(user.getNickname())
                        .profileImage(user.getProfileImage())
                        .build();
                followers.add(followUserDto);
            }
        }
        return followers;
    }
    
    /*내가 팔로우 한 사람들(팔로잉 목록) 불러오기*/
    public List<FollowUserDto> findFollowee(String accountId) {
        List<Follow> follows = followRepository.findByFollowerId(accountId);    // 내가 팔로우 한 기록들 찾음
        List<FollowUserDto> followee = new ArrayList<>();

        if (follows.isEmpty()) {
            return null;
        }

        for (Follow follow : follows) {
            User user = userRepository.findByAccountId(follow.getFolloweeId()); // 내가 팔로우 한 사람(팔로잉)
            if (user != null) {
                FollowUserDto followUserDto = FollowUserDto.builder()
                        .accountId(user.getAccountId())
                        .nickname(user.getNickname())
                        .profileImage(user.getProfileImage())
                        .build();
                followee.add(followUserDto);
            }
        }
        return followee;
    }
}
