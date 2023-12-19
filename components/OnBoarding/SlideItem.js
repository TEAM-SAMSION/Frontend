import React from 'react'
import { styled } from 'styled-components/native'
import { ScreenWidth } from '../Shared'
import { colors } from '../../colors'
import LOGOTypo from '../../assets/Svgs/LOGOTypo.svg'
import { Platform } from 'react-native'
import { Body_Text } from '../Fonts'

const SlideItem = ({ item }) => {
  return (
    //Android기기 ScreenWidth가 실제보다 살짝 작게 측정되어 나오기에, 전체적인 SlideItem의 너비를 늘려서?
    //ScreenWidth가 소수점으로 나오는 경우, SlideBase 컴퍼넌트에서의 너비로 넘어가면서 자연스레 소수점이 사라짐 ->
    //따라서 소수점이 사라지더라도 기존 요건에 충족하도록 1 더해줌.

    <SlideBase style={{ width: Platform.OS == 'android' ? ScreenWidth.toFixed(1) : ScreenWidth }}>
      <TextContainer>
        <TitleText>{item.title}</TitleText>
        <Body_Text style={{ marginTop: 8 }} color={colors.grey_600}>
          {item.content}
        </Body_Text>
      </TextContainer>
      <ImageContainer>
        <Image resizeMode="contain" source={item.image} />
      </ImageContainer>
    </SlideBase>
  )
}

export default SlideItem

const SlideBase = styled.View`
  justify-content: space-between;
`
const TextContainer = styled.View`
  flex-direction: column;
  width: ${ScreenWidth - 32}px;
  align-items: flex-start;
  margin-left: 16px;
`
const TitleText = styled.Text`
  color: ${colors.grey_700};
  font-size: 36px;
  font-family: Spoqa-Bold;
  line-height: 43px;
`
const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Image = styled.Image`
  width: ${ScreenWidth}px;
  height: ${ScreenWidth * (395 / 375)}px;
`
