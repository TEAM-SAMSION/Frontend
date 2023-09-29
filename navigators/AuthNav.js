import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Auth from '../screens/OnBoarding/Auth'
import OnBoarding from '../screens/OnBoarding/OnBoarding'

const Stack = createStackNavigator()

export default function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OnBoarding" component={OnBoarding} /> */}
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  )
}
