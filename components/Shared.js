import styled from 'styled-components/native'
import { Dimensions, StatusBar, Platform, Pressable, PixelRatio } from 'react-native'
import { colors } from '../colors'
import { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-native'
// import { Picker } from 'react-native-wheel-pick'
// import WheelPickerExpo from 'react-native-wheel-picker-expo'

export const ScreenWidth = Dimensions.get('window').width
export const ScreenHeight = Dimensions.get('screen').height

const scale = ScreenWidth / 375
export const normalize = (size) => {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

////////// safearea //////////
export const ScreenContainer = styled.SafeAreaView`
  background-color: ${colors.grey_100};
  flex: 1;
`

export const ScreenLayout = ({ children, backgroundColor = colors.grey_100 }) => {
  return (
    <ScreenContainer style={{ backgroundColor }}>
      <StatusBar />
      {children}
    </ScreenContainer>
  )
}

export const url = 'https://api.pawith.com'

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

export const ScreenKeyboardLayout = ({
  children,
  onPress = null,
  verticalOffset,
  behavior = 'padding',
  disabled = false,
}) => {
  return (
    <ScreenContainer style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <Pressable disabled={disabled} onPress={() => onPress} style={{ width: '100%', flex: 1 }}>
        <KeyBoardAwareContainer keyboardVerticalOffset={verticalOffset} behavior={behavior}>
          {children}
        </KeyBoardAwareContainer>
      </Pressable>
    </ScreenContainer>
  )
}

//****************** HeaderWithBack  *******************************************************/

import Back from '../assets/Svgs/chevron_back'
import { BodyBold_Text, BodySm_Text, Detail_Text, SubHead_Text } from './Fonts'

export const HeaderWithBack = ({ title, navigation }) => {
  return (
    <HeaderContainer>
      <Button style={{ left: 16 }} onPress={() => navigation.goBack()}>
        <Back width={24} height={24} />
      </Button>
      <BodyBold_Text>{title}</BodyBold_Text>
    </HeaderContainer>
  )
}
const Button = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
`
const HeaderContainer = styled.View`
  width: 100%;
  height: 52px;
  align-items: center;
  justify-content: center;
`
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

// ************ Modal PopUp *************

export const ModalPopUp = ({ petIcon, visible, height, children }) => {
  const [showModal, setShowModal] = useState(visible)
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <ModalBackground>
        {petIcon ? <PopImage source={require('../assets/Imgs/TopPopup.png')} /> : ''}
        <ModalContainer style={{ height: `${height}px` }}>{children}</ModalContainer>
      </ModalBackground>
    </Modal>
  )
}

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`
const ModalContainer = styled.View`
  width: 343px;
  background-color: ${colors.grey_100};
  border-radius: 20px;
  padding: 16px;
`
const PopImage = styled.Image`
  width: 112px;
  overflow: visible;
`

import Close from '../assets/Svgs/Close.svg'

export const PetModalPopUp = ({ petIcon, visible, height, setIsVisible, setIsOpen = null, navigation }) => {
  const [showModal, setShowModal] = useState(visible)
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }

  return (
    <Modal transparent visible={showModal}>
      <ModalBackground>
        {petIcon ? (
          <PopImage
            style={Platform.OS == 'android' ? { height: 200, top: 80 } : { height: 118, top: 48 }}
            source={require('../assets/Imgs/TopPopup.png')}
          />
        ) : (
          ''
        )}
        <ModalContainer style={{ height: `${height}px`, marginBottom: Platform.OS == 'android' ? 100 : '' }}>
          <ModalHeader>
            <CloseButton
              onPress={() => {
                setIsVisible(false)
                setIsOpen && setIsOpen(false)
              }}
            >
              <Close width={24} height={24} color={colors.grey_600} />
            </CloseButton>
          </ModalHeader>
          <PopContent>
            <SubHead_Text color={colors.grey_700}>Pamily와 함께하시겠습니까?</SubHead_Text>
            <Detail_Text color={colors.grey_500}>Pamily는 나의 펫을 함께 키우는 모임을 말합니다</Detail_Text>
          </PopContent>
          <PopButtonContainer>
            <PopButton
              onPress={() => {
                navigation.navigate('CreateTeam')
                setIsVisible(false)
                setIsOpen && setIsOpen(false)
              }}
            >
              <BodySm_Text color={colors.red_350}>Pamily 생성하기</BodySm_Text>
            </PopButton>
            <PopButton
              onPress={() => {
                navigation.navigate('JoinTeam')
                setIsVisible(false)
                setIsOpen && setIsOpen(false)
              }}
            >
              <BodySm_Text color={colors.red_350}>Pamily 참여하기</BodySm_Text>
            </PopButton>
          </PopButtonContainer>
        </ModalContainer>
      </ModalBackground>
    </Modal>
  )
}

const PopContent = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  gap: 4px;
`
const PopButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
const PopButton = styled.TouchableOpacity`
  display: flex;
  flex: 1 0 0;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.red_200};
`
const CloseButton = styled.TouchableOpacity``
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
