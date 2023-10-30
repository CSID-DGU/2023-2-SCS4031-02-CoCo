import React, { useState, useEffect } from "react";
import Page from "../Page";
import * as S from "./AddPlace.styles";
import TextInput from "../../components/TextInput";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import PostInput from "./PostEditor";
import ScretDropdown from "./ScretDropdown";

interface AddPlacePageProps {
  userContent: any;
}

const currentDate: Date = new Date();

const SampleData = {
  user_id: 0,
  review_title: '',
  review_registration_date: currentDate.toLocaleString(),
  visit_date: currentDate.toLocaleString(),
  place_id: '',
  review_content: '',
  secret: true,
}

export default function AddPlacePage({ userContent }: AddPlacePageProps) {
  const [userContents, setUserContents] = useState(userContent ? userContent : SampleData);
  const [title, setTitle] = useState<string>(userContents.title);
  const [secretValue, setSecretValue] = useState<boolean>(false);
  const [reviewRegistrationDate, setReviewRegistrationDate] = useState<string>(userContents.review_registration_date);
  const [visitDate, setVisitDate] = useState<string>(userContents.visit_date);
  const [placeName, setPlaceName] = useState<string>('');
  const [placeId, setPlaceId] = useState<string>(userContents.place_id);
  const [contents, setContents] = useState<string>(userContents.review_content);
  const [isPlusPlaceModal, setIsPlusPlaceModal] = useState<boolean>(false);
  const [region, setRegion] = useState<any>({ name: "서울특별시", center: { lat: 37.55767200694191, lng: 127.000260306464 } });

  // 모달 열고 닫기
  const openCloseModal = () => {
    setIsPlusPlaceModal(!isPlusPlaceModal);
  };

  const onPlaceAddButtonClick = (place: any) => {
    console.log('장소', place.place_name, place.place_id);
    setPlaceName(place.place_name);
    setPlaceId(place.place_id);
    setIsPlusPlaceModal(!isPlusPlaceModal);
  }

  const onSave = () => {
    // 정보 보내기
    const ResultData = {
      user_id: 0,
      review_title: title,
      review_registration_date: currentDate,
      visit_date: visitDate,
      place_id: placeId,
      review_content: contents,
      secret: Value,
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
              <input onChange={(e) => setVisitDate(e.target.value)} value={visitDate}/>
            </S.HorizontalFirstStartContainer>
          </S.HorizontalSpaceBetweenContainer>
          {/*게시글 에디터 자리*/}
          <PostInput prevData={contents} onChangeContents={(con) => setContents(con)} />

        </S.FormContainer>
      </form>
      {isPlusPlaceModal && <AddPlaceModal onAddButtonClick={(selectedPlace) => onPlaceAddButtonClick(selectedPlace)} center={region.center} onCloseClick={openCloseModal} />
      }
    </Page>
  );
};