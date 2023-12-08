import React from "react";
import * as S from "./Map.styles";
import { PlaceInfoList } from "./Map.type";

const InfoWindow: React.FC<{MakerProps: PlaceInfoList}> = ({MakerProps}) => {

  return (
    <S.MapInfoWindow>
      <S.InfoWindowTitle>{MakerProps.placeName}</S.InfoWindowTitle>
      <a href={`${MakerProps.placeUrl}`} target="_blank" rel="noreferrer">
        <S.InfoAddress>{MakerProps.addressName}</S.InfoAddress>
      </a>
    </S.MapInfoWindow>
  )
}

export default InfoWindow;