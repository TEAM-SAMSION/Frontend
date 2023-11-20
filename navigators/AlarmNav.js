import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Alarms } from '../screens/Todo/Alarms'

const Stack = createStackNavigator()

export default function AlarmNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Alarms" component={Alarms} />
    </Stack.Navigator>
  )
}
