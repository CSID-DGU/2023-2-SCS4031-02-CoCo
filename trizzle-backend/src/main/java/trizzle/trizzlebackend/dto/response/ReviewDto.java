package trizzle.trizzlebackend.dto.response;

import lombok.Getter;
import lombok.Setter;
import trizzle.trizzlebackend.domain.Review;

@Getter
@Setter
public class ReviewDto {
    private Review review;
    private boolean isLike;
}
