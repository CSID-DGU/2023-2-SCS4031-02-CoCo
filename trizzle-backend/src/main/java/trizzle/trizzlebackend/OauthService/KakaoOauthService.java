package trizzle.trizzlebackend.OauthService;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

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
}
