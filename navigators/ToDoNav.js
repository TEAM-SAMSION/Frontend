import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Todo from '../screens/Todo/Todo'
import ManageTodo from '../screens/Administrator/ManageTodo'
import AlarmNav from './AlarmNav'

const Stack = createStackNavigator()

export default function ToDoNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Todo" component={Todo} />
      <Stack.Screen name="AlarmNav">{() => <AlarmNav />}</Stack.Screen>
      <Stack.Screen name="ManageTodo" component={ManageTodo} />
    </Stack.Navigator>
  )
}
