import styled from "@emotion/styled";

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 5rem 0 2rem 0;
`

export const ListTitle = styled.div`
  width: auto;
  height: auto;
  font-size: 1.6rem;
  font-weight: 500;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
`

export const PlusButton = styled.button`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  color: #b6b6b6;
  &:hover {
    color: #868686;
  }
`

export const PlanListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 2.75rem;
`

export const PlaceListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 5rem;
`

export const Empty = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 400;
  color: #868686;
`

export const PostButton = styled.button`
  width: 5rem;
  height: 2.5rem;
  border-radius: 1rem;
  background-color: #FCC400;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  .icon{
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
  }
`


export const PostContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: 2rem 0 5rem 0;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 2.75rem;
`

export const ReviewContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: 2rem 0 5rem 0;
  gap: 2rem;
  flex-direction: column;
`