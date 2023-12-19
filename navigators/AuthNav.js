import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from '../screens/OnBoarding/OnBoarding'
import { UserSetting } from '../screens/OnBoarding/UserSetting'
import Auth from '../screens/OnBoarding/Auth'
import TutorialNav from './TutorialNav'

const Stack = createStackNavigator()

export default function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="UserSetting" component={UserSetting} />
      <Stack.Screen name="TutorialNav">{() => <TutorialNav />}</Stack.Screen>
    </Stack.Navigator>
  )
}
