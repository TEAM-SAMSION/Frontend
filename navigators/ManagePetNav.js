import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ManagePet from '../screens/Administrator/ManagePet'
import { colors } from '../colors'
import { TouchableOpacity } from 'react-native'
import BackButton from '../assets/Svgs/chevron_back.svg'

const Stack = createStackNavigator()

export default function ManagePetNav() {
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
      <Stack.Screen
        name="ManagePet"
        component={ManagePet}
        options={({ navigation }) => ({
          headerTitle: '펫 관리',
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
    </Stack.Navigator>
  )
}
