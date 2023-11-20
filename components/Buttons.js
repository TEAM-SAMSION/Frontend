import styled from 'styled-components/native'
import { colors } from '../colors'
import LOGO_Symbol from '../assets/Svgs/LOGO_Symbol.svg'
import { ActivityIndicator, Platform } from 'react-native'
import { BodyBoldSm_Text } from './Fonts'

const NonLayoutButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0px 16px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Platform.OS == 'android' ? 32 : 20}px;
`
export const OnboardingButton = ({ func, lastFunc, currentIdx, data }) => {
  const isLastItem = currentIdx === data.length - 1

  return (
    <NonLayoutButton
      style={[
        !isLastItem
          ? Platform.OS == 'ios'
            ? {
                backgroundColor: colors.grey_100,
              }
            : { opacity: 0, height: 44 }
          : {
              backgroundColor: colors.primary,
            },
      ]}
      onPress={!isLastItem ? func : lastFunc}
    >
      {isLastItem && <LOGO_Symbol color={colors.grey_100} height={24} width={24} />}
      <ButtonText style={[{ color: !isLastItem ? colors.primary : colors.grey_100 }, isLastItem && { marginLeft: 8 }]}>
        {!isLastItem ? '다음' : '포잇과 함께하기'}
      </ButtonText>
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
        marginBottom: Platform.OS == 'android' ? 32 : 0,
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
  width: 100%;
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
