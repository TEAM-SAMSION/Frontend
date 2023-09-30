import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Auth from '../screens/OnBoarding/Auth'
import OnBoarding from '../screens/OnBoarding/OnBoarding'
import { useRecoilValue } from 'recoil'
import { onboardedState } from '../recoil/AuthAtom'

const Stack = createStackNavigator()

export default function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Auth" component={Auth} /> */}
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
    </Stack.Navigator>
  )
}
