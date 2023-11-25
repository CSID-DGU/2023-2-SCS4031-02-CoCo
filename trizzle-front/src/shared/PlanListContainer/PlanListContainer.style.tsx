import styled from "@emotion/styled";

export const Container = styled.div<{past:boolean}>`
  width: 35rem;
  height: 7.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  display: flex;
  border: ${props => props.past ? "1px solid #BDBDBD" : "1px solid #747474"};
  margin: 1rem 0; 
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #f6f6f6;
  }
  .icon {
    position: absolute;
    color: #747474;
    top: 0.3rem;
    right: 0.3rem;
  }
`

export const LeftContainer = styled.div<{past:boolean}>`
  width: 10%;
  height: 100%;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.past ? "#FFF7DA" : "#FCC400"};
`

export const RightContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  gap: 0.5rem;
`

export const Title = styled.div<{past:boolean}>`
  width: 100%;
  height: auto;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.past ? "#BDBDBD" : "#000000"};
`

export const Location = styled.div<{past:boolean}>`
  width: 100%;
  height: auto;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${props => props.past ? "#BDBDBD" : "#747474"};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
export const Date = styled.div<{past:boolean}>`
  width: 100%;
  height: auto;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${props => props.past ? "#BDBDBD" : "#747474"};
`

