import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TuHome1 from '../screens/Tutorial/TuHome1'
import TuHome2 from '../screens/Tutorial/TuHome2'

const Stack = createStackNavigator()

export default function TutorialNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TuHome1" component={TuHome1} />
      <Stack.Screen name="TuHome2" component={TuHome2} />
    </Stack.Navigator>
  )
}
