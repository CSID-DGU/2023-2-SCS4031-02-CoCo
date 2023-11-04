package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "plans")
public class Plan {
    @Id
    private String id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime plan_registration_date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate plan_start_date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate plan_end_date;
    private String plan_name;
    private String plan_location;
    private List<String> plan_thema;
    private List<Day> content;

    public List<Day> getContent() {
        return content;
    }

    public void setContent(List<Day> content) {
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPlan_name() {
        return plan_name;
    }

    public void setPlan_name(String plan_name) {
        this.plan_name = plan_name;
    }

    public String getPlan_location() {
        return plan_location;
    }

    public void setPlan_location(String plan_location) {
        this.plan_location = plan_location;
    }

    public List<String> getPlan_thema() {
        return plan_thema;
    }

    public void setPlan_thema(List<String> plan_thema) {
        this.plan_thema = plan_thema;
    }

    public LocalDateTime getPlan_registration_date() {
        return plan_registration_date;
    }

    public void setPlan_registration_date(LocalDateTime plan_registration_date) {
        this.plan_registration_date = plan_registration_date;
    }

    public LocalDate getPlan_start_date() {
        return plan_start_date;
    }

    public void setPlan_start_date(LocalDate plan_start_date) {
        this.plan_start_date = plan_start_date;
    }

    public LocalDate getPlan_end_date() {
        return plan_end_date;
    }

    public void setPlan_end_date(LocalDate plan_end_date) {
        this.plan_end_date = plan_end_date;
    }
}
