package trizzle.trizzlebackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.configuration.AwsS3Config;
import trizzle.trizzlebackend.dto.upload.*;
import trizzle.trizzlebackend.service.UploadService;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {
    private final UploadService uploadService;

    /* MultiPartUpload 시작 -> UploadId 응답 */
    @PostMapping("/initiate")
    public S3UploadDto initiateUpload(@RequestBody S3UploadInitiateDto file) {
        String fileName = file.getFileName();
        return uploadService.initiateUpload(fileName, AwsS3Config.imageFolder);
    }

    /*preSignedUrl 발급 - 클라이언트에서 uploadId, fileName, partNumber를 requestBody에 포함해서 요청*/
    @PostMapping("/preSignedUrl")
    public S3PresignedUrlDto getPreSignedUrl(@RequestBody S3UploadSignedUrlDto s3UploadSignedUrlDto) {
        return uploadService.getPreSignedUrl(s3UploadSignedUrlDto, AwsS3Config.imageFolder);
    }

    @PostMapping("/complete")
    public S3UploadResultDto completeUpload(@RequestBody S3UploadCompleteDto s3UploadCompleteDto) {
        return uploadService.completeUpload(s3UploadCompleteDto, AwsS3Config.imageFolder);
    }



}
