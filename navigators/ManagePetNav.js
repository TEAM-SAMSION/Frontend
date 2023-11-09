import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ManagePet from '../screens/Administrator/ManagePet'

const Stack = createStackNavigator()

export default function ManagePetNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManagePet" component={ManagePet} />
    </Stack.Navigator>
  )
}
