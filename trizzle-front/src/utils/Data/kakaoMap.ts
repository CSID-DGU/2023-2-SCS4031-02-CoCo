
//좌표 결과 : 지번주소, 도로명 주소, 지역, 건물명
export const getAddress = async (Location: { lat: number; lng: number; }) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  
  const result = await new Promise((resolve, reject) => {
    geocoder.coord2Address(Location.lng, Location.lat, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const addressInfo = {
          address: result[0].address.address_name,
          road_address: result[0].road_address.address_name,
          region: result[0].address.region_1depth_name,
          building_name: result[0].road_address.building_name,
        };
        
        resolve(addressInfo); 
      } else {
        reject(status);
      }
    });
  });

  return result;
};

//주소 결과 : 좌표
export const getLocation = async (address: string) => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  const result = await new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const Location = {
          lat: result[0].y,
          lng: result[0].x,
        };
        
        resolve(Location); 
      } else {
        reject(status);
      }
    });
  });

  return result;
}

//키워드 검색 결과 {id, place_name, category_name, category_group_code, category_group_name, phone, address_name, road_address_name, x, y, place_url, distance}
export const searchKeyword = async (keyword: string, page: number) => {
  const places = new window.kakao.maps.services.Places();

  const result = await new Promise((resolve, reject) => {
    places.keywordSearch(keyword, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const updateResult = result.map((item:any) => {
          return {
            id: item.id,
            placeName: item.place_name,
            categoryName:item.category_name, 
            categoryGroupCode : item.category_group_code, 
            categoryGroupName:item.category_group_name, 
            phone: item.phone, 
            addressName: item.address_name, 
            roadAddressName: item.road_address_name, 
            x: item.x, 
            y: item.y, 
            placeUrl: item.place_url, 
            distance: item.distance
          }
        })
        resolve(updateResult); 
      } else {
        reject(status);
      }
    }, {page});
  });

  return result;
}

//카테고리 검색 결과 {id, place_name, category_name, category_group_code, category_group_name, phone, address_name, road_address_name, x, y, place_url, distance}
// export const searchCategory = async (category: string, page: number) => {
//   const places = new window.kakao.maps.services.Places();
//   if(category === "전체") category = "";
//   else category = categoryCode.find((item) => item.name.includes(category))?.code || "";

//   const result = await new Promise((resolve, reject) => {
//     places.categorySearch(category, (result: any, status: any) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         console.log(result);
//         resolve(result); 
//       } else {
//         reject(status);
//       }
//     }, {page});
//   });

//   return result;
// }

interface Location {
  lat: number;
  lng: number;
};

//장소와 장소간 거리 (km로 반환)
export function getDistance(start: Location, end: Location) {
  // 지구의 반지름 (킬로미터)
  const radius = 6371;

  // 라디안으로 변환
  const lat1Rad = (start.lat * Math.PI) / 180;
  const lon1Rad = (start.lng * Math.PI) / 180;
  const lat2Rad = (end.lat * Math.PI) / 180;
  const lon2Rad = (end.lng * Math.PI) / 180;

  // 위도와 경도의 차이 계산
  const latDiff = lat2Rad - lat1Rad;
  const lonDiff = lon2Rad - lon1Rad;

  // Haversine 공식을 사용하여 거리 계산
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 거리 계산 결과 (킬로미터)
  const distance = radius * c;

  return distance;
}
