import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AdminHome from '../screens/Administrator/AdminHome'
import ManageMember from '../screens/Administrator/ManageMember'
import ManageTodo from '../screens/Administrator/ManageTodo'
import ManagePetNav from './ManagePetNav'
import { colors } from '../colors'
import { TouchableOpacity } from 'react-native'
import BackButton from '../assets/Svgs/chevron_back.svg'

const Stack = createStackNavigator()

export default function AdministratorNav() {
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
      <Stack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false }} />
      <Stack.Screen
        name="ManageMember"
        component={ManageMember}
        options={({ navigation }) => ({
          headerTitle: '회원 관리',
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
      <Stack.Screen name="ManagePetNav" options={{ headerShown: false }}>
        {() => <ManagePetNav />}
      </Stack.Screen>
      <Stack.Screen name="ManageTodo" component={ManageTodo} />
    </Stack.Navigator>
  )
}
