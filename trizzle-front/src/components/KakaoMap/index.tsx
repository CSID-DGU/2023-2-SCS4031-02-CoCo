import React, { useEffect, useState } from "react";
import * as S from "./Map.styles";
import { MapProps } from "./Map.type";
import MapMarkers from "./MapMarkers";
import { DayPolyline } from "./DayMarker";

const Maps: React.FC<MapProps> = (props: MapProps) => {
  const [polylineList, setPolylineList] = useState<any[]>([]);


  console.log(polylineList);

  switch (props.type) {
    case "search":
      if(props.markerList && props.markerList.length === 0) {
        return (
          <S.MapWrapper>
            <S.BeforeSearchMap
              center={props.center}
              level={props.level}
              />
          </S.MapWrapper>
        )
      } else if (props.markerList && props.markerList.length !== 0){
        return (
          <S.SearchMapWrapper>
            {props.children}
            <S.SearchMap
              center={props.center}
              level={props.level}
              >
                {props.markerList.map((marker, index) => (
                  <MapMarkers
                    key={index}
                    markerType="search"
                    day={marker.day}
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
    case "plan":
      return (
        <S.PlanMapWrapper>
          <S.PlanMap
            center={props.center}
            level={props.level}
            >
              {props.markerList && props.markerList.map((marker, index) => (
                <MapMarkers
                  key={index}
                  markerType="plan"
                  position={marker.position}
                  placeInfo={marker.placeInfo}
                  day={marker.day}
                />
              ))}
            </S.PlanMap>
        </S.PlanMapWrapper>
      )
    //case 추후 추가
  }
};

export default Maps;