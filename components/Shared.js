import styled from 'styled-components/native'
import { Dimensions, StatusBar, Platform, Pressable } from 'react-native'
import { colors } from '../colors'
// import { Picker } from 'react-native-wheel-pick'
// import WheelPickerExpo from 'react-native-wheel-picker-expo'

////////// safearea //////////
export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: white;
`

export const ScreenWidth = Dimensions.get('window').width
export const ScreenHeight = Dimensions.get('screen').height

export const ScreenLayout = ({ children, managed = false }) => {
  return (
    <ScreenContainer style={managed && { paddingLeft: 16, paddingRight: 16 }}>
      <StatusBar backgroundColor="#fff" />
      {children}
    </ScreenContainer>
  )
}

export const url = 'http://52.78.52.47:8080/'

//****************** Input  *******************************************************/
const TitleText = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-family: Spoqa-Bold;
`
export const Title = ({ isDark, text }) => {
  return <TitleText style={{ color: isDark ? colors.white : colors.black }}>{text}</TitleText>
}

export const _SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-family: Spoqa-Medium;
  line-height: 19px;
`
export const SubText = ({ isDark, text }) => {
  return <_SubText style={{ color: isDark ? colors.white : colors.black }}>{text}</_SubText>
}
export const Input = styled.TextInput`
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  font-family: Spoqa-Medium;
  font-size: 14px;
`

export const InputTitle = styled.Text`
  font-size: 16px;
  /* margin-left: 16px; */
  margin-bottom: 10px;
  font-family: Spoqa-Bold;
  color: ${colors.grey_600};
`

//****************** ScreenLayout  *******************************************************/

const KeyBoardAwareContainer = styled.KeyboardAvoidingView`
  /* flex-direction: column; */
  width: 100%;
  flex: 1;
`

export const ScreenKeyboardLayout = ({ children, onPress = null, verticalOffset, behavior = 'padding' }) => {
  return (
    <ScreenContainer style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <Pressable onPress={onPress} style={{ width: '100%', flex: 1 }}>
        <KeyBoardAwareContainer keyboardVerticalOffset={verticalOffset} behavior={behavior}>
          {children}
        </KeyBoardAwareContainer>
      </Pressable>
    </ScreenContainer>
  )
}

//****************** NumberInput  *******************************************************/

const NumberContainer = styled.TouchableOpacity`
  margin-top: 2px;
  justify-content: center;
  padding: 7px;
  border-radius: 4px;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`

const NumberText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-family: Pretendard-Regular;
`

export const NumberInput = ({ onPress, value, placeholder, active, isDark }) => {
  return (
    <NumberContainer
      style={[
        active && { borderColor: colors.l_main, borderWidth: 1 },
        { backgroundColor: isDark ? colors.black : colors.white },
      ]}
      onPress={onPress}
    >
      <NumberText
        style={
          value
            ? {
                color: isDark ? colors.white : colors.black,
              }
            : {
                color: colors.grey_5,
              }
        }
      >
        {value ? value : placeholder}
      </NumberText>
    </NumberContainer>
  )
}
