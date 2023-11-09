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
public class GoogleOauthService {

    private final RestTemplate restTemplate = new RestTemplate();   // REST API 요청 후 응답받기 위해

    @Value("${oauth.google.client-id}")
    private String clientId;
    @Value("${oauth.google.client-secret}")
    private String clientSecret;
    @Value("${oauth.google.redirect-uri}")
    private String redirectUri;
    @Value("${oauth.google.token-uri}")
    private String tokenUri;
    @Value("${oauth.google.resource-uri}")
    private String resourceUri;
    @Value("${oauth.google.client-authorize}")
    private String authorizeUri;
    @Value("${oauth.google.scope}")
    private String scope;

    public User getUserInfo(String accessToken) {
        System.out.println(accessToken);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);  // Authorization Bearer 에 accesToken담아서 user정보 google에 요청
        HttpEntity httpEntity = new HttpEntity<>(headers);

        JsonNode userResourceNode = restTemplate.exchange(resourceUri, HttpMethod.GET, httpEntity, JsonNode.class).getBody();
        String id = userResourceNode.get("id").asText();
        String email = userResourceNode.get("email").asText();
        String nickname = userResourceNode.get("name").asText();

        User user = new User();
        user.setRegistrationId("google");      // google로 로그인한 것을 표시
        user.setSocialId(id);
        user.setEmail(email);
        user.setName(nickname);

        return user;
    }

    /* 인가코드를 통해 google에서 access_token 얻어오는 메소드 */
    public String getAccessToken(String authorizationCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);  //http header의 Content-Type:multipart/form-data으로

        HttpEntity httpEntity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, httpEntity, JsonNode.class);   // <200 OK OK, {"access_token":, "expires_in":, "scope":,"token_type":, "id_token":, }, [header정보]
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }

    public String googleRedirectUri() {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(authorizeUri)
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("response_type", "code")
                .queryParam("scope", scope);

        return uriComponentsBuilder.toUriString();
    }
}
