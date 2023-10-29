import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'

export default function DeletePamily2({ navigation }) {
  return (
    <ScreenLayout color={colors.red_200}>
      <Container>
        <MessageBox>
          <MessageText>패밀리 나가기가 완료되었습니다{'\n'}그동안 함께 해주셔서 감사합니다.</MessageText>
        </MessageBox>
        <MessageIcon />
        <ImageContainer>
          <PetLeft source={require('../../assets/Imgs/Dog50.png')} />
          <PetRight source={require('../../assets/Imgs/Cat50.png')} />
        </ImageContainer>
        <DeleteButton onPress={() => navigation.navigate('HomeNav')}>
          <ButtonText>메인 홈으로 돌아가기</ButtonText>
        </DeleteButton>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.red_200};
  align-items: center;
`
const MessageBox = styled.View`
  margin-top: 184px;
  background-color: ${colors.grey_100};
  padding: 15px 18px;
  border-radius: 12px;
`
const MessageIcon = styled.View`
  width: 0;
  height: 0;
  border-style: solid;
  border-left-width: 10px;
  border-right-width: 10px;
  border-top-width: 9px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${colors.grey_100};
`
const MessageText = styled.Text``
const ImageContainer = styled.View`
  position: relative;
`
const PetLeft = styled.Image`
  position: absolute;
  left: -35%;
  width: 160px;
  height: 160px;
`
const PetRight = styled.Image`
  position: absolute;
  left: -5%;
  width: 165px;
  height: 165px;
`
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 16px;
  right: 16px;
  background-color: ${colors.grey_100};
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
const ButtonText = styled.Text`
  color: ${colors.primary};
  font-family: 'Spoqa-Bold';
  font-size: 14px;
`
