import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home/Home'
import { colors } from '../colors'
import CreateTeam from '../screens/Home/CreateTeam'
import JoinTeam from '../screens/Home/JoinTeam'
import { TouchableOpacity } from 'react-native'
import BackButton from '../assets/Svgs/chevron_back.svg'
import AddPetProfile from '../screens/Home/AddPetProfile'
import EditPetProfile from '../screens/Home/EditPetProfile'
import AlarmNav from './AlarmNav'
import AuthBridge from '../screens/Home/AuthBridge'

const Stack = createStackNavigator()

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Spoqa-Bold',
          fontSize: 16,
          lineHeight: 22,
          fontWeight: 700,
          color: colors.grey_600,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="AuthBridge" component={AuthBridge} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="CreateTeam"
        component={CreateTeam}
        options={({ navigation }) => ({
          headerTitle: 'Pamily 생성',
        })}
      />
      <Stack.Screen
        name="JoinTeam"
        component={JoinTeam}
        options={({ navigation }) => ({
          headerTitle: 'Pamily 참여',
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
        name="AddPetProfile"
        component={AddPetProfile}
        options={({ navigation }) => ({
          headerTitle: '펫 등록',
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
        name="EditPetProfile"
        component={EditPetProfile}
        options={({ navigation }) => ({
          headerTitle: '펫 정보 수정',
        })}
      />
      <Stack.Screen
        name="AlarmNav"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        {() => <AlarmNav />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
