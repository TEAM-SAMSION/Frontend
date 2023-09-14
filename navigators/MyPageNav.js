import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../screens/MyPage/MyPage";
import Setting from "../screens/MyPage/Setting";
import Account from "../screens/MyPage/Account";
import { TouchableOpacity, View } from "react-native";

const Stack = createStackNavigator();

export default function MyPageNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          lineHeight: 28,
          fontWeight: 700,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerTitle: "설정",
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.goBack()}>
          //     <View style={{ backgroudColor: "pink", width: 24, height: 24 }} />
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}
