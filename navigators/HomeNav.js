import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import { colors } from "../colors";

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleStyle: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 700,
        color: colors.grey_600,
      },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
