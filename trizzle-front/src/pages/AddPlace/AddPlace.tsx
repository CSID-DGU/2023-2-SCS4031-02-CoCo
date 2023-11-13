import React, { useState, useEffect } from "react";
import Page from "../Page";
import * as S from "./AddPlace.styles";
import TextInput from "../../components/TextInput";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import PostInput from "../../shared/PostEditor";
import ScretDropdown from "../../shared/ScretDropdown";
import DatePicker from "../../components/DatePicker";
import { useLocation, useNavigate } from "react-router-dom";

interface AddPlacePageProps {
  userContent: any;
}

const currentDate: Date = new Date();

const SampleData = {
  user_id: 0,
  review_title: '',
  review_registration_date: currentDate,
  visit_date: currentDate,
  place_id: '',
  review_content: '',
  secret: true,
}

export default function AddPlacePage({ userContent }: AddPlacePageProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [userContents, setUserContents] = useState(userContent ? userContent : SampleData);
  const [title, setTitle] = useState<string>('');
  const [secretValue, setSecretValue] = useState<boolean>(false);
  const [reviewRegistrationDate, setReviewRegistrationDate] = useState<string>(userContents.review_registration_date.toLocaleString());
  const [visitDate, setVisitDate] = useState<string>(userContents.visit_date);
  const [placeId, setPlaceId] = useState<string>(searchParams.get('place_id'));
  const [placeName, setPlaceName] = useState<string>(searchParams.get('place_name'));
  const [contents, setContents] = useState<string>(userContents.review_content);
  const [isPlusPlaceModal, setIsPlusPlaceModal] = useState<boolean>(false);
  const [region, setRegion] = useState<any>({ name: "서울특별시", center: { lat: 37.55767200694191, lng: 127.000260306464 } });
  const [representImage, setRepresentImage] = useState<string>(''); // 대표이미지
  const navigate = useNavigate();

  // 모달 열고 닫기
  const openCloseModal = () => {
    setIsPlusPlaceModal(!isPlusPlaceModal);
  };

  const onSave = () => {
    if (title === '') {
      alert("제목을 입력해주세요.");
      return;
    } else if (userContents.review_registration_date < visitDate) {
      alert("아직 지나지 않은 날짜입니다");
      return;
    }

    // 정보 보내기
    const ResultData = {
      user_id: 0,
      post_id: Math.floor(Math.random() * 1000000000) + 1,
      review_title: title,
      review_registration_date: currentDate,
      visit_date: visitDate,
      place_id: placeId,
      place_name: placeName,
      review_content: contents,
      secret: secretValue,
      reImg: representImage,
      plan_title: '',
    }

    localStorage.setItem("postData", JSON.stringify(ResultData));
    if (secretValue) {
      navigate(`/post/places/${ResultData.post_id}`);
    } else {
      navigate(`/post/places/secret/${ResultData.post_id}`);
    }
  }

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <S.PageTitleContainer>
        <S.PageTitle>개별 장소 등록</S.PageTitle>
      </S.PageTitleContainer>
      <form>
        <S.ButtonContainer>
          <ScretDropdown title_value={secretValue} onScret={(e) => setSecretValue(e)} />
          <div>
            <S.Button type="button" >임시저장</S.Button>
            <S.Button type="button" onClick={onSave}>저장</S.Button>
          </div>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{ width: "100%" }} id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          <S.HorizontalSpaceBetweenContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>장소</S.SelectTitle>
              {placeName === "" ?
                <S.SelectPlaceButton onClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)} type="button">장소 추가</S.SelectPlaceButton>
                :
                <S.HorizontalFirstStartContainer style={{ width: 'auto' }}>
                  <div style={{ marginRight: '1.5rem', color: '#747474', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1rem' }}>{placeName}</div>
                  <S.SelectPlaceButton onClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)} type="button">장소 변경</S.SelectPlaceButton>
                </S.HorizontalFirstStartContainer>
              }
            </S.HorizontalFirstStartContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>작성날짜</S.SelectTitle>
              <div style={{ marginRight: '1.5rem', color: '#747474', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1rem' }}>{reviewRegistrationDate}</div>
            </S.HorizontalFirstStartContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>방문날짜</S.SelectTitle>
              {/* 데이터 피커 자리인데 우선 input 태그로 */}
              <DatePicker setStartDate={setVisitDate} startDate={visitDate} />
            </S.HorizontalFirstStartContainer>
          </S.HorizontalSpaceBetweenContainer>
          {/*게시글 에디터 자리*/}
          <PostInput prevData={contents} onChangeContents={(con) => setContents(con)} onThumbnailImages={(img) => setRepresentImage(img)} />
          
        </S.FormContainer>
      </form>
      {
        isPlusPlaceModal && <AddPlaceModal onAddButtonClick={(selectedPlace) => onPlaceAddButtonClick(selectedPlace)} center={region.center} onCloseClick={openCloseModal} />
      }
    </Page>
  );
};