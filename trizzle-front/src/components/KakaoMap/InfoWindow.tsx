import React from "react";
import * as S from "./Map.styles";
import { PlaceInfoList } from "./Map.type";

const InfoWindow: React.FC<{MakerProps: PlaceInfoList}> = ({MakerProps}) => {

  return (
    <S.MapInfoWindow>
      <S.InfoWindowTitle>{MakerProps.place_name}</S.InfoWindowTitle>
      <div>{MakerProps.address_name}</div>
    </S.MapInfoWindow>
  )
}

export default InfoWindow;