import styled from "@emotion/styled";

export const Container = styled.div`
  width: 22rem;
  height: 26rem;
  display: flex;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border: 2px solid #f2f2f2;
  flex-direction: column;
  padding: 0;
  justify-content: flex-start;
  align-items: flex-start;
  &:hover {
    border: 2px solid #EBB700;
  }
`

export const Thumbnail = styled.div`
  width: 100%;
  height: 17.5rem;
  border-top-right-radius: 1.3rem;
  border-top-left-radius: 1.3rem;
  position: relative;
`

export const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
  `

export const NonoThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21.8rem;
  height: 17.5rem;
  background-color: #FFF7DA;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`

export const NonoThumbnail = styled.img`
  width: 20%;
  height: 20%;
`

export const SiteBadge = styled.div`
  background-color: rgba(0, 0, 0, 0.50);
  width: auto;
  height: 2.5rem;
  padding: 0 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  border-radius: 0.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
`

export const LikeContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.2rem 0.5rem ;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.50);
`

export const LikeCount = styled.div`
  width: auto;
  height: auto;
  font-size: 0.9rem;
  font-weight: 300;
  color: #fff;
  margin-right: 0.5rem;
  margin-left: 0.2rem;
`
export const Title = styled.div<{secret?:boolean}>`
  width: ${props => props.secret ? '60%' : '90%'};
  height: auto;
  font-size: 1.5rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0 0.5rem 1rem;
  gap: 0.5rem;
`

export const Date = styled.div`
  width: 100%;
  height: auto;
  font-size: 1rem;
  font-weight: 300;
  color: #8F8F8F;
  margin: 0 0 0.5rem 1rem;
`

export const ThemaContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin: 1rem 0 1rem 1rem;
`

export const Thema = styled.div`
  width: auto;
  height: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  border-radius: 0.5rem;
  background-color: #FFECAA;
`

export const Secret = styled.div`
  width: auto;
  height: auto;
  font-size: 1rem;
  font-weight: 500;
  color: #8F8F8F;
`


