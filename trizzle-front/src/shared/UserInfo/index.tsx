import { useState, useEffect } from "react";
import * as S from "./UserInfo.style"
import ProfileImage from "../../components/ProfileImage";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import { tripThema } from "../../utils/Data/tripThema";
import { useAsync } from "../../utils/API/useAsync";

type userData = {
  accountId : string,
  email: string,
  id: string,
  name : string,
  nickname: string,
  profileImage : any;
  registrationId : string,
  socialId : string,
  thema : string[]
}

const UserInfo = () => {
  const [userData, setUserData] = useState<userData>();
  const [nickname, setNickname] = useState("");
  const [thema, setThema] = useState<{name:string, id:number}[]>([]);
  const [state, fetchData] = useAsync({url:"/api/user"});
  const [ableSubmit, setAbleSubmit] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string>("");

  useEffect(() => {
    if(state.error) console.error(state.error);
    else {
    if(state.data) {
      let data;
      if(state.data.message === "success") data=state.data.updatedUser;
      else data = state.data;

      setUserData(data);
      setNickname(data.nickname);
      setPreviewURL(data.profileImage)
      setThema(data.thema.map((it:any) => {
        const thema = tripThema.filter((item) => {
          return item.name === it
        });
        if(thema) {
        return {
          id: thema[0].id,
          name: thema[0].name
        }} else return;
      }));
    }
  }
  },[state]);

  useEffect(() => {
    const themaNames: string[] = [];
    thema.map((thema) => {
      themaNames.push(thema.name);
    });
    if(nickname !== userData?.nickname || JSON.stringify(userData?.thema.sort()) !== JSON.stringify(themaNames.sort()) || previewURL !== userData?.profileImage) {
      setAbleSubmit(true);
    } else {
      setAbleSubmit(false);
    }
  }, [nickname, thema, previewURL]);

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
      if(thema.length >= 5) {
        alert("5개까지만 선택 가능합니다");
        return;
      }
      // 선택한 아이템이 없는 경우, 해당 아이템을 추가
      setThema((prev) => [...prev, select]);
    }
  };

  const onUpdateData = () => {
    const themaNames: string[] = [];
    thema.map((thema) => {
      themaNames.push(thema.name);
    });
    if(userData !== undefined) {
      if(confirm("수정사항을 저장하시겠습니까?")) {
      const submitData = {
        accountId : userData.accountId,
        email: userData.email,
        id: userData.id,
        name : userData.name,
        nickname: nickname,
        profileImage : previewURL,
        registrationId : userData.registrationId,
        socialId : userData.socialId,
        thema : themaNames
      };
      fetchData(`/api/user/${userData.accountId}`, "PUT", submitData);
    } else {
      return;
    }
  }
  }

  if(userData !== undefined) {
  return (
    <S.Container>
      <S.SubmmitButton onClick={onUpdateData} disabled={!ableSubmit}>저장</S.SubmmitButton>
      <ProfileImage type="mid" isMe={true} margin="0 auto 0.5rem auto" previewURL={previewURL} setPreviewURL={(previewURL:string) => setPreviewURL(previewURL)} src={previewURL}/>
      <S.HorizontalContainer>
        <S.Title>이름</S.Title>
        <S.Content>{userData.name}</S.Content>
      </S.HorizontalContainer>
      <S.HorizontalContainer>
        <S.Title>아이디</S.Title>
        <S.Content>{userData.accountId}</S.Content>
      </S.HorizontalContainer>
      <S.HorizontalContainer>
        <S.Title>소셜</S.Title>
        <S.Content>{userData.registrationId === "kakao"? "카카오" : "구글"}</S.Content>
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
  ); }
  else {
    return (
      <>
      </>
    )
  }
};

export default UserInfo;