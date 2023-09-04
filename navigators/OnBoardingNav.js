import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "../screens/OnBoarding/OnBoarding.js";
import Login from "../screens/OnBoarding/Login";
import { Test } from "../screens/OnBoarding/Test.js";

const Stack = createStackNavigator();

export default function OnBoardingNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Test" component={Test} />
      {/* <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} /> */}
    </Stack.Navigator>
  );
}
