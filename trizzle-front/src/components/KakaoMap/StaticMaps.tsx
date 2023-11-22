import React from "react";
import { StaticMap } from "react-kakao-maps-sdk";
import { StaticMaspProps } from './Map.type';
import { koreaRegions } from "../../utils/Data/mapData";


const StaticMaps: React.FC<StaticMaspProps> = (props: StaticMaspProps) => {
    const regionCenter = koreaRegions.filter((region) => region.name === props.center)[0];

    return (
        <StaticMap // 지도를 표시할 Container
            center={regionCenter.center}
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