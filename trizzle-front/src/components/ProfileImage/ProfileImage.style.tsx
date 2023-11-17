import styled from "@emotion/styled";

export const SmallContainer = styled.div<{margin?:string}>`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  margin: ${({margin}) => margin? margin : "0"};
`

export const BigContainer = styled.div<{margin?:string}>`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  margin: ${({margin}) => margin? margin : "0"};
  position: relative;
`

export const MidContainer = styled.div<{margin?:string}>`
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  margin: ${({margin}) => margin? margin : "0"};
  position: relative;
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

export const CameraContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`

export const MidCameraContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`

export const InputContainer = styled.div`
width: 7rem;
height: 3rem;

`

export const ProfileChangeInput = styled.input`
  /* width:2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: #dadada; */
  /* position: absolute;
  bottom: 0.5rem;
  right: 0.5rem; */
  display: none;
`