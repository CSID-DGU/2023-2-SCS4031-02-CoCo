import React, { useEffect, useState } from "react";
import * as S from "./DayPlan.style";
import logo from "../../assets/logo/nonTextLogo.svg"
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import res from "src/assets/keywords/trans.svg"
import trans from "../../assets/keywords/trans.svg"
import rest from "../../assets/keywords/rest.svg"
import shopping from "../../assets/keywords/shopping.svg"

type DayPlaceProps = {
  place: any;
  day: number;
  isPlan: boolean;
  isPost?: boolean;
  index: number;
  onPostClick?: () => void;
  onDeleteClick?: (place: any, day: number, index: number) => void;
}

const KeywordList: { keyword: string; src: string; }[] = [
  {keyword:"식사", src: res},
  {keyword:"이동", src: trans},
  {keyword:"휴식", src: rest},
  {keyword:"쇼핑", src: shopping},
];

const DayPlace: React.FC<DayPlaceProps> = (props: DayPlaceProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<any>(null);

  const handleNavigation = () => {

    const data = {
      place_id: props.place.id,
      place_name: props.place.place_name,
    };

    const queryString = new URLSearchParams(data).toString();
    navigate(`/post/places/add/?${queryString}`);
  };

  useEffect(() => {
    if(props.place.hasOwnProperty('keyword') && props.place.keyword !==null) {
      const keywordSrc = KeywordList.filter((key) => {return props.place.keyword === key.keyword});
      setKeyword(keywordSrc);
    }
  }, [])

  if (keyword === null) {
    return (
      <S.PlaceContainer>
        <S.MenuButtonContainer >
          <AiOutlineEllipsis size="1.5rem" onClick={() => setOpen(!open)} />
          {open && (
            <S.MenuContainer>
              {!props.isPlan && props.onPostClick ? (
                props.isPost ? (
                  <S.MenuItem delete={false} onClick={handleNavigation}>게시글 바로가기</S.MenuItem>
                ) : (
                  <S.MenuItem delete={false} onClick={handleNavigation}>게시글 등록</S.MenuItem>
                )
              ) : (
                <S.MenuItem delete={true} onClick={() => { props.onDeleteClick(props.place, props.day, props.index); setOpen(!open) }}>삭제</S.MenuItem>
              )}
            </S.MenuContainer>

          )}
        </S.MenuButtonContainer>
        <S.PlaceLogo>
          <img src={logo} alt="logo" style={{ width: "2.2rem", height: "auto" }} />
        </S.PlaceLogo>
        <S.PlaceInfo>
          <S.PlaceName>{props.place.place_name}</S.PlaceName>
          {/* <S.PlaceAddress>{place.address_name}</S.PlaceAddress> */}
        </S.PlaceInfo>
      </S.PlaceContainer>
    )
  } else {
    if(keyword !== null){
    return (
      <S.PlaceContainer>
        <S.MenuButtonContainer>
          {props.isPlan && (
            <>
              <AiOutlineEllipsis size="1.5rem" onClick={() => setOpen(!open)} />
              {open && (
                <S.MenuContainer>
                  <S.MenuItem delete={true} onClick={() => { props.onDeleteClick(props.place, props.day, props.index); console.log(props.index); setOpen(!open); }}>삭제</S.MenuItem>
                </S.MenuContainer>
              )}
            </>
          )}
        </S.MenuButtonContainer>
        <img src={keyword[0].src} alt="keywordImg" style={{ width: "3.2rem", height: "auto" }} />
        <S.PlaceAddress style={{ width: "auto", marginLeft: "0.4rem" }}>{keyword[0].keyword}</S.PlaceAddress>
      </S.PlaceContainer>
    )} else {
      <></>
    }
  }

}

export default DayPlace;