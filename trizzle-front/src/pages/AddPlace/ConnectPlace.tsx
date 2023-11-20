import { useState, useEffect } from "react";
import Page from "../Page";
import * as S from "./AddPlace.styles";
import TextInput from "../../components/TextInput";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import PostInput from "../../shared/PostEditor";
import ScretDropdown from "../../shared/ScretDropdown";
import DatePicker from "../../components/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";
import { koreaRegions } from "../../utils/Data/mapData";

export default function ConnectPlace() {
  const navigate = useNavigate();
  const planInfor = useParams<{ planId: string, placeName: string }>();
  const [state, fetchData] = useAsync({ url: "", method: "" });
  const [title, setTitle] = useState<string>('');
  const [secretValue, setSecretValue] = useState<boolean>(true);
  const [visitDate, setVisitDate] = useState<any>(new Date());
  const [place, setPlace] = useState<any>({ placeName: planInfor.placeName });
  const [contents, setContents] = useState<string>('');
  const [isPlusPlaceModal, setIsPlusPlaceModal] = useState<boolean>(false);
  const [contentsText, setContentsText] = useState<string>('');
  const region: any = koreaRegions[0];
  const [representImage, setRepresentImage] = useState<string>(''); // 대표이미지

  useEffect(() => {
    console.log(state);
    if (state.error) {
      console.error(state.error);
    } else if (state.data) {
      if (state.data.message === "save success") navigate(`/post/places/${state.data.reviewId}`);
    }
  }, [state]);

  const onSave = () => {
    if (title === '') {
      alert("제목을 입력해주세요.");
      return;
    } else if (new Date() < visitDate) {
      alert("아직 지나지 않은 날짜입니다");
      return;
    }

    const formattedDate = visitDate.toISOString().slice(0, 10);

    // 정보 보내기
    const ResultData = {
      reviewTitle: title,
      visitDate: formattedDate,
      place: place,
      reviewContent: contents,
      reviewContentText: contentsText,
      reviewSecret: secretValue,
      thumbnail: representImage,
      planId: planInfor.planId,
    }

    const response = window.confirm('리뷰 연동 게시글은 나만 보기 설정이 되지 않습니다. 연동하시겠습니까?');
    if (response) {
      const json = JSON.stringify(ResultData);
      console.log(ResultData);
      fetchData('/api/reviews', "POST", json);
    }
  }

  return (
    <Page headersProps={{ isHome: false }}>
      <S.PageTitleContainer>
        <S.PageTitle>장소 리뷰 연동</S.PageTitle>
      </S.PageTitleContainer>
      <form>
        <S.ButtonContainer>
          <ScretDropdown titleValue={secretValue} onScret={(e) => setSecretValue(e)} />
          <div>
            <S.Button type="button" onClick={onSave}>저장</S.Button>
          </div>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{ width: "100%" }} id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          <S.HorizontalSpaceBetweenContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>장소</S.SelectTitle>
              {place && place.placeName !== '' ?
                <S.HorizontalFirstStartContainer style={{ width: 'auto' }}>
                  <div style={{ marginRight: '1.5rem', color: '#747474', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1rem' }}>{place.placeName}</div>
                  <S.SelectPlaceButton onClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)} type="button">장소 변경</S.SelectPlaceButton>
                </S.HorizontalFirstStartContainer>
                :
                <S.SelectPlaceButton onClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)} type="button">장소 추가</S.SelectPlaceButton>
              }
            </S.HorizontalFirstStartContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>방문날짜</S.SelectTitle>
              <DatePicker setStartDate={setVisitDate} startDate={visitDate} />
            </S.HorizontalFirstStartContainer>
          </S.HorizontalSpaceBetweenContainer>
          {/*게시글 에디터 자리*/}
          <PostInput prevData={contents} onChangeContents={(con) => setContents(con)} onThumbnailImages={(img) => setRepresentImage(img)} onChangeContentsText={(con)=> setContentsText(con)}/>

        </S.FormContainer>
      </form>
      {
        isPlusPlaceModal && <AddPlaceModal type="place" onAddPlaceClick={(selectedPlace) => { setPlace(selectedPlace); (selectedPlace); setIsPlusPlaceModal(!isPlusPlaceModal) }} center={region.center} onCloseClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)} />
      }
    </Page>
  );
}