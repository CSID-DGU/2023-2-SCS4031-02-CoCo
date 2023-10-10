import React, { useEffect } from "react";
import * as S from "./Map.styles";
import { MapProps } from "./Map.type";
import { getAddress, getLocation, searchKeyword, searchCategory, getDistance } from "../../utils/kakaoMap";

const Maps:React.FC<MapProps> = (props: MapProps) => {

  const centerLocation = {
    lat: 37.561437,
    lng: 127.002053, 
  };

  // useEffect(() => {
  //   const search = async () => {
  //     const distance = await getDistance({lat: 38.561437, lng: 127.002053 }, { lat: 37.561437, lng: 127.002053 })
  //     const searchKyeword = await searchKeyword('울릉식당', 1);
  //     console.log(searchKyeword)
  //     console.log(distance)
  //   }
  //   search()
  // }, []);

  console.log('Maps')
  return (
    <S.MapWrapper>
      <S.MapContainer
        center={props.Center ? props.Center : centerLocation}
        level={props.Level ? props.Level : 3}
      />
    </S.MapWrapper>
  )
};

export default Maps;