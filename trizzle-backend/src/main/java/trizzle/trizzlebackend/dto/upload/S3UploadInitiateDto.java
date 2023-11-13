package trizzle.trizzlebackend.dto.upload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class S3UploadInitiateDto {
    private String fileName;    // 업로드할 파일의 이름
}
