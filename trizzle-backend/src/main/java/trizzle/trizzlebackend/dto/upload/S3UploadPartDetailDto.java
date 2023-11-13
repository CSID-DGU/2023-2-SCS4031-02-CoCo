package trizzle.trizzlebackend.dto.upload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class S3UploadPartDetailDto {
    private String awsETag;
    private int partNumber;
}
