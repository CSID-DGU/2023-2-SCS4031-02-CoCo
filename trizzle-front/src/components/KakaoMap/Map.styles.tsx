import styled from '@emotion/styled'
import { Map } from 'react-kakao-maps-sdk'

export const SearchMapWrapper = styled.div`
  width: 75%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border: 2px solid #FFDC61;
`
export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  border: 2px solid #FFDC61;
`

export const SearchMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
`

export const BeforeSearchMap = styled(Map)`
  width:100%;
  height:100%;
  border-radius: 1rem;
`
export const PlanMapWrapper = styled.div`
  width: 90%;
  border: 2px solid #FFDC61;
  height: 34rem;
  position: relative;
`

export const PlanMap = styled(Map)`
  width: 100%;
  height: 100%;
`

export const MapInfoWindow = styled.div`
  width: 10rem;
  height: 5rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  position: absolute;
  top: -5.5rem;
  left: -4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`

export const InfoWindowTitle = styled.div`
  width: 100%;
  height: 1rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`