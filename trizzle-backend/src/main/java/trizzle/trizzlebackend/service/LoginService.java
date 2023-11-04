package trizzle.trizzlebackend.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.OauthService.GoogleOauthService;
import trizzle.trizzlebackend.OauthService.KakaoOauthService;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.User;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    private final MongoTemplate mongoTemplate;
    private final GoogleOauthService googleOauthService;
    private final KakaoOauthService kakaoOauthService;

    public LoginService(MongoTemplate mongoTemplate, GoogleOauthService googleOauthService, KakaoOauthService kakaoOauthService) {
        this.mongoTemplate = mongoTemplate;
        this.googleOauthService = googleOauthService;
        this.kakaoOauthService = kakaoOauthService;
    }

    // Jwt관련
    @Value("${jwt.secret}")
    private String secretKey;
    private Long expiredMS = 1000 * 60 * 60L;

    // user정보 없음(최초 로그인) -> 회원가입 -> account_id,nickname, thema입력받도록("message"), 다음 입력에서 사용자 정보 유지 위해 token도 전달
    // user정보는 있으나 account_id나 nickname없음 -> account_id,nickname, thema입력받도록("message"), 다음 입력에서 사용자 정보 유지 위해 token도 전달
    // user정보도 있고 account_id과 nickname있음 -> accessToken발급 받을 수 있도록
    public Map<String, String> login(String token, User user) {

        User isUser = findBySocialId(user.getRegistration_id(), user.getSocial_id());
        Map<String, String> response = new HashMap<>();

        if (isUser == null) {
            signUp(user);
            response.put("message", "id 입력이 필요합니다");
            response.put("token", token);
            response.put("registration_id", user.getRegistration_id());
        } else if (isUser.getAccount_id() == null || isUser.getNickname() == null) {
            response.put("message", "id 입력이 필요합니다");
            response.put("token", token);
            response.put("registration_id", user.getRegistration_id());
        } else {
            String accessToken = JwtUtil.createJwt(isUser.getAccount_id(), secretKey, expiredMS);
            response.put("message", "login success");
            response.put("accessToken", accessToken);
        }

        return response;
    }

    /* 기존 social_id 에 해당하는 user정보에 추가로 입력받은 user정보 저장,  Jwt 발급 */
    public Map<String, String> putUserInfo(String token, User additionalUserInfo) {

        // id중복확인
        String account_id = findAccountId(additionalUserInfo.getAccount_id());
        if (account_id != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "이미 존재하는 id입니다");
            return response;
        }

        User userInfo = null;    // userInfo가 db에 저장될 값

        if (additionalUserInfo.getRegistration_id().equals("google")) {
            userInfo = googleOauthService.getUserInfo(token);

        } else if (additionalUserInfo.getRegistration_id().equals("kakao")) {
            userInfo = kakaoOauthService.getUserInfo(token);
        }
        User isUser = findBySocialId(userInfo.getRegistration_id(), userInfo.getSocial_id());
        userInfo.setId(isUser.getId()); // db에 있는 user정보에 추가해야하므로 user_id 값 같게 지정

        userInfo.setAccount_id(additionalUserInfo.getAccount_id());
        userInfo.setNickname(additionalUserInfo.getNickname());
        userInfo.setThema(additionalUserInfo.getThema());
        signUp(userInfo); // 추가로 입력된 정보 합쳐서 user정보 db에서 update

        Map<String, String> response = new HashMap<>();
        String accessToken = JwtUtil.createJwt(userInfo.getAccount_id(), secretKey, expiredMS);;
        response.put("message", "login success");
        response.put("accessToken", accessToken);
        return response;
    }

    /* 최초 소셜로그인 때를 위한 회원가입 */
    private User signUp(User user) {
        return mongoTemplate.save(user);
    }

    /*소셜 로그인에 해당하는 user있는지 확인 */
    private User findBySocialId(String registrationId, String socialId) {
        Criteria criteria = new Criteria().andOperator(
            Criteria.where("registration_id").is(registrationId),
            Criteria.where("social_id").is(socialId)
        );
        Query query = new Query(criteria);
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    /* account_id가 존재하는지 확인*/
    private String findAccountId(String account_id) {
        Query query = new Query(Criteria.where("account_id").is(account_id));
        User user = mongoTemplate.findOne(query, User.class);
        if (user != null) {
            return user.getAccount_id();
        } else{
            return null;
        }
    }

}
