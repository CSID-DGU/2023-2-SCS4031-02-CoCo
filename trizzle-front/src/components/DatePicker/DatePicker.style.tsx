import styled from '@emotion/styled';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';

export const CustomDatePicker = styled(ReactDatePicker)`
  display: block;
  width: 100%;
`;

export const CustomCalendarContainer = styled(CalendarContainer)`
  width: 100%;
  border: none;
  color: #494949;

  .react-datepicker__day--in-selecting-range {
    border-radius: 20px;
    background: #f0f9ec;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    border-radius: 50%;
    background-color: #cfecc5;
    color: #494949;
  }

  .react-datepicker__day:hover {
    border-radius: 50%;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-name {
    :first-child {
      color: #ed6666;
    }
    width: 2.7rem;
    margin: 0.166rem;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .sunday {
    color: #ed6666 !important;
  }

  .react-datepicker__header {
    background: none;
    border: none;
  }

  .react-datepicker__navigation--previous {
    right: 24px;
    left: auto;
  }
`;

export const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px;
  width: 100%;
  line-height: 50px;
  border-radius: 10px;
  border: 1px solid #d4d5d2;
  padding-inline: 20px 9px;
  background: #f7f7f7;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 151px;
  background: #f7f7f7;
  border: none;
  outline: none;
  cursor: pointer;
`;
