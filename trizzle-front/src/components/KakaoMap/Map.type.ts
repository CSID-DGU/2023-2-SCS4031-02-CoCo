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
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
};

export type PlaceList = {
  placeInfoList: PlaceInfoList[];
};

