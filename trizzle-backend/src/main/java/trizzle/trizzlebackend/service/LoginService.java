package trizzle.trizzlebackend.service;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.OauthService.GoogleOauthService;
import trizzle.trizzlebackend.domain.User;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    private final MongoTemplate mongoTemplate;
    private final GoogleOauthService googleOauthService;

    public LoginService(MongoTemplate mongoTemplate, GoogleOauthService googleOauthService) {
        this.mongoTemplate = mongoTemplate;
        this.googleOauthService = googleOauthService;
    }

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
            response.put("registrationId", user.getRegistration_id());
        } else if (isUser.getAccount_id() == null || isUser.getNickname() == null) {
            response.put("message", "id 입력이 필요합니다");
            response.put("token", token);
            response.put("registrationId", user.getRegistration_id());
        } else {
            String accessToken = "123";
            response.put("message", "login success");
            response.put("accessToken", accessToken);
        }

        return response;
    }

    /* 최초 소셜로그인 때를 위한 회원가입 */
    private User signUp(User user) {
        return mongoTemplate.insert(user);
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

}
