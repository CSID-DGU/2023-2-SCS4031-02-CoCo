package trizzle.trizzlebackend.dto.upload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class S3UploadSignedUrlDto {
    private String uploadId;    // initiateUpload에서 얻어온 upload ID
    private String fileName;    // initiateUpload에서 얻어온 새 파일명
    private int partNumber;     // 업로드할 파일 조각 Number ( 1부터 시작 )
}
