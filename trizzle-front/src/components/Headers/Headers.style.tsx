import styled from "@emotion/styled";

export const Header = styled.header<{isHome:boolean}>`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rem;
  background-color: ${({isHome}) => isHome ? "#EBB700" : "#fff"};
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 500;
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
  position: relative;
`

export const HeaderText = styled.div`
  width: auto;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0.2rem;
  cursor: pointer;
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
export const NotificationContainer = styled.div`
  width: 30rem;
  height: auto;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: #ffffff;
  position: absolute;
  z-index:5;
  top: 2.8rem;
  right: -7rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`

export const NotificationItem = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  padding: 1rem 1rem;
  gap: 1rem;
  border-bottom: 1px solid #E0E0E0;
`

export const Verticalcontainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: first-start;
  align-items: first-start;
  gap: 0.5rem;
`

export const NotificationText = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #F5F5F5;
    border-radius: 0.5rem;
    font-style: underline;
  }
`

export const NotificationDate = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 0.7rem;
  font-weight: 400;
  color: #9E9E9E;
`
