import styled from "@emotion/styled";

export const PageTitleContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF7DA;
  position:absolute;
  top: 4.5rem;
  left: 0;
`;

export const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 11rem;
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

export const PlanDateContainer = styled.div`
  display: flex;
  width: auto;
  gap: 1rem;
  left: 50%;
  align-items: center;
  position:absolute;
  justify-content: flex-start;
`

