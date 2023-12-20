import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import AppBase from './AppBase'
import { LogBox, Text } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import messaging from '@react-native-firebase/messaging'
import { registerRootComponent } from 'expo'
import Toast from 'react-native-toast-message'
import Delete from './assets/Svgs/delete.svg'
import Error from './assets/Svgs/errorCircle.svg'
import { colors } from './colors'
import styled from 'styled-components/native'
import { Body_Text } from './components/Fonts'

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
      <Toast config={toastConfig} />
    </RecoilRoot>
  )
}

const ToastBG = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.red_350};
  height: 48px;
  gap: 8px;
  border-radius: 24px;
  padding: 0px 20px;
`
const toastConfig = {
  customToast: ({ text1, props }) => (
    <ToastBG>
      {props.mode == 'delete' ? (
        <Delete width={24} height={24} color={colors.grey_100} />
      ) : (
        <Error width={24} height={24} color={colors.grey_100} />
      )}
      <Body_Text color={colors.grey_100}>{text1}</Body_Text>
    </ToastBG>
  ),
}
