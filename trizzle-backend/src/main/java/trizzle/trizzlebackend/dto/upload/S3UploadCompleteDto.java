package trizzle.trizzlebackend.dto.upload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class S3UploadCompleteDto {

    private String uploadId;    // initiateUpload에서 얻어온 upload ID
    private String fileName;    // initiateUpload에서 얻어온 새 파일명
    private List<S3UploadPartDetailDto> parts;  // 업로드할 파일의 ETag, PartNumber 데이터 목록
}
