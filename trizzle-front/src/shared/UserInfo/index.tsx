import React, { useState } from "react";
import { UserInfoProps } from "./UserInfo.type";
import * as S from "./UserInfo.style"
import ProfileImage from "../../components/ProfileImage";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import { tripThema } from "../../utils/Data/tripThema";

const UserInfo:React.FC<UserInfoProps> = (props: UserInfoProps) => {
  const [nickname, setNickname] = useState(props.nickname);
  const [thema, setThema] = useState(props.thema);

  const handleInputChange = (event: any) => {
    // 입력 값 업데이트
    setNickname(event.target.value);
  };

  const onThemaBadgeClick = (select: any) => {
    // 선택한 아이템이 thema 배열에 이미 존재하는지 확인
    const itemExists = thema.some((item) => item.id === select.id);
  
    if (itemExists) {
      // 이미 선택한 아이템이 있는 경우, 해당 아이템을 제거
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      // 선택한 아이템이 없는 경우, 해당 아이템을 추가
      setThema((prev) => [...prev, select]);
    }
  };

  return (
    <S.Container>
      <ProfileImage type="mid" isMe={true} margin="0 auto 0.5rem auto"/>
      <S.HorizontalContainer>
        <S.Title>이름</S.Title>
        <S.Content>{props.name}</S.Content>
      </S.HorizontalContainer>
      <S.HorizontalContainer>
        <S.Title>아이디</S.Title>
        <S.Content>{props.account_id}</S.Content>
      </S.HorizontalContainer>
      <S.HorizontalContainer>
        <S.Title>소셜</S.Title>
        <S.Content>{props.registration_id}</S.Content>
      </S.HorizontalContainer>
      <S.HorizontalContainer>
        <S.Title>별명</S.Title>
        <S.Content>
          <TextInput  value={nickname} onChange={handleInputChange} styleProps={{width: "100%"}}/> 
        </S.Content>
      </S.HorizontalContainer>
      <S.HorizontalContainer>
        <S.Title>선호 테마</S.Title>
        <S.Content style={{marginLeft:"-0.5rem"}}>
        <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
        </S.Content>
      </S.HorizontalContainer>
    </S.Container>
  );
};

export default UserInfo;