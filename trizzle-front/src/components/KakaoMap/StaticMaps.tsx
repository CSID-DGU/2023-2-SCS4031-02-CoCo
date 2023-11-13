import React from "react";
import { StaticMap } from "react-kakao-maps-sdk";
import { StaticMapsProps } from './Map.type';
import { koreaRegions } from "../../utils/Data/mapData";


const StaticMaps: React.FC<StaticMapsProps> = (props: StaticMaspProps) => {
    const regionCenter = koreaRegions.filter((region) => region.name === props.center)[0];

    return (
        <StaticMap // 지도를 표시할 Container
            center={regionCenter.center}
            style={{
                // 지도의 크기
                width: props.width,
                height: props.height,
            }}
            level={3} // 지도의 확대 레벨
        />
    )
}

export default StaticMaps;