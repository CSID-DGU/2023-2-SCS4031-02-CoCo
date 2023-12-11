import React, { useEffect, useState } from "react";
import * as S from "./DayPlan.style";
import logo from "../../assets/logo/nonTextLogo.svg"
// import { AiOutlineEllipsis } from "react-icons/ai";
import Menu from "../../components/Menu";
import res from "../../assets/keywords/res.svg"
import trans from "../../assets/keywords/trans.svg"
import rest from "../../assets/keywords/rest.svg"
import shopping from "../../assets/keywords/shopping.svg"

type DayPlaceProps = {
  place: any;
  day: number;
  isPlan: boolean;
  isPost?: boolean;
  id?: string;
  secret?: boolean;
  index: number;
  onPostClick?: () => void;
  onDeleteClick?: (day: number, index: number) => void;
}

const KeywordList: { keyword: string; src: string; }[] = [
  { keyword: "식사", src: res },
  { keyword: "이동", src: trans },
  { keyword: "휴식", src: rest },
  { keyword: "쇼핑", src: shopping },
];

const DayPlace: React.FC<DayPlaceProps> = (props: DayPlaceProps) => {
  // const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<any>(null);
  const [menuItem, setMenuItem] = useState<any[]>([]);

  useEffect(() => {
    if (props.place.hasOwnProperty('keyword') && props.place.keyword !== null) {
      const keywordSrc = KeywordList.filter((key) => props.place.keyword === key.keyword);
      setKeyword(keywordSrc);
      if (props.onDeleteClick) {
        setMenuItem([{ content: "삭제", onClick: () => { props.onDeleteClick && props.onDeleteClick(props.day, props.index) } }]);
      }
    } else {
      if (props.isPlan && props.onDeleteClick) {
        setMenuItem([{ content: "삭제", onClick: () => props.onDeleteClick && props.onDeleteClick(props.day, props.index), isDelete: true }]);
      }
    }
  }, [props.place, props.day, props.index, props.onDeleteClick, props.isPlan, props.isPost, props.id]);


  if (props.place.hasOwnProperty('placeName') && props.place.placeName !== null) {
    return (
      <S.PlaceContainer>
        {menuItem.length !== 0 &&
          <Menu item={menuItem} />
        }
        <S.PlaceLogo>
          <img src={logo} alt="logo" style={{ width: "2.2rem", height: "auto" }} />
        </S.PlaceLogo>
        <S.PlaceInfo>
          <S.PlaceName>{props.place.placeName}</S.PlaceName>
          {/* <S.PlaceAddress>{place.address_name}</S.PlaceAddress> */}
        </S.PlaceInfo>
      </S.PlaceContainer>
    )
  } else {
    if (keyword !== null) {
      return (
        <S.PlaceContainer>
          {menuItem.length !== 0 &&
            <Menu item={menuItem} />
          }
          <img src={keyword[0].src} alt="keywordImg" style={{ width: "3.2rem", height: "auto" }} />
          <S.PlaceAddress style={{ width: "auto", marginLeft: "0.4rem" }}>{keyword[0].keyword}</S.PlaceAddress>
        </S.PlaceContainer>
      )
    } else {
      <></>
    }
  }

}

export default DayPlace;