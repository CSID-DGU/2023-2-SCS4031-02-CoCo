import styled from '@emotion/styled';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const CustomDatePicker = styled(ReactDatePicker)`
  display: block;
  width: 100%;
  z-index: 100;
  .react-datepicker-popper {
    z-index: 100;
  }

  .react-datepicker__triangle {
        display: none;
      }
`;

export const CustomPopper = styled.div`
  z-index: 100;
  .react-datepicker__triangle {
        display: none;
      }
`;

export const CustomCalendarContainer = styled(CalendarContainer)`
  width: 100%;
  border: 1px solid #FFF7DA;
  color: #494949;


  

  .react-datepicker__day--in-selecting-range {
    border-radius: 1.25rem;
    background: #FFF7DA;
    
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    border-radius: 50%;
    background-color: #FFF7DA;
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
      color: red;
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
    color: red !important;
  }

  .react-datepicker__header {
    background: #FFF7DA;
    border: none;
  }

  .react-datepicker__navigation--previous {
    right: 1.5rem;
  }

  .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow, .react-datepicker__month-year-read-view--down-arrow, .react-datepicker__navigation-icon::before {
    border-color: #EBB700;
  }

  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
    border-radius: 0.3rem;
    background-color: #fff;
    color: rgb(0, 0, 0);
}

`;

export const Box = styled.div`
  width: 10rem;
  height: 2.5rem;
  border: 1px solid #9e9e9e;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #9e9e9e;
  display: flex;
  justify-content: space-between;
`;

export const DatePickerInput = styled.input`
  width: 6rem;
  height: 100%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: #000;
  font-size: 1rem;
  :focus {
    outline: none;
    
  }
  
`;
