import React, {useState} from "react";
import * as S from "./DayPlan.style";
import logo from "../../assets/logo/nonTextLogo.svg"
import {AiOutlineEllipsis} from "react-icons/ai";


type DayPlaceProps = {
  place: any;
  day: number;
  isPlan: boolean;
  isPost?: boolean;
  index: number;
  onPostClick?: () => void;
  onDeleteClick: (place:any, day:number, index:number) => void;
}

const DayPlace: React.FC<DayPlaceProps> = (props: DayPlaceProps) => {
  const [open, setOpen] = useState<boolean>(false);

  if(props.place.hasOwnProperty('y') && props.place.hasOwnProperty('x')) {
    return (
      <S.PlaceContainer>
      <S.MenuButtonContainer >
        <AiOutlineEllipsis size="1.5rem" onClick={() => setOpen(!open)}/>
        {open && (
          <S.MenuContainer>
            {!props.isPlan && props.onPostClick && (
              <S.MenuItem delete={false}>{props.isPost? "게시글 바로가기" : "게시글 등록"}</S.MenuItem>
            )}
            <S.MenuItem delete={true} onClick={()=>{props.onDeleteClick(props.place, props.day, props.index); setOpen(!open)}}>삭제</S.MenuItem>
          </S.MenuContainer>

        )}
      </S.MenuButtonContainer>
      <S.PlaceLogo>
        <img src={logo} alt="logo" style={{width:"2.2rem", height:"auto"}}/>
      </S.PlaceLogo>
      <S.PlaceInfo>
        <S.PlaceName>{props.place.place_name}</S.PlaceName>
        {/* <S.PlaceAddress>{place.address_name}</S.PlaceAddress> */}
      </S.PlaceInfo>
    </S.PlaceContainer>
    )
  } else {
    return(
    <S.PlaceContainer>
    <S.MenuButtonContainer>
      <AiOutlineEllipsis size="1.5rem" onClick={() => setOpen(!open)}/>
      {open && (
        <S.MenuContainer>
          <S.MenuItem delete={true} onClick={()=>{props.onDeleteClick(props.place, props.day, props.index); console.log(props.index);setOpen(!open);}}>삭제</S.MenuItem>
        </S.MenuContainer>
      )}
    </S.MenuButtonContainer>
      <img src={props.place.src} alt="keywordImg" style={{width:"3.2rem", height:"auto"}}/>
      <S.PlaceAddress style={{width:"auto", marginLeft:"0.4rem"}}>{props.place.name}</S.PlaceAddress>
  </S.PlaceContainer>
    )
  }

}

export default DayPlace;