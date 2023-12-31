import styled from "@emotion/styled";

export const ThumbnailNoneContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9rem;
  background-color: #FFF7DA;  
`

export const ThumbnailContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9rem;
`

export const UploadThumnailButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.5rem;
  height: 2rem;
  border: 1px solid #000000;
  border-radius: 0.5rem;
  color: #000000;
  font-weight: 500;
  cursor: pointer;
  z-index: 1; /* 수정: z-index 추가 */
  &:hover {
    border: 1.5px solid #000000;
    color: #000000;
    font-weight: 700;
  }
`

export const UploadThumnailInput = styled.input`
  display: none;
  position: relative;
  width: 100%;
  height: 9rem;
  background-color: #FFF7DA; 
`

export const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

export const HorizontalLine = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: #e4e4e4;
  margin: 1.5rem 0;
`

export const Button = styled.button`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #BEBEBE;
  font-size: 1rem;
  font-weight: 400;
  color: #BEBEBE;
  cursor: pointer;
  &:hover {
    border:2px solid #747474;
    color: #747474;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
`

export const SelectTitle = styled.div`
  width: auto;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 1rem;
`

export const DropTitle = styled.div`
  width: 4.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 1rem;
`

export const PlanDateContainer = styled.div`
  display: flex;
  width: auto;
  gap: 1rem;
  left: 50%;
  align-items: center;
  position:absolute;
  justify-content: flex-start;
`

export const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 20rem;
  border: 1px solid #949494;
  border-radius: 1.5rem;
  &:hover{
    border: 2px solid #949494;
  }
`

export const MapAndDayPlanContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`

export const DayPlanPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 45%;
  height: 34rem;
  border: 2px solid #FFDC61;
  position: relative;
  top: -0.5rem;
  padding: 1rem;
`

export const DayPlanPostInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
`

export const DayPlanCopyButton = styled.button`
  margin: 0 0 0.5rem 0;
  width: 28rem;
  text-align: end;
`

export const UploadPlanButton = styled.button<{ isHovered: boolean }>`
  padding: 0 0.5rem;
  height: 2rem;
  border: ${({ isHovered }) => (isHovered ? '1.5px solid #C8C8C8' : '1px solid #D9D9D9')};
  border-radius: 0.5rem;
  color: ${({ isHovered }) => (isHovered ? '#C8C8C8' : '#D9D9D9')};
  font-weight: ${({ isHovered }) => (isHovered ? '700' : '500')};
`



