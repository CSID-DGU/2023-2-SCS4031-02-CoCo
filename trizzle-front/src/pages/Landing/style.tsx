import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const FirstContainer = styled.div`
  width: 100%;
  height: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

export const Image = styled.div`
  width: 65rem;
  height:57.5rem;
`

export const TagContainer = styled.div`
  width: 60rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TagButton = styled.button`
  width: 10rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 1rem;
  background-color: #eaeaea;
  font-size: 1rem;
  font-weight: 400;
  &:hover {
    background-color: white;
    border: 1px solid #929292;
  }
`

export const MoreButton = styled.button`
  width: 6rem;
  height: 2.3rem;
  position: absolute;
  bottom: 13rem;
  left: 18.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 1rem;
  background-color: #FEE16B;
  font-size: 1rem;
  font-weight: 400;
  &:hover {
    background-color: white;
    border: 1px solid #FEE16B;
  }
`

export const SecondContainer = styled.div`
  width: 100%;
  height: 31rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #FEE16B;
`

export const SecondTitle = styled.div`
  width: 100%;
  height: auto;
  font-family: lulo-clean-w01-one-bold,lulo-clean-w05-one-bold,sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: #403f2b;
  text-align: center;
`

export const DescribesContainer = styled.div`
  width: 60rem;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`

export const DescribeContainer = styled.div`
  width: 14rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  .section {
    width: auto;
    height: auto;
    color: #403f2b;
    font-size: 1rem;
    font-weight: 500;
  }
  .des {
    width: auto;
    height: auto;
    color: #403f2b;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 1rem;
  }
`

export const ThirdContainerCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const Icon = styled.img`
  width: 3.8rem;
  height: 3.8rem;
  object-fit: cover;
`

export const LastContainer = styled.div`
  width: 100%;
  height: 48rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F6FEFF;
  position: relative;
  .title {
    width: auto;
    height: auto;
    font-size: 3rem;
    font-weight: 700;
    color: #403f2b;
    text-align: center;
  }
`

export const LastContainerCover = styled.div`
  width: 63rem;
  height: 35rem;
`

export const ImageContainer = styled.img`
  position: absolute;
  width: 8.125rem;
  height: 8.125rem;
  top: 0rem;
  left: 30rem;
`