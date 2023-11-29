import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import AppBase from './AppBase'
import { LogBox, Text } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import messaging from '@react-native-firebase/messaging'
import { registerRootComponent } from 'expo'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

LogBox.ignoreAllLogs()
messaging().setBackgroundMessageHandler(async (message) => {
  console.log('BackgroundMessageHandler:', message)
})
registerRootComponent(App)
export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <AppBase />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </RecoilRoot>
  )
}
