package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.dto.follow.FollowUserDto;
import trizzle.trizzlebackend.dto.follow.FolloweeIdDto;
import trizzle.trizzlebackend.service.FollowService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FollowController {
    @Value("${jwt.secret}")
    private String secretKey;

    private final FollowService followService;

    @PostMapping("/follows")
    public ResponseEntity convertFollow(@RequestBody FolloweeIdDto followeeIdDto, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        String followeeId = followeeIdDto.getFolloweeId();
        Boolean isFollow = followService.convertFollow(accountId, followeeId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isFollow", isFollow); // 응답 -> {"isFollow": true}, true면 follow한 상태 false면 언팔

        return ResponseEntity.ok(response);
    }

    @GetMapping("/followers")
    public ResponseEntity getFollowerList(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<FollowUserDto> followers = followService.findFollowers(accountId);
        return ResponseEntity.ok(followers);
    }
}
