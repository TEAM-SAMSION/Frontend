import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Todo from '../screens/Todo/Todo'
import { Alarms } from '../screens/Todo/Alarms'

const Stack = createStackNavigator()

export default function ToDoNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Test" component={Test} /> */}
      <Stack.Screen name="Todo" component={Todo} />
      <Stack.Screen name="Alarms" component={Alarms} />
    </Stack.Navigator>
  )
}
