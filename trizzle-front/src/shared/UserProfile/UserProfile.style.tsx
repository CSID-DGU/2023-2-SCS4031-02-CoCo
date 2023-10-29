import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  margin: 3rem 0;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`

export const RightContainer = styled.div`
  width: 60rem;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`

export const Nickname = styled.div`
  width: auto;
  height: auto;
  font-size: 2rem;
  font-weight: 600;
  color: #000;
  margin-right: 1rem;
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const CountText = styled.div`
  width: auto;
  height: auto;
  font-size: 1.1rem;
  font-weight: 300;
  color: #000;
  margin : 0 2rem 0 0.5rem;
`

export const FollowText = styled.div`
  width: auto;
  height: auto;
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
`

export const TripThemaTitle = styled.div`
  width: auto;
  height: auto;
  font-size: 1.1rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`

export const TripThemaContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: -1rem;
`

export const TripThema = styled.div`
  width: auto;
  height: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #FFECAA;
  padding: 0 1rem;
`

export const FollowButton = styled.button<{isFollow?:boolean}>`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: ${({isFollow}) => isFollow ? "#dadada" : "#EBB700"};
  color: ${({isFollow}) => isFollow ? "#989898" : "#fff"};
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top:0;
  right:0;
  &:hover {
    background-color: ${({isFollow}) => isFollow ? "#c5c5c5" : "#D4A900"};
  }
`