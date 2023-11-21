import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useEffect, useState } from 'react'
import { Modal, Text, View } from 'react-native'
import { BodySm_Text } from '../Fonts'

export const MemberPopUp = ({ visible, setVisible, setChangeVisible, setDeleteVisible }) => {
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
      <ModalBackground
        onPress={() => {
          setVisible(false)
        }}
      >
        <ModalContainer
          onPress={() => {
            setVisible(false)
            setChangeVisible(true)
          }}
        >
          <BodySm_Text color={colors.secondary}>권한변경</BodySm_Text>
        </ModalContainer>
        <ModalContainer
          onPress={() => {
            setVisible(false)
            setDeleteVisible(true)
          }}
        >
          <BodySm_Text color={colors.primary}>내보내기</BodySm_Text>
        </ModalContainer>
      </ModalBackground>
    </Modal>
  )
}

const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.38);
  padding-bottom: 34px;
  gap: 8px;
  justify-content: flex-end;
`
const ModalContainer = styled.TouchableOpacity`
  background-color: ${colors.grey_100};
  margin: 0px 16px;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
