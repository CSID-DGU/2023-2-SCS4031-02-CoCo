package trizzle.trizzlebackend.controller;

import lombok.RequiredArgsConstructor;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.domain.Festival;
import trizzle.trizzlebackend.service.FestivalService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequestMapping("/api/festivals")
@RequiredArgsConstructor
public class FestivalController {
    private final FestivalService festivalService;
    @Value("${tourapi.secret.key}")
    private String secret;
    @Value("${tourapi.get.festival.url}")
    private String getFestivalUrl;
    @Value("${tourapi.get.detailinfo.url}")
    private String getDetailUrl;
    @Value("${tourapi.common.query}")
    private String commonQuery;

    @PostMapping("")
    public String saveFestivals() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = currentDate.format(formatter);
        String dateQuery = "&eventStartDate=" + formattedDate;
        String rowNumQuery = "&numOfRows=12";
        String secretKeyQuery = "serviceKey=" + secret;

        try {
            String strUrl = getFestivalUrl + secretKeyQuery + rowNumQuery + dateQuery + commonQuery;
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
            festivalService.jsonToFestival(result);


            bufferedReader.close();
            connection.disconnect();
            return "success";
        }catch(IOException e) {
            e.printStackTrace();
            return "falied";
        }

    }

    @PutMapping("")
    public String updateHomepage() {
        festivalService.updateHomepage();
        return "success";
    }

    @DeleteMapping("")
    public String deleteAll() {
        festivalService.allDelete();
        return "success";
    }

    @GetMapping("")
    public ResponseEntity getFestival() {
        List<Festival> festivals = festivalService.findFestival();
        return ResponseEntity.ok().body(festivals);
    }


}
