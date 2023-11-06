import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNav from './HomeNav'
import MyPageNav from './MyPageNav'
import ToDoNav from './ToDoNav'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { colors } from '../colors'

import Home from '../assets/Svgs/Home.svg'
import Logo from '../assets/Svgs/LOGO_Symbol.svg'
import MyPage from '../assets/Svgs/Mypage.svg'
import { DetailSm_Text } from '../components/Fonts'
import { Platform } from 'react-native'

const Tabs = createBottomTabNavigator()

export default function LoggedInNav() {
  return (
    <BottomSheetModalProvider>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: Platform.OS == 'android' ? 68 : 88,
            paddingTop: Platform.OS == 'android' ? 0 : 16,
          },
        }}
      >
        <Tabs.Screen
          name="HomeNav"
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <Home style={{ color: focused ? colors.primary_outline : colors.grey_250 }} width={24} height={24} />
                <DetailSm_Text color={focused ? colors.primary_outline : colors.grey_250} style={{ marginTop: 4 }}>
                  홈
                </DetailSm_Text>
              </>
            ),
          }}
        >
          {() => <HomeNav />}
        </Tabs.Screen>
        <Tabs.Screen
          name="ToDoNav"
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <Logo style={{ color: focused ? colors.primary_outline : colors.grey_250 }} width={65} height={65} />
              </>
            ),
          }}
        >
          {() => <ToDoNav />}
        </Tabs.Screen>
        <Tabs.Screen
          name="MyPageNav"
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <MyPage style={{ color: focused ? colors.primary_outline : colors.grey_250 }} width={24} height={24} />
                <DetailSm_Text color={focused ? colors.primary_outline : colors.grey_250} style={{ marginTop: 4 }}>
                  마이페이지
                </DetailSm_Text>
              </>
            ),
          }}
        >
          {() => <MyPageNav />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </BottomSheetModalProvider>
  )
}
