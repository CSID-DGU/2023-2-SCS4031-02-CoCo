import axios from "axios";

export const getFestivalList = async () => {
  const today = new Date();
  //YYYYMMDD
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const todayDate = `${year}${month < 10 ? `0${month}` : `${month}`}${date < 10 ? `0${date}` : `${date}`}`;
  const response = await axios.get(`http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${import.meta.env.VITE_TOUR_PLACE}&_type=json&MobileOS=WIN&numOfRows=5&MobileApp=test&eventStartDate=${todayDate}`);


  const result = response.data.response.body.items.item;
  const newResult = result.map((item : any) => {
    return {
      region: item.addr1.split(" ")[0],
      address: item.addr1,
      startDate: item.eventstartdate,
      endDate: item.eventenddate,
      name: item.title,
      image: item.firstimage,
      thumbnail: item.firstimage2,
    }
  });
  return newResult;
};
