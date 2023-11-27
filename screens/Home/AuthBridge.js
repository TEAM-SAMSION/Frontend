import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useSetRecoilState } from 'recoil'
import { loggedInState } from '../../recoil/AuthAtom'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import styled from 'styled-components/native'
import { TabBarAtom } from '../../recoil/TabAtom'

export default function AuthBridge({ navigation }) {
  const setIsTabVisible = useSetRecoilState(TabBarAtom)
  const setLoggedIn = useSetRecoilState(loggedInState)
  const checkStatus = async () => {
    const AT = await AsyncStorage.getItem('accessToken')
    console.log('Hello?')
    if (AT) {
      console.log('AccessToken성공적으로 불러왔으므로, 홈화면으로 이동', AT.substring(0, 10))
      navigation.navigate('Home')
    } else {
      console.log('현재 보유중인 토큰이 유효하지 않거나, RefreshToken값의 유효기간이 지났으므로 로그아웃 처리')
      setLoggedIn(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      setIsTabVisible(false)
      checkStatus()
    }, []),
  )

  return (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  )
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`
