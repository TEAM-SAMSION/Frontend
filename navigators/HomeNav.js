import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home/Home'
import { colors } from '../colors'
import ToDoNav from './ToDoNav'
import CreateTeam from '../screens/Home/CreateTeam'
import JoinTeam from '../screens/Home/JoinTeam'
import { TouchableOpacity } from 'react-native'
import BackButton from '../assets/Svgs/chevron_back.svg'

const Stack = createStackNavigator()

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 16,
          lineHeight: 22,
          fontWeight: 700,
          color: colors.grey_600,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="CreateTeam"
        component={CreateTeam}
        options={({ navigation }) => ({
          headerTitle: 'Pamily',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
              }}
            >
              <BackButton width={24} height={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="JoinTeam"
        component={JoinTeam}
        options={({ navigation }) => ({
          headerTitle: 'Pamily',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
              }}
            >
              <BackButton width={24} height={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ToDoNav"
        component={ToDoNav}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}
