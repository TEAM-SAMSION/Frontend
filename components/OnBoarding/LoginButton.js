import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

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
        setIsLoading(true)
      }}
    >
      <LOGOIcon source={logo[id]} />
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <ButtonText style={{ color: fontColor[id] }}>{provider[id]}로 시작하기</ButtonText>
      )}
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  margin-bottom: 16px;
  width: 100%;
  height: 44px;
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
const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  line-height: 25px;
  font-size: 14px;
  font-family: Spoqa-Medium;
`
