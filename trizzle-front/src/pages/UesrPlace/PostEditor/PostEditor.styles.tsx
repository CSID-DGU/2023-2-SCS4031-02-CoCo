import styled from "@emotion/styled";

export const ImageList = styled.div`
  margin: 0 0 2rem 0;
  width: auto;
  height: auto;
  border: 1px solid #ABABAB;
  white-space: nowrap;
`

export const ImageListText = styled.div`
  margin: 1rem 0 0 1rem;
  font-size: 1.2rem;
  color: #9e9e9e;
`
export const ImageButtonList = styled.div`
  margin: 1rem 1rem 1rem 1rem;
  overflow-x: auto;
  white-space: nowrap;
`

export const ImageButton = styled.button`
  margin: 0 1rem 0 0;
  width: 5rem;
  height: 5rem; 
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  display: inline-block;
  &:hover {
    border: 2px solid #EBB700;
  }
  &:focus {
    border: 2px solid #EBB700;
  }
`

export const ImageComponent = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  display: block;
`
export const SelectImagecontainer = styled.div`
  margin: 0 1rem 0 0;
  width: 6rem;
  height: 5rem; 
  border-right: 1px solid #9e9e9e;
  display: inline-block;
`

export const SelectImageComponent = styled.img`
  width: 5rem;
  height: 5rem; 
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  border: 2px solid #EBB700;
`

export const EmptyImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5rem; 
  height: 5.5rem; 
  background-color: #FFF7DA;
  border-radius: 0.5rem;
`