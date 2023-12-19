import React, { useState } from 'react'
import { View, StyleSheet, Text, StatusBar, NativeModules, Button, TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'
import { Svg, Rect, Defs, Mask, Circle } from 'react-native-svg'
import styled from 'styled-components/native'
import { ScreenHeight, ScreenWidth } from '../Shared'
import { BodyBoldSm_Text } from '../Fonts'

const TodoTutorial = ({ isVisible, close, buttonRef }) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [tutorialPage, setTutorialPage] = useState(2)

  const handleTutorialPage = () => {
    console.log(tutorialPage)
    if (tutorialPage < tutorialPage.length) {
      setTutorialPage(tutorialPage + 1)
    } else {
      close()
    }
  }
  let posArr = [
    [0, 540, 40, 20],
    [8, 48, 32, 16],
    [8, 670, 96, 30],
  ]
  let viewBox = `0 0 100  ${100 * (ScreenHeight / ScreenWidth)}`
  const { StatusBarManager } = NativeModules
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null
  console.log('statusBarHeight:', statusBarHeight)

  return (
    <Modal transparent visible={isVisible}>
      <TouchableOpacity onPress={() => handleTutorialPage()} style={styles.container}>
        <Svg style={styles.svg} height="100%" width="100%" viewBox={viewBox}>
          <Defs>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />
              <Rect
                x={(posArr[tutorialPage][0] / ScreenWidth) * 100}
                y={((statusBarHeight + posArr[tutorialPage][1]) / ScreenHeight) * 100}
                width={posArr[tutorialPage][2]}
                height={posArr[tutorialPage][3]}
              />
              {/* <Rect
                x={(8 / ScreenWidth) * 100}
                y={((statusBarHeight + 670) / ScreenHeight) * 100}
                width={96}
                height={30}
              /> */}
            </Mask>
          </Defs>
          <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.5)" mask="url(#mask)" fill-opacity="0" />
        </Svg>
      </TouchableOpacity>
      <Text style={styles.description}>강조하고자 하는 버튼에 대한 설명을 기입하세요.</Text>
    </Modal>
  )
}

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  description: {
    position: 'absolute',
    top: ScreenHeight * 0.4, // 원하는 위치로 조정
    left: ScreenWidth * 0.2, // 원하는 위치로 조정
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20, // 원하는 위치로 조정
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
})

export default TodoTutorial
