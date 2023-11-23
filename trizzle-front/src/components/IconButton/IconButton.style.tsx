import styled from "@emotion/styled";

export const BackButton = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
      transform: scale(1.05);
    }
  }
  .like-icon {
    width: 1.1rem;
    height: 1.1rem;
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