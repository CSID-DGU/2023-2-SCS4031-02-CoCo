import React from "react";
import * as S from "./DatePicker.style";
import {AiOutlineCalendar} from "react-icons/ai";

export const CustomInput:React.FC<{value: any, onClick:()=>void}> = ({value, onClick}) => {
  return(
    <S.Box onClick={onClick}>
      <S.DatePickerInput value={value} readOnly/>
      <AiOutlineCalendar size="1.3rem"/>
    </S.Box>
  )
}

const DatePicker: React.FC<{setStartDate: any, startDate: any}> = ({setStartDate, startDate}) => {

  return(
    <S.CustomDatePicker
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      dateFormat="yyyy-MM-dd"
      customInput={<CustomInput value={startDate} onClick={() => console.log("please")}/>}
      calendarContainer={S.CustomCalendarContainer}
      popperContainer={S.CustomPopper}
    />


  )

}

export default DatePicker;