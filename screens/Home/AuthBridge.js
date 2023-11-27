import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useRecoilValue } from 'recoil'
import { platformState } from '../../recoil/AuthAtom'
import ErrorIcon from '../../assets/Svgs/error.svg'
import { BodyBold_Text, BodySm_Text } from '../../components/Fonts'
import { getUserDeleteValidation } from '../../components/MyPage/Apis'
import MyPageNav from '../../navigators/MyPageNav'
import { completeTodo } from '../../components/Home/Apis'
import { getTodoTeamList } from '../../components/Todo/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AuthBridge() {
  // const setLoggedIn = useSetRecoilState(loggedInState)
  const [isValid, setIsValid] = useState(false)
  const checkStatus = async () => {
    const AccessToken = await AsyncStorage.getItem('accessToken')
    if (AccessToken) {
      console.log('')

      return
    } else {
      console.log('현재 보유중인 토큰이 유효하지 않거나, RefreshToken값의 유효기간이 지났으므로 로그아웃 처리')
      setLoggedIn(false)
    }
  }
  useEffect(() => {
    // checkStatus()
    // getTodoTeamList()
  }, [])

  return <ScreenLayout>{!isValid && <ActivityIndicator />}</ScreenLayout>
}
