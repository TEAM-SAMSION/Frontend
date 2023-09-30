import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ToDo from "../screens/ToDo/ToDo";

const Stack = createStackNavigator();

export default function ToDoNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ToDo" component={ToDo} />
    </Stack.Navigator>
  );
}
