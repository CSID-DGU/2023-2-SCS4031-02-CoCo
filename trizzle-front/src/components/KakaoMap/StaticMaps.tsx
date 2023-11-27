import React, { useEffect, useState } from "react";
import { StaticMap } from "react-kakao-maps-sdk";
import { StaticMaspProps } from './Map.type';
import { koreaRegions } from "../../utils/Data/mapData";


const StaticMaps: React.FC<StaticMaspProps> = (props: StaticMaspProps) => {
  const [placeCenter, setPlaceCenter] = useState<any>({ lat: 0, lng: 0 });

  useEffect(() => {
    if (typeof props.center === "string") {
      setPlaceCenter(koreaRegions.filter((region) => {return region.name === props.center })[0].center)
    } else {
      setPlaceCenter({ lat: props.center[1], lng: props.center[0] });
    }
  }, [props.center]);

  return (
    <StaticMap // 지도를 표시할 Container
      center={placeCenter}
      style={{
        // 지도의 크기
        width: props.width,
        height: props.height,
        borderTopRightRadius: "1.5rem",
        borderTopLeftRadius: "1.5rem",
      }}
      level={3} // 지도의 확대 레벨
      marker={false}
    />
  )
}

export default StaticMaps;