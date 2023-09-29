import React from 'react'
import { styled } from 'styled-components/native'
import { ScreenWidth } from '../Shared'
import { colors } from '../../colors'
import LOGOTypo from '../../assets/Svgs/LOGOTypo.svg'

const SlideItem = ({ item }) => {
  return (
    <SlideBase>
      <TextContainer>
        {item.title ? <TitleText>{item.title}</TitleText> : <LOGOTypo width={157} height={35} />}
        <ContentText style={item.title && { marginTop: 8 }}>{item.content}</ContentText>
      </TextContainer>
      <ImageContainer>
        <Image source={item.image} />
      </ImageContainer>
    </SlideBase>
  )
}

export default SlideItem

const SlideBase = styled.View`
  width: ${ScreenWidth}px;
  justify-content: space-between;
`
const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
`
const TitleText = styled.Text`
  color: ${colors.grey_600};
  font-size: 36px;
  font-family: Spoqa-Bold;
  line-height: 43px;
`
const ContentText = styled.Text`
  margin-top: 16px;
  color: ${colors.grey_450};
  font-size: 14px;
  font-family: Spoqa-Medium;
  line-height: 19px;
`
const ImageContainer = styled.View`
  margin-bottom: 64px;
`
const Image = styled.Image`
  height: 325;
  width: ${ScreenWidth}px;
  object-fit: fill;
`
