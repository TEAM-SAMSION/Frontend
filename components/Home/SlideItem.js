import React from 'react'
import { styled } from 'styled-components/native'
import { ScreenWidth } from '../Shared'
import { colors } from '../../colors'
import { Platform } from 'react-native'

const SlideItem = ({ item }) => {
  return (
    //Android기기 ScreenWidth가 실제보다 살짝 작게 측정되어 나오기에, 전체적인 SlideItem의 너비를 늘려서?
    //ScreenWidth가 소수점으로 나오는 경우, SlideBase 컴퍼넌트에서의 너비로 넘어가면서 자연스레 소수점이 사라짐 ->
    //따라서 소수점이 사라지더라도 기존 요건에 충족하도록 1 더해줌.

    <SlideBase style={{ width: Platform.OS == 'android' ? ScreenWidth.toFixed(1) : ScreenWidth }}>
      <ImageContainer>
        <SampleImage source={item.image} />
      </ImageContainer>
    </SlideBase>
  )
}

export default SlideItem

const SlideBase = styled.View`
  /* width: ${ScreenWidth + 2}px; */
  justify-content: space-between;
`
const ImageContainer = styled.View`
  width: 59px;
  height: 59px;
  align-items: center;
  margin-bottom: 8px;
`
const SampleImage = styled.Image`
  width: 59px;
  height: 59px;
  border-radius: 16px;
`
