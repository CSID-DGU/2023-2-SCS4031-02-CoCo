import styled from "@emotion/styled";

export const TabContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  margin-bottom: 1rem;
  gap: 0.5rem;
`

export const Tab = styled.div<{active: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({active}) => active ? "#000000" : "#BDBDBD"};
  border-bottom: ${({active}) => active ? "2px solid #000" : "2px solid #dadada"};
`