import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from './AddPostPlan.styles'
import Page from "../Page";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import UploadPlanModal from "../../shared/UploadPlanModal";
import { tripThema } from "../../utils/Data/tripThema";

const AddPostPlanOpen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [startDate, ] = useState<string>('');
  const [endDate, ] = useState<string>('');
  const [regions, ] = useState<string>('서울특별시');
  const [thema, setThema] = useState<any>([]);
  const [isUploadPlanModal, setIsUploadPlanModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [thumnail, setThumnail] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSave = () => {
    alert("불러온 일정이 없습니다.")
  }

  const uploadPlanData = (planData: any) => {
    navigate(`/post/plans/add/${planData.id}`);
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    const imageHandler = async () => {
      if (file === null) return;
      const fileName = file.name;
      const fileSize = file.size;
      const url = '/api';

      // 3GB가 넘어가는 파일 업로드 제한
      if (fileSize > 3 * 1024 * 1024 * 1024) {
        alert('The file you are trying to upload is too large. (under 3GB)');
        return;
      }

      try {
        //업로드할 파일의 이름으로 Date 사용
        let start: any = new Date();
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
        let end: any;
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
          let uploadChunck: any = await axios.put(preSignedUrl, fileBlob);
          // 응답 헤더에 있는 Etag와 파트 번호를 가지고 있습니다.
          if (uploadChunck.headers.get('ETag') === null) throw new Error("ETag is null");
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
        setThumnail(completeUpload.data.url);
      } catch (err: any) {
        console.log(err, err.stack);
      }
    };

    imageHandler();
  }, [file]);

  const onThemaBadgeClick = (select: any) => {
    const itemExists = thema.some((item: any) => item.id === select.id);

    if (itemExists) {
      setThema((prev: any) => prev.filter((item: any) => item.id !== select.id));
    } else {
      setThema((prev: any) => [...prev, select]);
    }
  };

  return (
    <Page headersProps={{ isHome: false }}>
      {thumnail !== null ? (
        <S.ThumbnailContainer>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} src={thumnail} alt="thumbnail" />
          <label htmlFor="file">
            <S.UploadThumnailButton>썸네일 등록</S.UploadThumnailButton>
          </label>
          <S.UploadThumnailInput type="file" id="file" accept="image/*" onChange={handleFileChange} />
        </S.ThumbnailContainer>
      ) : (
        <S.ThumbnailNoneContainer>
          <label htmlFor="file">
            <S.UploadThumnailButton>썸네일 등록</S.UploadThumnailButton>
          </label>
          <S.UploadThumnailInput type="file" id="file" accept="image/*" onChange={handleFileChange} />
        </S.ThumbnailNoneContainer>
      )}

        <S.ButtonContainer>
          <S.Button onClick={onSave}>임시저장</S.Button>
          <S.Button onClick={onSave}>게시</S.Button>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{ width: "100%" }} id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          <S.HorizontalContainer>
            <S.SelectTitle>지역</S.SelectTitle>
            <div>{regions}</div>
            <S.PlanDateContainer>
              <S.SelectTitle >여행기간</S.SelectTitle>
              <div>{startDate}</div>
              <div style={{ color: "#7e7e7e", margin: "0 0.5rem 0 0.3rem", fontSize: "1.3rem" }}>~</div>
              <div>{endDate}</div>
            </S.PlanDateContainer>
          </S.HorizontalContainer>
          <S.HorizontalContainer>
            <S.DropTitle>여행테마</S.DropTitle>
            <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
          </S.HorizontalContainer>
          <S.HorizontalLine />
        </S.FormContainer>

        <S.UploadContainer onClick={() => setIsUploadPlanModal(!isUploadPlanModal)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <S.UploadPlanButton onClick={() => setIsUploadPlanModal(!isUploadPlanModal)} isHovered={isHovered} >일정 불러오기</S.UploadPlanButton>
        </S.UploadContainer>
        
      <div style={{ height: "10rem" }} />
      {isUploadPlanModal && <UploadPlanModal title="일정 불러오기" onclose={() => setIsUploadPlanModal(!isUploadPlanModal)} onClickedPlan={(plan: any) => uploadPlanData(plan)} />}
    </Page >
  )
}

export default AddPostPlanOpen;