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
import { loggedInState, onboardedState, userInfoState } from './recoil/AuthAtom'
import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { postDeviceToken } from './components/OnBoarding/Apis'

export const checkFCMToken = async (accessToken) => {
  const fcmToken = await messaging().getToken()
  if (fcmToken) {
    postDeviceToken(accessToken, fcmToken)
  }
}
export default function AppBase() {
  const [appIsReady, setAppIsReady] = useState(false)

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log('Authorization status:', authStatus)
    }
  }
  const { loggedIn } = useRecoilValue(userInfoState)
  const foregroundListener = useCallback(() => {
    messaging().onMessage(async (message) => {
      console.log('foregroundListener:', message)
    })
  }, [])
  const setLoggedIn = useSetRecoilState(loggedInState)
  const setOnboarded = useSetRecoilState(onboardedState)

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1
    if (isClicked) {
      console.log('Alarm Clicked')
    }
    const result = PushNotificationIOS.FetchResult.NoData
    notification.finish(result)
  }

  useEffect(() => {
    async function prepare() {
      try {
        await AsyncStorage.getItem('accessToken').then((accessToken) => {
          if (accessToken != null) {
            //RecoilState로 로그인여부 저장
            setLoggedIn(true)
            checkFCMToken(accessToken)
          }
        })
        // setLoggedIn(true)
        // await AsyncStorage.setItem(
        //   'accessToken',
        //   'Bearer eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiUkVGUkVTSF9UT0tFTiIsImVtYWlsIjoic3Jmc3JmMDEwM0BnbWFpbC5jb20iLCJpc3MiOiJwYXdpdGgiLCJpYXQiOjE3MDA5OTQ5NjAsImV4cCI6MTcwMTU5OTc2MH0.URymhwJUEoB-e8F50Yoky9Z4GPnvTy3iiBsKnPY_qmLiEE6SF_Xs--M1mXQDXrJ6',
        // )
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
    foregroundListener()
    prepare()
    requestUserPermission()
    const type = 'notification'
    PushNotificationIOS.addEventListener(type, onRemoteNotification)
    return () => {
      PushNotificationIOS.removeEventListener(type)
    }
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
