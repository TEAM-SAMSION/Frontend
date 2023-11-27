import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import { useSetRecoilState } from 'recoil'
import { loggedInState } from '../../recoil/AuthAtom'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AuthBridge({ navigation }) {
  const setLoggedIn = useSetRecoilState(loggedInState)
  const checkStatus = async () => {
    AsyncStorage.getItem('accessToken').then((token) => {
      if (token) {
        console.log('AccessToken성공적으로 불러왔으므로, 홈화면으로 이동', token.substring(0, 10))
        navigation.navigate('Home')
      } else {
        console.log('현재 보유중인 토큰이 유효하지 않거나, RefreshToken값의 유효기간이 지났으므로 로그아웃 처리')
        setLoggedIn(false)
      }
    })
  }
  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <ScreenLayout>
      <ActivityIndicator />
    </ScreenLayout>
  )
}
