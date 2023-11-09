import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AdminHome from '../screens/Administrator/AdminHome'
import ManageMember from '../screens/Administrator/ManageMember'
import ManagePet from '../screens/Administrator/ManagePet'
import ManageTodo from '../screens/Administrator/ManageTodo'
import ManagePetNav from './ManagePetNav'

const Stack = createStackNavigator()

export default function AdministratorNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="ManageMember" component={ManageMember} />
      <Tabs.Screen name="ManagePetNav">{() => <ManagePetNav />}</Tabs.Screen>
      <Stack.Screen name="ManageTodo" component={ManageTodo} />
    </Stack.Navigator>
  )
}
