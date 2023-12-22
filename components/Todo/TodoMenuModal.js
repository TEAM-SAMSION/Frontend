import React, { useRef, useEffect, useState } from 'react'
import { Animated, Modal } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Plus from '../../assets/Svgs/miniPlus.svg'
import { BodySm_Text, Body_Text } from '../Fonts'

export const TodoMenuModal = ({ isVisible, onClose, todoTeamList, handleTeamChange, setCreateModalOpen }) => {
  const translateY = useRef(new Animated.Value(0)).current
  const [showModal, setShowModal] = useState(isVisible)
  useEffect(() => {
    Animated.spring(translateY, {
      toValue: showModal ? 0 : 300,
      useNativeDriver: true,
    }).start()
  }, [showModal, translateY])

  useEffect(() => {
    toggleModal()
  }, [isVisible])

  const toggleModal = () => {
    if (isVisible) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }
  const handleCreatePamilyClick = () => {
    setCreateModalOpen(true)
    setShowModal(false)
  }
  return (
    <Modal transparent visible={showModal}>
      <ModalBackground onPress={() => onClose()}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 16,
              left: 0,
              right: 0,
              borderRadius: 8,
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 16,
              backgroundColor: colors.grey_100,
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          {todoTeamList?.map((todoTeam, id) => (
            <DropdownBox
              style={{
                borderColor: colors.grey_150,
                borderBottomWidth: 1,
              }}
              key={id}
              onPress={() => handleTeamChange(todoTeam)}
            >
              <Body_Text color={colors.grey_600}>{todoTeam.name}</Body_Text>
            </DropdownBox>
          ))}
          <DropdownBox onPress={() => handleCreatePamilyClick()}>
            <Plus color={colors.grey_450} width={24} height={24} />
          </DropdownBox>
        </Animated.View>
      </ModalBackground>
    </Modal>
  )
}

const DropdownBox = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`
