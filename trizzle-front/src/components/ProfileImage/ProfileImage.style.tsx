import styled from "@emotion/styled";

export const SmallContainer = styled.div<{margin?:string}>`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  margin: ${({margin}) => margin? margin : "0"};
`

export const BigContainer = styled.div<{margin?:string}>`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  margin: ${({margin}) => margin? margin : "0"};
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

export const CameraContainer = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: #FFDC61;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
`