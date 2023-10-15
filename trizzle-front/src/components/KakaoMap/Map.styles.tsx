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

`

export const SearchMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 1.3rem;
  border-bottom-left-radius: 1.3rem;
  border: 2px solid #FFDC61;
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
