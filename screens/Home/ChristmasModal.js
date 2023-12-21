import React, { useState } from 'react'
import { View, Text, Modal, Button, StyleSheet, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import Close from '../../assets/Svgs/Close.svg'
import Txt from '../../assets/Svgs/ChristmasText.svg'
import Back from '../../assets/Svgs/ChristmasBack.svg'
import { colors } from '../../colors'
import { ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'
import { EventButton } from '../../components/Buttons'
import { eventViewedState } from '../../recoil/AuthAtom'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ChristmasModal = () => {
  const [eventViewed, setEventViewed] = useRecoilState(eventViewedState)

  const handleClose = () => {
    setEventViewed(true)
    AsyncStorage.setItem('eventViewed', 'true')
  }

  return (
    <Modal visible={!eventViewed} animationType="slide" onRequestClose={() => handleClose()}>
      <ScreenLayout>
        <BackImgContainer>
          <Back width={ScreenWidth} height={ScreenHeight} />
        </BackImgContainer>
        <ContentLayout>
          <ModalHeader>
            <CloseButton
              onPress={() => {
                handleClose()
              }}
            >
              <Close width={24} height={24} color={colors.grey_600} />
            </CloseButton>
          </ModalHeader>
          <ContentBase>
            <Txt wid color={colors.grey_600} />
            <BackGif resizeMode="contain" source={require('../../assets/Gifs/Christmas.gif')} />
          </ContentBase>
          <EventButton func={() => handleClose()} />
        </ContentLayout>
      </ScreenLayout>
    </Modal>
  )
}

const ModalHeader = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin: 16px;
`
const BackImgContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
const BackGif = styled.Image`
  flex: 1;
  margin-top: 64px;
  align-items: start;
  flex-direction: column;
  justify-self: flex-start;
`
const ContentLayout = styled.View`
  flex: 1;
  justify-content: space-between;
`
const ContentBase = styled.View`
  align-items: center;
  flex: 1;
`
const CloseButton = styled.TouchableOpacity``
