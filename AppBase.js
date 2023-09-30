import { NavigationContainer } from '@react-navigation/native'
import AuthNav from './navigators/AuthNav'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { View } from 'react-native'
import LoggedInNav from './navigators/LoggedInNav'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'moment'
import 'moment/locale/ko' // language must match config
import { accessTokenState, loggedInState, onboardedState, userInfoState } from './recoil/AuthAtom'

export default function AppBase() {
  const [appIsReady, setAppIsReady] = useState(false)
  const { loggedIn, onboarded, accessToken } = useRecoilValue(userInfoState)

  const setLoggedIn = useSetRecoilState(loggedInState)
  const setToken = useSetRecoilState(accessTokenState)
  const setOnboarded = useSetRecoilState(onboardedState)

  useEffect(() => {
    async function prepare() {
      try {
        await AsyncStorage.getItem('accessToken').then((accessToken) => {
          if (accessToken) {
            //RecoilState로 로그인여부 저장
            setLoggedIn(true)
            //RecoilState로 액서스토큰 저장
            setToken(accessToken)
            console.log('자동으로 로그인되고, Recoil변수로 액서스토큰 저장됨')
          }
        })

        await AsyncStorage.getItem('onBoardingDone').then((onBoardingDone) => {
          if (onBoardingDone) {
            console.log('온보딩 이미 완료해서 넘어감')
            setOnboarded(true)
          }
        })

        await Font.loadAsync({
          'Spoqa-Bold': require('./assets/Fonts/SpoqaHanSansNeo-Bold.otf'),
          'Spoqa-Medium': require('./assets/Fonts/SpoqaHanSansNeo-Medium.otf'),
          'Spoqa-Regular': require('./assets/Fonts/SpoqaHanSansNeo-Regular.otf'),
          'Spoqa-Light': require('./assets/Fonts/SpoqaHanSansNeo-Light.otf'),
          'Spoqa-Thin': require('./assets/Fonts/SpoqaHanSansNeo-Thin.otf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        console.log('앱 실행위해 필요한 모든 자원 및 준비 완료')
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {loggedIn ? <LoggedInNav /> : <AuthNav />}
    </View>
  )
}
