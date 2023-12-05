import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from './AddPostPlan.styles'
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import Page from "../Page";
import { koreaRegions } from "../../utils/Data/mapData";
import { tripThema } from "../../utils/Data/tripThema";
import PlanMap from "../../shared/PlanMap";
import { useNavigate, useParams } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import ConnectPlaceModal from "../../shared/ConnectPlaceModal";

const ModPostPlan: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [prevThema,] = useState<any>([]);
  const [thema, setThema] = useState<any>([]);
  const [dayPlan, setDayPlan] = useState<any>(null);
  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(null);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [thumnail, setThumnail] = useState<string | null>(null);
  const [placeCenter, setPlaceCenter] = useState<any>({ center: { lat: 0, lng: 0 } });

  const [isConnectPlaceModal, setIsConnectPlaceModal] = useState<boolean>(false);
  const [ConnectPlaceModalData, setConnectPlaceModalData] = useState<any>({});
  const [ConnectPlaceModalDay, setConnectPlaceModalDay] = useState<number>(0);
  const planId = useParams<{ id: string }>();
  const [state, fetchData] = useAsync({ url: `/api/posts/${planId.id}` });

  const navigate = useNavigate();

  useEffect(() => {
    if (state.error) {
      console.error(state.error);
    } else if (state.data) {
      if (state.data.message === "update success" && state.data.postId) navigate(`/post/plan/${state.data.postId}`);
      else if (state.data.message === "update success" && state.data.reviewId) console.log();
      else setData(state.data);
    }
  }, [state]);

  useEffect(() => {
    if (data.length !== 0) {
      setTitle(data.post.postTitle);
      setStartDate(data.post.plan.planStartDate);
      setEndDate(data.post.plan.planEndDate);
      setRegions(data.post.plan.planLocation);
      setThema(data.post.plan.planThema.map((value: string) => tripThema.filter((item: any) => item.name === value)[0]));
      setDayPlan(data.post.plan.content);
      setSelectedDayPlan(data.post.plan.content);
      setThumnail(data.post.thumnail);
    }
  }, [data]);

  useEffect(() => {
    if (selectDay === 0) {
      setSelectedDayPlan(dayPlan);
    } else {
      const newArray = [dayPlan[selectDay - 1]];
      setSelectedDayPlan(newArray);
    }
  }, [selectDay, dayPlan]);

  useEffect(() => {
    if (selectedDayPlan !== null) {
      const rePlace = selectedDayPlan[0].placeList;
      if (rePlace.length !== 0 && rePlace[0].keyword === null) {
        const newCenter = { center: { lat: rePlace[0].y, lng: rePlace[0].x } };
        setPlaceCenter(newCenter);
      } else {
        const newCenter = { center: koreaRegions.filter((region) => { return region.name === regions })[0].center }
        setPlaceCenter(newCenter);
      }
    }
  }, [selectedDayPlan]);

  useEffect(() => {
    if (prevThema.length !== 0) {
      prevThema.map((value: any) => onThemaBadgeClick(value[0]));
    }
  }, [prevThema]);

  const onThemaBadgeClick = (select: any) => {
    const itemExists = thema.some((item: any) => item.id === select.id);

    if (itemExists) {
      setThema((prev: any) => prev.filter((item: any) => item.id !== select.id));
    } else {
      setThema((prev: any) => [...prev, select]);
    }
  };

  const onPostPlace = (day: number, placeData: any) => {
    window.open(`/post/plans/add/${day}/${planId.id}/${placeData.id}`, '_blank');
  }

  const connectPlace = (day: number, data: any) => {
    setIsConnectPlaceModal(!isConnectPlaceModal);
    setConnectPlaceModalDay(day);
    setConnectPlaceModalData(data);
  }

  const delectConnectPlace = (day: number, data: any) => {
    const newArray = [...dayPlan];
    newArray[day - 1].placeList = dayPlan[day - 1].placeList.map((place: any) => {
      if (place.id === data.id) { return { ...place, review: null }; }
      return place;
    });
    console.log(newArray);
    setDayPlan(newArray);
    const reviewData = data.review;
    reviewData.planId = null;
    reviewData.postId = null;
    const json = JSON.stringify(reviewData);
    fetchData(`/api/reviews/${reviewData.id}`, 'PUT', json);
  }

  //review에 planId 추가해서 디비로 put 보내기
  const connectReview = (review: any) => {
    const newArray = [...dayPlan];
    newArray[ConnectPlaceModalDay - 1].placeList = dayPlan[ConnectPlaceModalDay - 1].placeList.map((place: any) => {
      if (place.id === ConnectPlaceModalData.id) { return { ...place, review: review }; }
      return place;
    });
    setDayPlan(newArray);
    const reviewData = { ...review, reviewSecret: false, planId: data.id }
    fetchData(`/api/reviews/${review.id}`, 'PUT', reviewData);
  }

  const onSave = (type: string) => {
    const newArray = thema.map((value: any) => value.name);
    if (type === "save") {
      data.post.plan.content = dayPlan;
      data.post.plan.planThema = newArray;
      data.post.postTitle = title;
      data.post.postSecret = false;
      data.post.thumnail = thumnail;
      const ResultData = { ...data }

      const shouldProceed = window.confirm('게시하시면 다시 수정할 수 없습니다! 정말로 저장하시겠습니까?');
      if (shouldProceed) {
        const json = JSON.stringify(ResultData.post);
        fetchData(`/api/posts/${ResultData.post.id}`, 'PUT', json);
      }
    } else if (type === "secret") {
      data.post.plan.content = dayPlan;
      data.post.plan.planThema = newArray;
      data.post.postTitle = title;
      data.post.postSecret = true;
      data.post.thumnail = thumnail;
      const ResultData = { ...data.post }

      const json = JSON.stringify(ResultData);
      fetchData(`/api/posts/${ResultData.id}`, 'PUT', json);
    }
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
      {/* <form> */}
      <S.ButtonContainer>
        <S.Button onClick={() => onSave("secret")}>임시저장</S.Button>
        <S.Button onClick={() => onSave("save")}>게시</S.Button>
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

      <S.MapAndDayPlanContainer>
        {dayPlan !== null && <PlanMap selectDay={selectDay} setSelectDay={(day: number) => setSelectDay(day)} placeList={dayPlan} center={placeCenter.center} page="detail" width="50%" />}
        <S.DayPlanPostContainer>
          <S.DayPlanPostInnerContainer>
            <DayPlanPost planId={data.id} dayList={selectedDayPlan} selectDay={selectDay} onNewPostPlace={(day: number, data: any) => onPostPlace(day, data)} onConnectPostPlace={(day: number, data: any) => connectPlace(day, data)} onDeleteConnect={(day: number, data: any) => delectConnectPlace(day, data)} />
          </S.DayPlanPostInnerContainer>
        </S.DayPlanPostContainer>
      </S.MapAndDayPlanContainer>

      <div style={{ height: "10rem" }} />

      {isConnectPlaceModal && <ConnectPlaceModal placeInfor={ConnectPlaceModalData} onclose={() => setIsConnectPlaceModal(!isConnectPlaceModal)} onClickedPlace={(place: any) => connectReview(place)} />}
    </Page >
  )
}

export default ModPostPlan;