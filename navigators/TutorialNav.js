import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TuHome1 from '../screens/Tutorial/TuHome1'
import TuHome2 from '../screens/Tutorial/TuHome2'
import TuMyPage1 from '../screens/Tutorial/TuMyPage1'
import TuMyPage2 from '../screens/Tutorial/TuMyPage2'
import TuMyPage3 from '../screens/Tutorial/TuMyPage3'
import TuMyPage4 from '../screens/Tutorial/TuMyPage4'
import TuMypage5 from '../screens/Tutorial/TuMyPage5'
import TuAdmin1 from '../screens/Tutorial/TuAdmin1'
import TuAdmin2 from '../screens/Tutorial/TuAdmin2'
import TuAdmin3 from '../screens/Tutorial/TuAdmin3'
import TuAdmin4 from '../screens/Tutorial/TuAdmin4'
import TuTodo1 from '../screens/Tutorial/TuTodo1'
import TuTodo2 from '../screens/Tutorial/TuTodo2'
import TuTodo3 from '../screens/Tutorial/TuTodo3'
import TuTodo4 from '../screens/Tutorial/TuTodo4'
import TuMain from '../screens/Tutorial/TuMain'

const Stack = createStackNavigator()

export default function TutorialNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="TuMain" component={TuMain} />
      <Stack.Screen name="TuHome1" component={TuHome1} />
      <Stack.Screen name="TuHome2" component={TuHome2} />
      <Stack.Screen name="TuTodo1" component={TuTodo1} />
      <Stack.Screen name="TuTodo2" component={TuTodo2} />
      <Stack.Screen name="TuTodo3" component={TuTodo3} />
      <Stack.Screen name="TuTodo4" component={TuTodo4} />
      <Stack.Screen name="TuMyPage1" component={TuMyPage1} />
      <Stack.Screen name="TuMyPage2" component={TuMyPage2} />
      <Stack.Screen name="TuMyPage3" component={TuMyPage3} />
      <Stack.Screen name="TuMyPage4" component={TuMyPage4} />
      <Stack.Screen name="TuMyPage5" component={TuMypage5} />
      <Stack.Screen name="TuAdmin1" component={TuAdmin1} />
      <Stack.Screen name="TuAdmin2" component={TuAdmin2} />
      <Stack.Screen name="TuAdmin3" component={TuAdmin3} />
      <Stack.Screen name="TuAdmin4" component={TuAdmin4} />
    </Stack.Navigator>
  )
}
