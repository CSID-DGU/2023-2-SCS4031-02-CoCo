import { useState, useEffect } from "react";
import * as S from "./SearchPlaceModal.style";
import Maps from "../../components/KakaoMap";
import SearchInput from "../../components/SearchInput";
import { searchKeyword } from "../../utils/Data/kakaoMap";
import Modal from "../../components/Modal";


type props = {
  type?: string; //place, plan
  onAddButtonClick?: (selectedPlace: any, day: any) => void;
  onAddPlaceClick?: (selectedPlace: any) => void
  center: { lat: number, lng: number };
  region?: any;
  onCloseClick: () => void;
}

const AddPlaceModal = (props: props) => {
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [center, setCenter] = useState<any>(props.center);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [value, setValue] = useState<string>("");
  const [markerList, setMarkerList] = useState<any[]>([]);

  const handleSearch = async (keyword: string) => {
    const result: any = await searchKeyword(keyword, 1);
    if (props.region) {
      const updateResult = result.filter((place: any) => { return place.addressName.slice(0, 2) === props.region.id });

      setPlaceList(updateResult);

      updateResult.map((place: any) => {
        setMarkerList((prev) => [...prev, {
          position: { lat: place.y, lng: place.x },
          placeInfo: place,
          selected: false,
          onClick: () => setSelectedPlace(place.id),
        }])
      })
    } else {
      setPlaceList(result);
      result.map((place: any) => {
        setMarkerList((prev) => [...prev, {
          position: { lat: place.y, lng: place.x },
          placeInfo: place,
          selected: false,
          onClick: () => setSelectedPlace(place.id),
        }])
      });

    }

    setCenter({ lat: result[0].y, lng: result[0].x });
  }

  function handleSelectPlace(place: any) {
    setSelectedPlace(place.id);
    const lat = place.y;
    const lng = place.x;
    setCenter({ lat, lng });
  }



  useEffect(() => {

    const updatedMarkerList = markerList.map((marker) => {
      return {
        position: marker.position,
        placeInfo: marker.placeInfo,
        onClick: marker.onClick,
        selected: marker.placeInfo.id === selectedPlace ? true : false,
      };
    });
    setMarkerList(updatedMarkerList);

    // 선택된 항목의 배경색 변경
    if (selectedPlace !== null) {
      const selectedElement = document.getElementById(selectedPlace);
      if (selectedElement) {
        selectedElement.style.backgroundColor = "#f5f5f5";
        selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // 이전에 선택한 항목의 배경색 원래대로 돌리기
    markerList.forEach((marker) => {
      if (marker.placeInfo.id !== selectedPlace) {
        const deselectedElement = document.getElementById(marker.placeInfo.id);
        if (deselectedElement) {
          deselectedElement.style.backgroundColor = "#ffffff"; // 원래 배경색으로 변경

        }
      }
    });
  }, [selectedPlace]);

  const handleEnter = async (e: any, value: string) => {
    if (e.key === "Enter") {
      setKeyword(value);
      await handleSearch(keyword);
    }
  }

  const handleInputChange = (event: any) => {
    // 입력 값 업데이트
    setValue(event.target.value);
  };

  const handleSearchClick = (value: string) => {
    setKeyword(value);
  }

  useEffect(() => {
    if (keyword !== "") {
      handleSearch(keyword);
    }
  }
    , [keyword]);


  return (
    <Modal title="장소 추가" onCloseClick={props.onCloseClick} styleProps={{ width: "80%", height: "80%" }}>
      <S.InputWrapper>
        <SearchInput
          value={value}
          onChange={handleInputChange}
          onKeyPress={(e) => handleEnter(e, value)}
        />
        <S.SearchButton onClick={() => handleSearchClick(value)} id="searchButton">검색</S.SearchButton>
      </S.InputWrapper>
      {placeList.length === 0 ? (
        <S.MapWrapper>
          <Maps
            type="search"
            center={center}
            level={5}
            markerList={placeList}
          />
        </S.MapWrapper>
      ) : (
        <S.MapWrapper>
          <Maps
            type="search"
            center={center}
            level={5}
            markerList={markerList}
          />
          <S.MapListContainer>
            <S.ListItemContainer>
              <S.ListItemTitle>검색결과</S.ListItemTitle>
            </S.ListItemContainer>
            {placeList.map((place, index) => (
              <S.ListItemContainer key={index} onClick={() => handleSelectPlace(place)} id={place.id}>
                <S.PlaceNameConatiner>
                  <S.PlaceName>{place.placeName}</S.PlaceName>
                  <S.PlaceCategory>{place.categoryGroupName}</S.PlaceCategory>
                </S.PlaceNameConatiner>
                <S.PlaceNameConatiner>
                  <S.PlaceTitle>주소</S.PlaceTitle>
                  <S.PlaceRoadAddress>{place.roadAddressName}</S.PlaceRoadAddress>
                </S.PlaceNameConatiner>
                <S.PlaceAdress>{place.addressName}</S.PlaceAdress>
                <S.ButtonsWrapper>
                  {props.type === "place" ? (
                    <S.Buttons onClick={() => {props.onAddPlaceClick && props.onAddPlaceClick(place)}}>장소 선택</S.Buttons>
                  ) : (
                    <S.Buttons onClick={(day) => {props.onAddButtonClick && props.onAddButtonClick(place, day)}}>일정에 추가</S.Buttons>
                  )}

                  <S.Buttons>
                    <a href={place.placeUrl} target="_blank" rel="noreferrer" id={place.id}>
                      상세페이지
                    </a>
                  </S.Buttons>
                </S.ButtonsWrapper>
              </S.ListItemContainer>
            ))}
          </S.MapListContainer>
        </S.MapWrapper>
      )}
    </Modal>
  )
};

export default AddPlaceModal;
