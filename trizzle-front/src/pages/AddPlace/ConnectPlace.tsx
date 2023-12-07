import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "../Page";
import * as S from "./AddPlace.styles";
import TextInput from "../../components/TextInput";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import PostInput from "../../shared/PostEditor";
import ScretDropdown from "../../shared/ScretDropdown";
import { CustomInput } from "../../components/DatePicker";
import { useAsync } from "../../utils/API/useAsync";
import { koreaRegions } from "../../utils/Data/mapData";

export default function ConnectPlace() {
  const path = window.location.pathname;
  const planInfor = useParams<{ planDay: string, planId: string, placeId: string }>();
  const [state, fetchData] = useAsync(path.includes('modifiedPlans') ? { url: `/api/posts/${planInfor.planId}` } : { url: `/api/plans/${planInfor.planId}` });
  const [planData, setPlanData] = useState<any>({});
  const [planDataContent, setPlanDataContent] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [secretValue, setSecretValue] = useState<boolean>(false);
  const [visitDate, setVisitDate] = useState<Date | string>(new Date());
  const [place, setPlace] = useState<any>({ placeName: planInfor.placeId });
  const [contents, setContents] = useState<string>('');
  const [isPlusPlaceModal, setIsPlusPlaceModal] = useState<boolean>(false);
  const [contentsText, setContentsText] = useState<string>('');
  const region: any = koreaRegions[0];
  const [representImage, setRepresentImage] = useState<string>(''); // 대표이미지

  useEffect(() => {
    if (state.error) {
      console.error(state.error);
    } else if (state.data) {
      console.log(state.data);
      if (state.data.reviewId && state.data.message === "save success") {
        fetchData(`/api/reviews/${state.data.reviewId}`);
      } else if (state.data.review) {
        const dayValue = parseInt(planInfor.planDay ? planInfor.planDay : '1', 10);
        const newArray = [...planDataContent];

        if (!newArray[dayValue - 1]) {
          newArray[dayValue - 1] = { placeList: [] };
        }

        // dayValue에 해당하는 placeList를 업데이트
        newArray[dayValue - 1].placeList = (newArray[dayValue - 1].placeList || []).map((place: any) => {
          // _id와 ConnectPlaceModalData.placeId를 비교하여 객체를 찾습니다.
          if (place.id === planInfor.placeId) {
            // 객체를 복사하여 reviewId를 추가한 후 반환합니다.
            return { ...place, review: state.data.review };
          }
          // 찾지 못한 경우 해당 객체를 그대로 반환합니다.
          return place;
        });
        const newArray2 = { ...planData, content: newArray };
        const json = JSON.stringify(newArray2);
        fetchData(`/api/reviews/connect/${state.data.review.id}`, "PUT", json);
      } else if (state.data.message === "connect") {
        opener.location.reload();
        window.close();
      } else if (planInfor) {
        if (path.includes('modifiedPlans')) {
          setPlanData(state.data.post.plan);
          setPlanDataContent(state.data.post.plan.content);
        } else {
          setPlanData(state.data);
          setPlanDataContent(state.data.content);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    if (planDataContent.length !== 0) {
      const dayValue = parseInt(planInfor.planDay ? planInfor.planDay : '1', 10);
      const formatDate = new Date(planData.planStartDate);
      const date = new Date(formatDate.setDate(formatDate.getDate() + (dayValue - 1)));
      setVisitDate(date.toISOString().slice(0, 10));

      const placeInfor = planDataContent[(dayValue - 1)].placeList.filter((item: any) => item.id === planInfor.placeId) || [];
      setPlace(placeInfor[0]);
    }
  }, [planDataContent, planInfor.planDay, planInfor.placeId]);


  const onSave = () => {
    if (title === '') {
      alert("제목을 입력해주세요.");
      return;
    } else if (new Date() < visitDate) {
      alert("아직 지나지 않은 날짜입니다");
      return;
    } else if (contents === '') {
      alert("내용이 입력되지 않았습니다");
      return;
    }

    // 정보 보내기
    const result = {
      reviewTitle: title,
      visitDate: visitDate,
      place: place,
      reviewContent: contents,
      reviewContentText: contentsText,
      reviewSecret: false,
      thumbnail: representImage,
      planId: planInfor.planId,
    }
    const response = window.confirm('이 리뷰는 일정 게시글 등록과 관계 없이 게시됩니다. 연동하시겠습니까?');
    if (response) {
      const json = JSON.stringify(result);
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
          <ScretDropdown titleValue={secretValue} onScret={(e) => setSecretValue(e)} disapled={true} />
          <div>
            <S.Button type="button" onClick={onSave} >저장</S.Button>
          </div>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{ width: "100%" }} id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          <S.HorizontalSpaceBetweenContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>장소</S.SelectTitle>
              <S.HorizontalFirstStartContainer style={{ width: 'auto' }}>
                <div style={{ marginRight: '1.5rem', color: '#747474', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1rem' }}>{place.placeName}</div>
              </S.HorizontalFirstStartContainer>
            </S.HorizontalFirstStartContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>방문날짜</S.SelectTitle>
              <CustomInput value={visitDate} onClick={() => { }} />
            </S.HorizontalFirstStartContainer>
          </S.HorizontalSpaceBetweenContainer>
          {/*게시글 에디터 자리*/}
          <PostInput prevData={contents} onChangeContents={(con) => setContents(con)} onThumbnailImages={(img) => setRepresentImage(img)} onChangeContentsText={(con) => setContentsText(con)} />

        </S.FormContainer>
      </form>
      {
        isPlusPlaceModal && <AddPlaceModal type="place" onAddPlaceClick={(selectedPlace) => { setPlace(selectedPlace); (selectedPlace); setIsPlusPlaceModal(!isPlusPlaceModal) }} center={region.center} onCloseClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)} />
      }
    </Page>
  );
}