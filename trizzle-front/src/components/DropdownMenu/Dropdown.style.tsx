import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  width: 10rem;
  height: 2.5rem;
  position: relative;
`

export const DropdownButton = styled.button`
  width: 10rem;
  height: 2.5rem;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  background-color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`

export const DropdownMenuContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  background-color: #ffffff;
  position: absolute;
  top: 2.6rem;
  z-index: 50;
`

export const DropdownMenuItem = styled.div`
  width: auto;
  min-width: 10rem;
  height: 1.2rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  border-radius: 0.5rem;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`

export const BadgeDropdownContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`
export const BadgeDropdownInput = styled.div<{ selectedItem: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  height: 2.5rem;
  border: ${props => props.selectedItem ? "none" : "1px solid #9e9e9e"};
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: ${props => props.selectedItem ? "flex-start" : "space-between"};
  padding: 0 0.5rem;
  
`
export const BadgeDropdownMenuContainer = styled.div<{type?:string}>`
  width:${props => props.type === "search" ? "200%" : "100%"};
  max-width: 65rem;
  height: auto;
  padding: 1rem 0.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  background-color: #ffffff;
  position: absolute;
  top: 2.6rem;
  left: 0;
  z-index: 50;
`

export const BadgeDropdownMenuItem = styled.div<{ selected: boolean }>`
  width: auto;
  height: 1.2rem;
  font-size: 0.8rem;
  font-weight: 400;
  border: ${props => props.selected ? "none" : "1px solid #cbcbcb"};
  color: ${props => props.selected ? "#000" : "#9e9e9e"};
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${props => props.selected ? "#FFECAA" : "transparent"};
  &:hover {
    background-color: #f5f5f5;
  }
`

export const Badge = styled.div`
  width: auto;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: #FFECAA;
  display: flex;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`
