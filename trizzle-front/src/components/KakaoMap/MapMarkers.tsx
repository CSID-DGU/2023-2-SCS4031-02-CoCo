import React from "react";
import { MarkerProps } from "./Map.type";
import { MapMarker } from "react-kakao-maps-sdk";

const MapMarkers: React.FC<MarkerProps> = (props: MarkerProps) => {

  return (
    <>
      {props.markerType === "plan" && props.day &&
        <MapMarker
          key={props.placeInfo.id}
          position={{ lat: props.position.lat, lng: props.position.lng }}
          image={{
            src: `/markers/day${props.day % 3}.png`,
            size: { width: 31, height: 31 },
            options: {
              alt: `${props.day}일차`}
            }}
          onClick={props.onClick}
        />
        }
      {props.markerType === "search" &&
      <MapMarker
        key={props.placeInfo.id}
        position={{ lat: props.position.lat, lng: props.position.lng }}

        image={{
          src: props.selected ? `/markers/selected.svg` : `/markers/unselect.svg`,
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