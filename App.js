import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import AppBase from './AppBase'
import { LogBox } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
LogBox.ignoreAllLogs()
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
