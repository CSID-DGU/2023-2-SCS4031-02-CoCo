import React,{useState, useEffect} from "react";
import AddPlaceModal from "../../shared/AddPlaceModal";


const AddPlanPage = () => {
  const [day, setDay] = useState(1);
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onAddButtonClick = (placeId:string) => {
    setPlaceList([...placeList, placeId]);
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} style={{margin:"8rem", backgroundColor:"black", color:"white", width:"25rem", height:"10rem"}}>장소 추가</button>
      {isModalOpen && <AddPlaceModal onAddButtonClick={onAddButtonClick} center={{lat: 37.55767200694191, lng: 127.000260306464}} onCloseClick={() => setIsModalOpen(!isModalOpen)}/>
      }
    </>
  );
}

export default AddPlanPage;