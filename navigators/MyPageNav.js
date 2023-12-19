import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyPage from '../screens/MyPage/MyPage'
import Setting from '../screens/MyPage/Setting'
import Account from '../screens/MyPage/Account'
import { TouchableOpacity, View } from 'react-native'
import BackButton from '../assets/Svgs/chevron_back.svg'
import { colors } from '../colors'
import DeletePamily from '../screens/MyPage/DeletePamily'
import DeletePamily2 from '../screens/MyPage/DeletePamily2'
import AdministratorNav from './AdministratorNav'
import EditUserInfo from '../screens/MyPage/EditUserInfo'
import DeleteAccount from '../screens/MyPage/DeleteAccount'
import DeleteAccount2 from '../screens/MyPage/DeleteAccount2'
import DeleteAccount3 from '../screens/MyPage/DeleteAccount3'
import ServiceTerms from '../screens/MyPage/ServiceTerms'
import PrivacyTerms from '../screens/MyPage/PrivacyTerms'
import AlarmNav from './AlarmNav'
import Guide from '../screens/MyPage/Guide'
import TutorialNav from './TutorialNav'

const Stack = createStackNavigator()

export default function MyPageNav() {
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
      <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerTitle: '설정',
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
        name="Account"
        component={Account}
        options={({ navigation }) => ({
          headerTitle: '계정',
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
        name="EditUserInfo"
        component={EditUserInfo}
        options={({ navigation }) => ({
          headerTitle: '회원 정보 수정',
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
        name="DeletePamily"
        component={DeletePamily}
        options={({ navigation }) => ({
          headerTitle: '패밀리 나가기',
        })}
      />
      <Stack.Screen
        name="DeletePamily2"
        component={DeletePamily2}
        options={({ navigation }) => ({
          headerTitle: '패밀리 나가기',
          headerStyle: {
            backgroundColor: colors.red_200,
          },
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
        name="DeleteAccount"
        component={DeleteAccount}
        options={({ navigation }) => ({
          headerTitle: '포잇 탈퇴하기',
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
        name="DeleteAccount2"
        component={DeleteAccount2}
        options={({ navigation }) => ({
          headerTitle: '포잇 탈퇴하기',
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
        name="DeleteAccount3"
        component={DeleteAccount3}
        options={({ navigation }) => ({
          headerTitle: '포잇 탈퇴하기',
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
        name="ServiceTerms"
        component={ServiceTerms}
        options={({ navigation }) => ({
          headerTitle: '서비스 이용약관',
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
        name="PrivacyTerms"
        component={PrivacyTerms}
        options={({ navigation }) => ({
          headerTitle: '개인정보처리방침',
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
        name="Guide"
        component={Guide}
        options={({ navigation }) => ({
          headerTitle: '포잇 가이드',
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
        name="AdministratorNav"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        {() => AdministratorNav()}
      </Stack.Screen>

      <Stack.Screen
        name="AlarmNav"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        {() => <AlarmNav />}
      </Stack.Screen>

      <Stack.Screen
        name="TutorialNav"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        {() => <TutorialNav />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
