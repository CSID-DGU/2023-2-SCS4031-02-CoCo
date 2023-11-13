package trizzle.trizzlebackend.dto.upload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class S3UploadDto {

    private String uploadId;    // S3 UploadID
    private String fileName;    // 서버에서 생성한 파일이름

    public S3UploadDto(String uploadId, String fileName) {
        this.uploadId = uploadId;
        this.fileName = fileName;
    }
}
