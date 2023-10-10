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
          onClick={() => props.onClick}
        />
        }
      {props.markerType === "search" && props.selected &&
      <MapMarker
        key={props.placeInfo.id}
        position={{ lat: props.position.lat, lng: props.position.lng }}
        image={{
          src: props.selected ? `/markers/selected.png` : `/markers/unselect.png`,
          size: { width: 35, height: 35 },
          options: {
            alt: `${props.placeInfo.place_name}`}
          }}
        onClick={() => props.onClick}
    />
      }
    </>
  );
  };

export default MapMarkers;