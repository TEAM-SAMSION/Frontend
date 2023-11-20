import React from 'react'
import { styled } from 'styled-components/native'
import { ScreenWidth } from '../Shared'
import { colors } from '../../colors'
import LOGOTypo from '../../assets/Svgs/LOGOTypo.svg'
import { Platform } from 'react-native'

const SlideItem = ({ item }) => {
  return (
    //Android기기 ScreenWidth가 실제보다 살짝 작게 측정되어 나오기에, 전체적인 SlideItem의 너비를 늘려서?
    //ScreenWidth가 소수점으로 나오는 경우, SlideBase 컴퍼넌트에서의 너비로 넘어가면서 자연스레 소수점이 사라짐 ->
    //따라서 소수점이 사라지더라도 기존 요건에 충족하도록 1 더해줌.

    <SlideBase style={{ width: Platform.OS == 'android' ? ScreenWidth.toFixed(1) : ScreenWidth }}>
      <TextContainer>
        {item.title ? <TitleText>{item.title}</TitleText> : <LOGOTypo width={157} height={35} />}
        <ContentText style={{ marginTop: item.title ? 8 : 16 }}>{item.content}</ContentText>
      </TextContainer>
      <ImageContainer>
        <Image source={item.image} />
      </ImageContainer>
    </SlideBase>
  )
}

export default SlideItem

const SlideBase = styled.View`
  /* width: ${ScreenWidth + 2}px; */
  justify-content: space-between;
`
const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
`
const TitleText = styled.Text`
  color: ${colors.grey_700};
  font-size: 36px;
  font-family: Spoqa-Bold;
  line-height: 43px;
`
const ContentText = styled.Text`
  color: ${colors.grey_600};
  font-size: 14px;
  font-family: Spoqa-Medium;
  line-height: 19px;
`
const ImageContainer = styled.View`
  margin-bottom: 20px;
`
const Image = styled.Image`
  height: 395px;
  width: ${ScreenWidth + 1}px;
  object-fit: fill;
`
