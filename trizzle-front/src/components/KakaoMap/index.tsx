import React, { useEffect } from "react";
import * as S from "./Map.styles";
import { MapProps } from "./Map.type";
import MapMarkers from "./MapMarkers";

const Maps: React.FC<MapProps> = (props: MapProps) => {
  console.log(props.markerList);

  switch (props.type) {
    case "search":
      if(props.markerList && props.markerList.length === 0) {
        return (
          <S.MapWrapper>
            <S.SearchMap
              center={props.center}
              level={props.level}
              />
          </S.MapWrapper>
        )
      } else if (props.markerList && props.markerList.length !== 0){
        return (
          <S.SearchMapWrapper>
            <S.SearchMap
              center={props.center}
              level={props.level}
              >
                {props.markerList.map((marker, index) => (
                  <MapMarkers
                    key={index}
                    markerType="search"
                    position={marker.position}
                    placeInfo={marker.placeInfo}
                    selected={marker.selected}
                    onClick={marker.onClick}
                  />
                ))}
              </S.SearchMap>
          </S.SearchMapWrapper>
        )
      }
      break;
    //case 추후 추가
  }
};

export default Maps;