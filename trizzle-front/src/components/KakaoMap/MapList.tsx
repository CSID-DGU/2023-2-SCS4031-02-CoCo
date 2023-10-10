import React from "react";
import { PlaceList } from "./Map.type";
import * as S from "./Map.styles";

const MapList: React.FC<PlaceList> = (props: PlaceList) => {
  return (
    <div>
      {props.placeInfoList.map((place) => (
        <S.MapListContainer key={place.id}>
          <S.MapInfoContainer>
            {place.place_name}
            {place.address_name}
            {place.phone}
            {place.road_address_name}
            {place.x}
            {place.y}
            {place.place_url}
          </S.MapInfoContainer>
        </S.MapListContainer>
      ))}
    </div>
  );
};

export default MapList;
