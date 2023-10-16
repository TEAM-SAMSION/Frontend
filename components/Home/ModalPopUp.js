import { useEffect, useRef, useState } from 'react'
import { Animated, Image, Modal } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'

export const ModalPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible)
  //   const scaleValue = useRef(new Animated.Value(0)).current
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
      //   Animated.spring(scaleValue, {
      //     toValue: 1,
      //     duration: 300,
      //     useNativeDriver: true,
      //   }).start()
    } else {
      setShowModal(false)
      //   Animated.timing(scaleValue, {
      //     toValue: 0,
      //     duration: 300,
      //     useNativeDriver: true,
      //   })
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <ModalBackground>
        <PopImage source={require('../../assets/Imgs/TopPopup.png')} />
        <ModalContainer>{children}</ModalContainer>
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
  height: 211px;
  background-color: ${colors.grey_100};
  border-radius: 20px;
  padding: 16px;
`
const PopImage = styled.Image`
  width: 112px;
  height: 118px;
`
