import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNav from './HomeNav'
import MyPageNav from './MyPageNav'
import ToDoNav from './ToDoNav'

const Tabs = createBottomTabNavigator()

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="HomeNav">{() => <HomeNav />}</Tabs.Screen>
      <Tabs.Screen name="ToDoNav">{() => <ToDoNav />}</Tabs.Screen>
      <Tabs.Screen name="MyPageNav">{() => <MyPageNav />}</Tabs.Screen>
    </Tabs.Navigator>
  )
}
