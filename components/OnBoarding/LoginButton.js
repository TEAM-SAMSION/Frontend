import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { BodyBoldSm_Text } from '../Fonts'

export default LoginButton = ({ loginFunc, id }) => {
  const [isLoading, setIsLoading] = useState(false)
  let provider = ['Google', 'Kakao', 'Naver']
  let color = ['#ffffff', '#FAE300', '#03C75A']
  let fontColor = ['#4D4D4D', '#252200', '#ffffff']
  let logo = [
    require('../../assets/Imgs/SocialLogin/google.png'),
    require('../../assets/Imgs//SocialLogin/kakao.png'),
    require('../../assets/Imgs//SocialLogin/naver.png'),
  ]
  return (
    <Button
      style={[id == 0 && { borderColor: '#4d4d4d', borderWidth: 1 }, { backgroundColor: color[id] }]}
      onPress={() => {
        loginFunc()
        // setIsLoading(true)
      }}
    >
      <LOGOIcon source={logo[id]} />
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <BodyBoldSm_Text style={{ color: fontColor[id], flex: 1, textAlign: 'center' }}>
          {provider[id]}로 시작하기
        </BodyBoldSm_Text>
      )}
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  margin-bottom: 12px;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const LOGOIcon = styled.Image`
  width: 24px;
  height: 24px;
`
