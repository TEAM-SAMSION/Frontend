import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../screens/MyPage/MyPage";

const Stack = createStackNavigator();

export default function MyPageNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
}
