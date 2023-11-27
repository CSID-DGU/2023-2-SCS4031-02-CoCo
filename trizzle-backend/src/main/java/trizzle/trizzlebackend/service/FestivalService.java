package trizzle.trizzlebackend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Festival;
import trizzle.trizzlebackend.repository.FestivalRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class FestivalService {
    private final FestivalRepository festivalRepository;

    @Value("${tourapi.secret.key}")
    private String secret;
    @Value("${tourapi.get.detailinfo.url}")
    private String detailUrl;
    @Value("${tourapi.common.query}")
    private String query;

    public void insertFestival(Festival festival) {
        festivalRepository.save(festival);
    }

    public List<Festival> findFestival() {
        List<Festival> allFestivals = festivalRepository.findByContentIdIsNotNull();
        List<Festival> randomFestivals = new ArrayList<>();
        List<Festival> copyAllFestivals = new ArrayList<>(allFestivals);

        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(copyAllFestivals.size());
            randomFestivals.add(copyAllFestivals.remove(randomIndex));
        }
        return randomFestivals;
    }

    public void jsonToFestival(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode jsonNode = objectMapper.readTree(json);

            JsonNode response = jsonNode.get("response");

            JsonNode body = response.get("body").get("items").get("item");

            body.forEach(element -> {
                Festival festival = new Festival();
                festival.setRegion(element.get("addr1").asText());
                festival.setImage(element.get("firstimage").asText());
                festival.setName(element.get("title").asText());
                festival.setContentId(element.get("contentid").asText());
                festival.setStartDate(element.get("eventstartdate").asText());
                festival.setEndDate(element.get("eventenddate").asText());
                insertFestival(festival);
            });

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String findHompage(String contentId) {
        String homepage = "";
        try {
            String secretKeyQuery = "serviceKey=" + secret;
            String contentIdQuery = "&contentId=" + contentId + "&defaultYN=Y";
            String strUrl = detailUrl + secretKeyQuery + contentIdQuery + query;
            URL url = new URL(strUrl);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            BufferedReader bufferedReader;
            StringBuilder responseStringBuilder = new StringBuilder();
            bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                responseStringBuilder.append(line);
            }
            String result = responseStringBuilder.toString();
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode jsonNode = objectMapper.readTree(result);

            String htmlHomepage = jsonNode.get("response").get("body").get("items").get("item").get(0).get("homepage").asText();
            bufferedReader.close();
            connection.disconnect();

            if(htmlHomepage != null) {
                homepage = htmlHomepage.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
            }



        }catch (Exception e) {
            e.printStackTrace();
        }
        return homepage;
    }

    public void updateHomepage() {
        List<Festival> festivals = festivalRepository.findAll();
        for(Festival festival:festivals) {
            String contentID = festival.getContentId();
            String hompage = findHompage(contentID);
            festival.setHomepage(hompage);
            festivalRepository.save(festival);
        }
    }

    public void allDelete() {
        festivalRepository.deleteAll();
    }
}
