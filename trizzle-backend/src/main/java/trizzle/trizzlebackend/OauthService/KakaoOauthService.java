package trizzle.trizzlebackend.OauthService;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import trizzle.trizzlebackend.domain.User;

@Service
public class KakaoOauthService {

    private RestTemplate restTemplate = new RestTemplate();

    @Value("${oauth.kakao.client-id}")
    private String clientId;
    @Value("${oauth.kakao.redirect-uri}")
    private String redirectUri;
    @Value("${oauth.kakao.token-uri}")
    private String tokenUri;
    @Value("${oauth.kakao.resource-uri}")
    private String resourceUri;
    @Value("${oauth.kakao.client-authorize}")
    private String authorizeUri;

    public User getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity httpEntity = new HttpEntity(headers);

        User user = new User();

        JsonNode userResourceNode = restTemplate.exchange(resourceUri, HttpMethod.GET, httpEntity, JsonNode.class).getBody();
        System.out.println(userResourceNode);
        String id = userResourceNode.get("id").asText();
        String email;
        if(userResourceNode.get("email") != null){      // kakao는 이메일 선택이므로 없을 수 있음
            email = userResourceNode.get("email").asText();
            user.setEmail(email);
        }
        String nickname = userResourceNode.get("properties").get("nickname").asText();

        user.setRegistration_id("kakao");
        user.setSocial_id(id);
        user.setName(nickname);

        return user;
    }

    /* 인가코드를 통해 kakao에서 access_token 얻어오는 메소드 */
    public String getAccessToken(String authorizationCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("redirect_url", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);  //http header의 Content-Type:"application/json;charset=utf-8"

        HttpEntity httpEntity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, httpEntity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }

    public String kakaoRedirectUri() {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(authorizeUri)
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("response_type", "code");

        return uriComponentsBuilder.toUriString();
    }
}
