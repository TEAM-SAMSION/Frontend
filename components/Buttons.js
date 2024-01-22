import styled from 'styled-components/native'
import { colors } from '../colors'
import LOGO_Symbol from '../assets/Svgs/Logo_bottom.svg'
import { ActivityIndicator, Platform } from 'react-native'
import { BodyBoldSm_Text } from './Fonts'

const NonLayoutButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0px 16px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Platform.OS == 'android' ? 32 : 8}px;
`
export const OnboardingButton = ({ func, lastFunc, lastReached }) => {
  return (
    <NonLayoutButton
      style={[
        !lastReached
          ? {
              backgroundColor: colors.grey_100,
            }
          : {
              backgroundColor: colors.primary,
            },
      ]}
      onPress={lastReached ? lastFunc : func}
    >
      {lastReached && <LOGO_Symbol color={colors.grey_100} height={24} width={24} />}
      <BodyBoldSm_Text color={lastReached ? colors.grey_100 : colors.primary} style={lastReached && { marginLeft: 8 }}>
        {!lastReached ? '다음' : '포잇과 함께하기'}
      </BodyBoldSm_Text>
    </NonLayoutButton>
  )
}
export const EventButton = ({ func }) => {
  return (
    <NonLayoutButton
      style={{
        backgroundColor: colors.primary,
      }}
      onPress={func}
    >
      <LOGO_Symbol color={colors.grey_100} height={24} width={24} />
      <BodyBoldSm_Text color={colors.grey_100} style={{ marginLeft: 8 }}>
        크리스마스도 포잇과 함께하기
      </BodyBoldSm_Text>
    </NonLayoutButton>
  )
}
export const NotificationButton = ({ func }) => {
  return (
    <MyButton
      style={{
        backgroundColor: colors.grey_100,
      }}
      onPress={func}
    >
      <BodyBoldSm_Text style={{ color: colors.grey_700 }}>주간 리포트 확인하기</BodyBoldSm_Text>
    </MyButton>
  )
}
export const Button_PinkBg = ({ isEnabled, func, text, isLoading }) => {
  return (
    <MyButton
      disabled={!isEnabled}
      style={{
        backgroundColor: isEnabled ? colors.primary_container : colors.grey_150,
        marginBottom: 32,
      }}
      onPress={func}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ButtonText style={{ color: isEnabled ? colors.primary : colors.grey_500 }}>{text}</ButtonText>
      )}
    </MyButton>
  )
}
const MyButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  font-size: 14px;
  font-family: Spoqa-Bold;
  line-height: 19px;
`
