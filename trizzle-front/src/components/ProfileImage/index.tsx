import React, {useEffect, useState} from "react";
import * as S from "./ProfileImage.style";
import { ProfileImageProps } from "./ProfileImage.type";
import { AiOutlineCamera } from "react-icons/ai";
import avatar from "../../assets/images/default_avatar.png"
import axios from "axios";

const ProfileImage: React.FC<ProfileImageProps> = (props: ProfileImageProps) => {
  const imageSrc = props.src !== "" && props.src !== null? props.src : avatar;
  const [file, setFile] = useState<File | null>(null);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    const imageHandler = async () => {
      if(file === null) return;
      const fileName = file.name;
      const fileSize = file.size;
      const url = "/api";

        // 3GB가 넘어가는 파일 업로드 제한
        if (fileSize > 3 * 1024 * 1024 * 1024) {
          alert('The file you are trying to upload is too large. (under 3GB)');
          return;
        }
  
        try {
          //업로드할 파일의 이름으로 Date 사용
          let start:any = new Date();
          //s3 관련 설정들
          
          let res = await axios.post(`${url}/upload/initiate`, { fileName: fileName });
          const uploadId = res.data.uploadId;
          const newFilename = res.data.fileName; // 서버에서 생성한 새로운 파일명
  
          // 세션 스토리지에 업로드 아이디와 파일 이름을 저장합니다.
          sessionStorage.setItem('uploadId', uploadId);
          sessionStorage.setItem('fileName', newFilename);
  
          // 청크 사이즈와 파일 크기를 통해 청크 개수를 설정합니다.
          const chunkSize = 10 * 1024 * 1024; // 10MB
          const chunkCount = Math.floor(fileSize / chunkSize) + 1;
  
          let multiUploadArray = [];
          let end:any; 
          for (let uploadCount = 1; uploadCount < chunkCount + 1; uploadCount++) {
            // 청크 크기에 맞게 파일을 자릅니다.
            start = (uploadCount - 1) * chunkSize;
            end = uploadCount * chunkSize;
            let fileBlob = uploadCount < chunkCount ? file.slice(start, end) : file.slice(start);
  
            // 3. Spring Boot 서버로 Part 업로드를 위한 미리 서명된 URL 발급 바듭니다.
            let getSignedUrlRes = await axios.post(`${url}/upload/preSignedUrl`, {
              fileName: newFilename,
              partNumber: uploadCount,
              uploadId: uploadId
            });
  
            let preSignedUrl = getSignedUrlRes.data.preSignedUrl;
  
            // 3번에서 받은 미리 서명된 URL과 PUT을 사용해 AWS 서버에 청크를 업로드합니다,
            let uploadChunck:any = await axios.put(preSignedUrl, fileBlob);
            // 응답 헤더에 있는 Etag와 파트 번호를 가지고 있습니다.
            if(uploadChunck.headers.get('ETag') === null) throw new Error("ETag is null");
            let EtagHeader = uploadChunck.headers.get('ETag').replaceAll('\"', '');
            let uploadPartDetails = {
              awsETag: EtagHeader,
              partNumber: uploadCount
            };
  
            multiUploadArray.push(uploadPartDetails);
          }
  
          // 6. 모든 청크 업로드가 완료되면 Spring Boot 서버로 업로드 완료 요청을 보냅니다.
          // 업로드 아이디 뿐만 아니라 이 때 Part 번호와 이에 해당하는 Etag를 가진 'parts'를 같이 보냅니다.
          const completeUpload = await axios.post(`${url}/upload/complete`, {
            fileName: newFilename,
            parts: multiUploadArray,
            uploadId: uploadId
          });
          end = new Date();
          props.setPreviewURL? props.setPreviewURL(completeUpload.data.url):null;
        } catch (err:any) {
          console.log(err, err.stack);
        }
    };

    imageHandler();
  }, [file]);

  if(props.type === "big") {
    return (
      <S.BigContainer margin={props.margin}>
        <S.ProfileImage src={imageSrc} alt="profile" />
        {props.isMe===true && <S.CameraContainer><AiOutlineCamera color="#fff" size="1.5rem"/></S.CameraContainer>}
      </S.BigContainer>
    );
  } else if(props.type === "small") {
    return (
      <S.SmallContainer margin={props.margin}>
        <S.ProfileImage src={imageSrc} alt="profile" />
      </S.SmallContainer>
    );
  } else if(props.type === "mid"){
    return (
    <S.MidContainer margin={props.margin}>
      <S.ProfileImage src={props.previewURL === null ? imageSrc : props.previewURL} alt="profile" />
      {props.isMe===true && 
      <>
      <label htmlFor="file">
        <S.MidCameraContainer>
          <AiOutlineCamera color="#fff" size="1.5rem"/>
        </S.MidCameraContainer>
        </label>
        <S.ProfileChangeInput id="file" type="file" accept="image/*" onChange={handleFileChange}/>
      </>
      }
  </S.MidContainer>
    )
  }
};

export default ProfileImage;