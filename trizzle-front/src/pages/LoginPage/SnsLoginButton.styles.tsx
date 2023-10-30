import styled from "@emotion/styled";

export const GoogleButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 1rem;
  gap: 2rem;
  width: 23rem;
  height: 4rem;
  background-color: #FFFFFF;
  border: 1px solid #BDBDBD;
  border-radius: 1rem;
  &:hover {
    font-weight: 700;
    border: 2px solid #E62F19;
  }
`

export const KakaoButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 1rem;
  gap: 2rem;
  width: 23rem;
  height: 4rem;
  background-color: #FEE500;
  border: 1px solid #BDBDBD;
  border-radius: 12px;
  &:hover {
    font-weight: 700;
    border: 2px solid #ECB318;
    border-radius: 12px;  
  }
`

export const logoImage = styled.img`
  width: 2.5rem;
  height: 2.5rem; 
`

export const text = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`