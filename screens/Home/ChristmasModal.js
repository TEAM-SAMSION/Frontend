import React, { useState } from 'react'
import { View, Text, Modal, Button, StyleSheet, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import Close from '../../assets/Svgs/Close.svg'
import Txt from '../../assets/Svgs/ChristmasText.svg'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { EventButton } from '../../components/Buttons'

export const ChristmasModal = () => {
  const [modalVisible, setModalVisible] = useState(true)

  return (
    <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
      <ScreenLayout>
        <ContentLayout>
          <ModalHeader>
            <CloseButton
              onPress={() => {
                setModalVisible(false)
              }}
            >
              <Close width={24} height={24} color={colors.grey_600} />
            </CloseButton>
          </ModalHeader>
          <ContentBase>
            <Txt color={colors.grey_600} />
          </ContentBase>
          <EventButton func={() => setModalVisible(false)} />
        </ContentLayout>
      </ScreenLayout>
    </Modal>
  )
}

const ModalHeader = styled.View`
  align-items: flex-end;
  justify-content: center;
  height: 52px;
  margin: 16px;
`
const ContentLayout = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`
const ContentBase = styled.View`
  align-items: center;
  margin-top: 24px;
  flex: 1;
`
const CloseButton = styled.TouchableOpacity``
