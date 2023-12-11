export type Location = {
  lat: number;
  lng: number;
};

export type MapProps = {
  center: Location;
  level?: number;
  type: string; //plan, sharePlan, region, search
  markerList?: MarkerProps[];
  children?: React.ReactNode;
};

export type MarkerProps = {
  position: Location;
  markerType: string; //day, place, search
  placeInfo: PlaceInfoList;
  selected?: boolean;
  day?: number;
  onClick?: () => void;

};

export type InfoWindowProps = {
  type: string; //place, linkPost
  infoList: PlaceInfoList;
  onClick?: () => void;
  onCloseClick?: () => void;
};

export type PlaceInfoList = {
  id: string;
  placeName: string;
  categoryName: string;
  categoryGroupCode: string;
  categoryGroupName: string;
  phone: string;
  addressName: string;
  roadAddressName: string;
  x: string;
  y: string;
  placeUrl: string;
};

export type PlaceList = {
  placeInfoList: PlaceInfoList[];
};


export type StaticMaspProps = {
  center: any;
  width: string;
  height: string;
}
