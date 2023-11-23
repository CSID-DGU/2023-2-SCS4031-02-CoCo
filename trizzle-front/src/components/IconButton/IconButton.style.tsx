import styled from "@emotion/styled";

export const BackButton = styled.div<{type?:string}>`
  width: ${props => props.type==="bookmark" ? "3rem" : "2rem"};
  height: ${props => props.type==="bookmark" ? "3rem" : "2rem"};
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out; 
  &:hover {
    background-color: #f2f2f2;
  }
  &:active {
    background-color: #FFF7DA;
    transform: scale(1.05);
  }
  .unlike-icon {
    width: 1.1rem;
    height: 1.1rem;
    color: #000;
    transition: transform 0.3s ease-in-out;
    &:active {
      transform: scale(1.2);
    }
  }
  .like-icon {
    width: 1.3rem;
    height: 1.3rem;
    color: #FF0000;
  }
  .unthumb-icon{
    width: 1rem;
    height: 1rem;
    color: #000;
    transition: transform 0.3s ease-in-out;
    &:active {
      transform: scale(1.05);
    }
  }
  .thumb-icon {
    width: 1rem;
    height: 1rem;
    color: #000;
  }

`