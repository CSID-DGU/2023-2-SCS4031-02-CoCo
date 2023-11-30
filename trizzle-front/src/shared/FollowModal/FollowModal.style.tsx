import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`

export const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`

export const ItemContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #f2f2f2;
  }
`

export const ItemText = styled.div`
  width: auto;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const FollowButton = styled.div<{type:string}>`
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  background-color: ${props => props.type === "follow" ? "black" : "#ffffff"};
  border: ${props => props.type === "follow" ? "none" : "1px solid #bdbdbd"};
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.type === "follow" ? "#ffffff" : "#000000"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${props => props.type !== "follow" && "red" };
    border-color: ${props => props.type !== "follow" && "red" };
    background-color: ${props => props.type !== "follow" && "#fff4f4" };
  }
`