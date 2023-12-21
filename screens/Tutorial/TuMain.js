import { Text, View } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'
import styled from 'styled-components/native'
import { colors } from '../../colors'

export default function TuMain({ navigation }) {
  return (
    <ScreenLayout>
      <Container></Container>
      <ButtonContainer style={{ backgroundColor: colors.red_350 }} onPress={() => navigation.navigate('TuHome1')}>
        <BodyBoldSm_Text color={colors.grey_100}>튜토리얼 시작하기</BodyBoldSm_Text>
      </ButtonContainer>
      <ButtonContainer onPress={() => navigation.navigate('AuthBridge')}>
        <BodyBoldSm_Text color={colors.red_350}>건너뛰기</BodyBoldSm_Text>
      </ButtonContainer>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
`
const ButtonContainer = styled.TouchableOpacity`
  height: 44px;
  margin: 0 16px;
  padding: 12px 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`
