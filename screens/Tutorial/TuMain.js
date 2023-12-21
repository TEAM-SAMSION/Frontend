import { StatusBar, Text, View } from 'react-native'
import { ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'
import { BodyBoldSm_Text, BodySm_Text, HeadLineLg_Text, SubHeadSm_Text } from '../../components/Fonts'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Question from '../../assets/Svgs/Question_mark.svg'
import Back from '../../assets/Svgs/ChristmasBack.svg'

export default function TuMain({ navigation }) {
  return (
    <ScreenLayout backgroundColor="transparent">
      <BackImgContainer>
        <Back width={ScreenWidth} height={ScreenHeight} />
      </BackImgContainer>
      <Container>
        <SubHeadSm_Text color={colors.red_300}>튜토리얼</SubHeadSm_Text>
        <HeadLineLg_Text color={colors.grey_700}>포잇 사용이 처음이신가요?</HeadLineLg_Text>
        <ImageContainer>
          <Circle>
            <ImageBox>
              <WhiteCircle>
                <Question width={79} height={79} color={colors.primary_outline} />
              </WhiteCircle>
              <Img source={require('../../assets/Imgs/TuMain.png')} style={{ height: 196 }} />
            </ImageBox>
          </Circle>
        </ImageContainer>
      </Container>
      <ButtonContainer style={{ backgroundColor: colors.red_350 }} onPress={() => navigation.navigate('TuHome1')}>
        <BodyBoldSm_Text color={colors.grey_100}>튜토리얼 시작하기</BodyBoldSm_Text>
      </ButtonContainer>
      <ButtonContainer onPress={() => navigation.navigate('AuthBridge')}>
        <BodySm_Text color={colors.red_350}>건너뛰기</BodySm_Text>
      </ButtonContainer>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
  margin: 46px 16px 0 16px;
`
const BackImgContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
const ButtonContainer = styled.TouchableOpacity`
  height: 44px;
  margin: 0 16px;
  padding: 12px 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`
const ImageBox = styled.View`
  width: 321px;
  height: 321px;
  border-radius: 321px;
  background-color: ${colors.red_250};
`
const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`
const WhiteCircle = styled.View`
  width: 79px;
  height: 79px;
  border-radius: 79px;
  background-color: ${colors.grey_100};
`
const Img = styled.Image`
  position: absolute;
  top: 80;
  width: 100%;
  overflow: visible;
`
const Circle = styled.View`
  margin-top: 92px;
  width: 321px;
  height: 321px;
  border-bottom-left-radius: 321px;
  border-bottom-right-radius: 321px;
  overflow: hidden;
`
