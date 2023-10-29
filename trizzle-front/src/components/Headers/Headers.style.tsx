import styled from "@emotion/styled";

export const Header = styled.header<{isHome:boolean}>`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: ${({isHome}) => isHome ? "#EBB700" : "#fff"};
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 100;
`

export const LogoImg = styled.div`
  width: auto;
  height: auto;
`
export const RightWrapper = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
`

export const HeaderIconText = styled.div`
  width: auto;
  height: 1.6rem;
  display: flex;
  align-items: center;
  margin-right: 1.75rem;
`

export const HeaderText = styled.div`
  width: auto;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0.2rem;
`

export const AlarmBadge = styled.div`
  width:1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: #FF0000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
`