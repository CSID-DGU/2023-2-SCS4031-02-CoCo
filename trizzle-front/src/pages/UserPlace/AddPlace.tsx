import React, { useState, useEffect } from "react";
import Page from "../Page";
import * as S from "./AddPlace.styles";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import PostEditor from "../../components/PostEditor/index";

const sel = [{ name: "나만 보기", value: "나만 보기" }, { name: "게시하기", value: "게시하기" }];
const AddPlacePage = () => {
  const currentDate: Date = new Date();
  console.log(currentDate);
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<string>("공개 범위");
  const [thema, setThema] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [isPlusPlaceModal, setIsPlusPlaceModal] = useState<boolean>(false);
  const [region, setRegion] = useState<any>({ name: "서울특별시", center: { lat: 37.55767200694191, lng: 127.000260306464 } });

  useEffect(()=>{
    console.log(isPlusPlaceModal)
  },[isPlusPlaceModal]);

  // 모달 열기
  const openModal = () => {
    setIsPlusPlaceModal(!isPlusPlaceModal);
  };

  // 모달 닫기


  const onPlaceAddButtonClick = (place: any) => {
    console.log(place);
    setIsPlusPlaceModal(!isPlusPlaceModal)
  }

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <S.PageTitleContainer>
        <S.PageTitle>개별 장소 등록</S.PageTitle>
      </S.PageTitleContainer>
      <form>
        <S.ButtonContainer>
          {/* <S.Select>
            <S.Option>나만보기</S.Option>
            <S.Option>게시하기</S.Option>
          </S.Select> */}
          <DropdownMenu name={value} items={sel} onClick={(e) => { setValue(e.value) }} />
          <div>
            <S.Button>임시저장</S.Button>
            <S.Button>저장</S.Button>
          </div>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{ width: "100%" }} id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          <S.HorizontalSpaceBetweenContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>장소</S.SelectTitle>
              {place === "" ?
                <S.SelectPlaceButton onClick={() => setIsPlusPlaceModal(!isPlusPlaceModal)}>장소 추가</S.SelectPlaceButton>
                :
                <S.HorizontalFirstStartContainer style={{ width: 'auto' }}>
                  <div style={{ marginRight: '1.5rem', color: '#747474', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1rem' }}>{place}</div>
                  <S.SelectPlaceButton onClick={openModal}>장소 변경</S.SelectPlaceButton>
                </S.HorizontalFirstStartContainer>
              }
            </S.HorizontalFirstStartContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>작성날짜</S.SelectTitle>
              <div style={{ marginRight: '1.5rem', color: '#747474', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1rem' }}>{currentDate.toLocaleString()}</div>
            </S.HorizontalFirstStartContainer>
            <S.HorizontalFirstStartContainer>
              <S.SelectTitle>방문날짜</S.SelectTitle>
              <div>20XX.XX.XX</div>
            </S.HorizontalFirstStartContainer>
          </S.HorizontalSpaceBetweenContainer>
          <TextInput name="thema" title="테마" placeholder="테마를 입력해주세요." styleProps={{ width: "100%" }} id="thema" onChange={(event) => setThema(event.target.value)} value={thema} />

          {/*게시글 에디터 자리*/}
          <input style={{ height: '20rem', border: '1px soild black' }} />
          {/* <PostEditor /> */}

        </S.FormContainer>
      </form>
      {isPlusPlaceModal && <AddPlaceModal onAddButtonClick={() => {console.log(isPlusPlaceModal)}} center={region.center} onCloseClick={closeModal} />
      }
    </Page>
  );


};

export default AddPlacePage;