import { NavigationContainer } from '@react-navigation/native'
import AuthNav from './navigators/AuthNav'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { View } from 'react-native'
import LoggedInNav from './navigators/LoggedInNav'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    async function prepare() {
      try {
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
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {/* <AuthNav /> */}
        <LoggedInNav />
      </View>
    </NavigationContainer>
  )
}
