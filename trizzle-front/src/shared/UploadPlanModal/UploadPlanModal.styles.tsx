import styled from "@emotion/styled";

export const UploadModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin: auto;
`

export const HorizontalCenterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`

export const VerticalCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.7rem;
  
`

export const VerticalFlexStartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  justify-items: flex-start;
  align-items: flex-start;
  margin: 0 0 0.5rem 0;
`

export const CheckBox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
`

export const CheckBoxLabel = styled.label`
  margin: 0 0.5rem 0 0;
  font-size: 1rem;
  `

export const Input = styled.input`

  width: 10rem;
  height: 2rem;
  border: 1px solid #4B3A00;
`

export const Button = styled.button`
  padding: 0 0.7rem;
  width: auto;
  height: 2rem;
  background-color: #FFECAA;
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
`

export const PlanListContainer = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20rem;
  height: 5rem;
  border: 1px solid #FFF4CC;
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px #9E9E9E;
  &:hover{
    border: 2px solid #FFDC61;
  }
`

export const RegionText = styled.button`
  padding: 0 0.5rem;
  width: 7rem;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: #FFF4CC;
  border-top-left-radius: 0.95rem;
  border-bottom-left-radius: 0.95rem;
`

export const PlanTitleText = styled.button`
  margin: 0 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 500;
`

export const PlanDateText = styled.button`
  margin: 0 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 300;
  color: #747474;
`

export const PageNation = styled.button<{isActive: boolean}>`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? '800' : 'normal')};
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? '#FDE68A' : '')};
`