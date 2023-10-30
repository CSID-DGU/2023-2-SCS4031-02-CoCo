package trizzle.trizzlebackend.OauthService;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleOauthService {

    private final RestTemplate restTemplate = new RestTemplate();   // REST API 요청 후 응답받기 위해

    @Value("${oauth.google.client-id}")
    String clientId;
    @Value("${oauth.google.client-secret}")
    String clientSecret;
    @Value("${oauth.google.redirect-uri}")
    String redirectUri;
    @Value("${oauth.google.token-uri}")
    String tokenUri;
    @Value("${oauth.google.resource-uri}")
    String resourceUri;

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
}
