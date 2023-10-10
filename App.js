import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import AppBase from './AppBase'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()
export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppBase />
      </NavigationContainer>
    </RecoilRoot>
  )
}
