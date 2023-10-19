import React, {useState} from "react";
import { MarkerProps } from "./Map.type";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import selected from "../../assets/markers/selected.svg"
import unselect from "../../assets/markers/unselect.svg"
import DayMarker from "./DayMarker";
import InfoWindow from "./InfoWindow";

const MapMarkers: React.FC<MarkerProps> = (props: MarkerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {props.markerType === "plan"  && props.day && 
      <>
        <CustomOverlayMap
          key={props.placeInfo.id}
          position={{ lat: props.position.lat, lng: props.position.lng }}
          zIndex={1}
        >
          <DayMarker day={props.day} onClick={() => setOpen(!open)} />
          {open && (
            <InfoWindow MakerProps={props.placeInfo}/>
          
          )}
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