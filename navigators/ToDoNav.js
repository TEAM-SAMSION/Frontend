import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ToDo from '../screens/Todo/Todo'

const Stack = createStackNavigator()

export default function ToDoNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ToDo" component={ToDo} />
    </Stack.Navigator>
  )
}
