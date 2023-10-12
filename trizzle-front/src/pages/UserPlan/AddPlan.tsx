import React,{useState, useEffect} from "react";
import AddPlaceModal from "../../shared/AddPlaceModal";


const AddPlanPage = () => {
  const [day, setDay] = useState(1);
  const [placeList, setPlaceList] = useState<any[]>([]);

  const onAddButtonClick = (placeId:string) => {
    setPlaceList([...placeList, placeId]);
  }

  return (
    <>
      <AddPlaceModal onAddButtonClick={onAddButtonClick} center={{lat: 37.55767200694191, lng: 127.000260306464}}/>
    </>
  );
}

export default AddPlanPage;