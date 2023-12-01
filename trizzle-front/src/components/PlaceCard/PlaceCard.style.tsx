import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 13rem;
  display: flex;
  align-items: center;
  justify-content : space-between;
  padding: 0 2rem;
  border-radius: 1.5rem;
  border: 2px solid #BEBEBE;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    border: 2px solid #EBB700;
  }
`

export const Thumbnail = styled.img`
  width: 11rem;
  height: 11rem;
  border: 1px solid #f2f2f2;
`

export const NonoThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11rem;
  height: 11rem;
  background-color: #FFF7DA;
`

export const NonoThumbnail = styled.img`
  width: 20%;
  height: 20%;
`

export const LeftContainer = styled.div`
  width: 57rem;
  height: 11rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content:center;
  align-items: flex-start;
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const Site = styled.div`
  width: auto;
  height: auto;
  font-size: 1rem;
  font-weight: 400;
  color: #8F8F8F;
`

export const Title = styled.div`
  width: auto;
  height: auto;
  font-size: 1.5rem;
  font-weight: 400;
  color: #525252;
  display: flex;
  align-items: flex-end;
`

export const Content = styled.div`
  width: auto;
  height: auto;
  max-height:3rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: 400;
  color: #747474;
  white-space: pre-line;
`

export const Secret = styled.div`
  width: auto;
  height: auto;
  font-size: 1rem;
  font-weight: 500;
  color: #8F8F8F;
  margin-right: 0.5rem;
`