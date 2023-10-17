import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import axios from 'axios'

import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/AuthAtom'
import { colors } from '../../colors'
import { BodyBold_Text } from '../../components/Fonts'
import { createRandomCode } from '../../components/Todo/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default Test = () => {
  const { accessToken } = useRecoilValue(userInfoState)
  console.log('recoil에 저장된 엑서스토큰값:', accessToken)
  const createTodoTeam = async (accessToken, name = 'test') => {
    //임시로 팀 생성하기 위해 만들어본 함수호출문 -> FormData 어렵다ㅏㅏ~~
    let API = `/todo/team`

    const randomCode = createRandomCode(accessToken)
    const teamData = new FormData()
    teamData.append('teamName', 'TestTeamName')
    teamData.append('randomCode', randomCode)

    teamData.append('petRegisters[0].name', 'testPetName')
    teamData.append('petRegisters[0].age', 2)
    teamData.append('petRegisters[0].description', 'testDescription')

    const response = await axios.post(url + API, teamData, {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'multipart/form-data;charset=UTF-8; boundary=6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm',
      },
    })
    console.log(response.data)
  }
  return (
    <SafeAreaView>
      <MyButton style={{ marginTop: 32 }} onPress={() => createTodoTeam(accessToken)}>
        <BodyBold_Text color={colors.grey_400}>로그아웃</BodyBold_Text>
      </MyButton>
      <MyButton
        style={{ marginTop: 32 }}
        onPress={() => {
          AsyncStorage.clear()
        }}
      >
        <BodyBold_Text color={colors.grey_400}>캐시 지우기</BodyBold_Text>
      </MyButton>
    </SafeAreaView>
  )
}

const MyButton = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid ${colors.grey_250};
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  border-radius: 99px;
  display: inline-block;
`
