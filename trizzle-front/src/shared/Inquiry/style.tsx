import styled from "@emotion/styled";

export const CardContainer = styled.div`
  width: 15rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  background-color:transparent;
  border: 1px solid #bdbdbd;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    border: 1px solid #FFDC61;
  }
`
export const CardText = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: #000000;
`

export const InquiryModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
`
export const QnA = styled.div`
  width: 5%;
  height: auto;
  font-size: 1.2rem;
  font-weight: 500;
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`
export const InquiryModalText = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #3e3e3e;
`

export const InquiryButton = styled.div`
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #FCC400;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const InquiryInputArea = styled.textarea`
  width: 100%;
  height: 10rem;
  border-radius: 0.75rem;
  border: 1px solid #bdbdbd;
  color: #3e3e3e;
  padding: 1rem;
  resize: none;
  &:focus {
    outline: none;
  }
`

export const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const SummitButton = styled.div`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: transparent;
  border: 2px solid #FCC400;
  color: #3e3e3e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #FFF4CC;
  }
`

export const CancelButton = styled.div`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: transparent;
  border: 2px solid #bdbdbd;
  color: #3e3e3e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border-color: #FF3000;
    color: #FF3000;
  }
`