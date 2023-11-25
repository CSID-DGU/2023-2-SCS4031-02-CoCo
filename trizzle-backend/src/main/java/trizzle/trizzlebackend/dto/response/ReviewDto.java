package trizzle.trizzlebackend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.domain.User;

@Getter
@Setter
public class ReviewDto {
    private Review review;
    @JsonProperty("isLike")
    private boolean isLike;
    @JsonProperty("isBookmark")
    private boolean isBookmark;
    private User reviewUser;
}
