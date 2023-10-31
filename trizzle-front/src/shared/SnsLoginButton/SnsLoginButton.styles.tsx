import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const GoogleButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 23rem;
  height: 3.5rem;
  background-color: #FFFFFF;
  border: 1px solid #BDBDBD;
  border-radius: 12px;
  &:hover {
    border: 2px solid #E62F19;
  }
`

export const KakaoButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 23rem;
  height: 3.5rem;
  background-color: #FEE500;
  border: 1px solid #BDBDBD;
  border-radius: 12px;
  &:hover {
    font-weight: 700;
    border: 2px solid #ECB318;
    border-radius: 12px;  
  }
`

export const GoogleLogoImage = styled.img`
  margin: 0 0 0 1rem;
  width: 1.5rem;
  height: 1.5rem; 
`

export const KakaoLogoImage = styled.img`
margin: 0 0 0 1rem;
width: 1.5rem;
height: 1.5rem; 
`

export const GoogleText = styled.div<{ isHover: boolean }>`
  padding: 0 1rem 0 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  ${(props) =>
    props.isHover &&
    css`
      font-weight: 700;
    `}
`;

export const KakaoText = styled.div<{ isHover: boolean }>`
  padding: 0 1rem 0 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  ${(props) =>
    props.isHover &&
    css`
      font-weight: 700;
    `}
`