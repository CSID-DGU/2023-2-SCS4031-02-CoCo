import React from "react";
import { MarkerProps } from "./Map.type";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import selected from "../../assets/markers/selected.svg"
import unselect from "../../assets/markers/unselect.svg"
import day from "../../assets/markers/day.svg"
import DayMarker from "./DayMarker";

const MapMarkers: React.FC<MarkerProps> = (props: MarkerProps) => {
  console.log(props.day, props);
  return (
    <>
      {props.markerType === "plan"  && props.day && 
      <>
        {/* <MapMarker
          key={props.placeInfo.id}
          position={{ lat: props.position.lat, lng: props.position.lng }}
          image={{
            src: day,
            size: { width: 20, height: 20 },
            options: {
              alt: `${props.day}일차`}
            }}
          onClick={props.onClick}
        /> */}
        <CustomOverlayMap
          key={props.placeInfo.id}
          position={{ lat: props.position.lat, lng: props.position.lng }}
          zIndex={1}
        >
          <DayMarker day={props.day} onClick={props.onClick}/>
        </CustomOverlayMap>
        </>
        }
      {props.markerType === "search" &&
      <MapMarker
        key={props.placeInfo.id}
        position={{ lat: props.position.lat, lng: props.position.lng }}

        image={{
          src: props.selected ? selected : unselect,
          size: props.selected ? {width:20, height:24.3}:{ width: 20, height: 24.3 },
          options: {
            alt: `${props.placeInfo.place_name}`}
          }}
        onClick={props.onClick}
        zIndex={props.selected ? 1 : 0}
    />
      }
    </>
  );
  };

export default MapMarkers;