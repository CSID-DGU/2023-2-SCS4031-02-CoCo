import React,{useState, useEffect} from 'react';
import { Polyline } from 'react-kakao-maps-sdk';

const colors = [
  "#FF0B00", "#FF5C00", "#FFD600", "#61FF00", "#008105", "#00F0FF", "#000AFF", "#AD00FF", "#FF00D6",
  "#FF807A", "#FF9D66", "#FFE767", "#A9FF74", "#76B578", "#87DADF", "#666CFF", "#D273FF", "#FF88EC",
  "#4E0300", "#AA4700", "#5E4F00", "#6DBC3D", "#183719", "#00686F", "#00057E", "#7400AA", "#740061"
];


const DayMarker: React.FC<{day:number, onClick?:() => void, size?:string}> = ({day, onClick, size}) => {
  const [markerColor, setMarkerColor] = useState<string>('');
  const markerSize = size ? size : 'normal';
  useEffect(() => {
    setMarkerColor(colors[day-1]);
  }
  ,[]);
  if(markerSize === 'normal') {
  return (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <ellipse cx="15.5" cy="15" rx="15.5" ry="15" fill={markerColor}/>
      <path d="M14.0489 6.92705C14.3483 6.00574 15.6517 6.00574 15.9511 6.92705L17.2451 10.9098C17.379 11.3219 17.763 11.6008 18.1962 11.6008H22.3839C23.3527 11.6008 23.7554 12.8404 22.9717 13.4098L19.5838 15.8713C19.2333 16.126 19.0866 16.5773 19.2205 16.9894L20.5146 20.9721C20.8139 21.8934 19.7595 22.6596 18.9757 22.0902L15.5878 19.6287C15.2373 19.374 14.7627 19.374 14.4122 19.6287L11.0243 22.0902C10.2405 22.6596 9.18607 21.8934 9.48542 20.9721L10.7795 16.9894C10.9134 16.5773 10.7667 16.126 10.4162 15.8713L7.02827 13.4098C6.24456 12.8404 6.64734 11.6008 7.61606 11.6008H11.8038C12.237 11.6008 12.621 11.3219 12.7549 10.9098L14.0489 6.92705Z" fill="white"/>
    </svg>
  )
  }else{
    return (
      <svg width="20" height="20" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <ellipse cx="15.5" cy="15" rx="15.5" ry="15" fill={markerColor}/>
      <path d="M14.0489 6.92705C14.3483 6.00574 15.6517 6.00574 15.9511 6.92705L17.2451 10.9098C17.379 11.3219 17.763 11.6008 18.1962 11.6008H22.3839C23.3527 11.6008 23.7554 12.8404 22.9717 13.4098L19.5838 15.8713C19.2333 16.126 19.0866 16.5773 19.2205 16.9894L20.5146 20.9721C20.8139 21.8934 19.7595 22.6596 18.9757 22.0902L15.5878 19.6287C15.2373 19.374 14.7627 19.374 14.4122 19.6287L11.0243 22.0902C10.2405 22.6596 9.18607 21.8934 9.48542 20.9721L10.7795 16.9894C10.9134 16.5773 10.7667 16.126 10.4162 15.8713L7.02827 13.4098C6.24456 12.8404 6.64734 11.6008 7.61606 11.6008H11.8038C12.237 11.6008 12.621 11.3219 12.7549 10.9098L14.0489 6.92705Z" fill="white"/>
    </svg>
    )
  }

}

export default DayMarker;

export const DayPolyline: React.FC<{day:number, path:any}> = ({day, path}) => {
  const markerColor =colors[day-1];
  return (
    <Polyline
      path={path}
      strokeColor={markerColor}
      strokeOpacity={0.8}
      strokeWeight={5}
      strokeStyle="solid"
    />
  );
};
