import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from './AddPostPlan.styles'
import Page from "../Page";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import UploadPlanModal from "../../shared/UploadPlanModal";
import { tripThema } from "../../utils/Data/tripThema";

const AddPostPlanOpen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [thema, setThema] = useState<any>([]);
  const [isUploadPlanModal, setIsUploadPlanModal] = useState<boolean>(false);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSave = () => {
    alert("불러온 일정이 없습니다.")
  }

  const uploadPlanData = (planData: any) => {
    navigate(`/post/plans/add/${planData.id}`);
  } 

  return (
    <Page headersProps={{ isHome: false }}>
      <S.PageTitleContainer>
        <S.PageTitle>일정 게시글 등록</S.PageTitle>
      </S.PageTitleContainer>
      {/* <form> */}
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
      {isUploadPlanModal && <UploadPlanModal onclose={() => setIsUploadPlanModal(!isUploadPlanModal)} onClickedPlan={(plan: any) => uploadPlanData(plan)} />}
    </Page >
  )
}

export default AddPostPlanOpen;