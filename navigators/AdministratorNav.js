import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AdminHome from '../screens/Administrator/AdminHome'
import ManageMember from '../screens/Administrator/ManageMember'
import ManageTodo from '../screens/Administrator/ManageTodo'
import ManagePetNav from './ManagePetNav'

const Stack = createStackNavigator()

export default function AdministratorNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="ManageMember" component={ManageMember} />
      <Stack.Screen name="ManagePetNav">{() => <ManagePetNav />}</Stack.Screen> */}
      <Stack.Screen name="ManageTodo" component={ManageTodo} />
    </Stack.Navigator>
  )
}
