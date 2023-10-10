import styled from '@emotion/styled'
import { Map } from 'react-kakao-maps-sdk'

export const MapWrapper = styled.div`
  width: 78rem;
  height: 43rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MapContainer = styled(Map)`
  width: 100%;
  height: 100%;
`

export const MapListContainer = styled.div`
  width: 100%;
  height: 11.25rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  &hover {
    background-color: #f0f0f0;
  }
`

export const MapInfoContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const MapListWrapper = styled.div`
  width: 30%;
  height: 100%;
`