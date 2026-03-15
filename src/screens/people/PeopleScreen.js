import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./ListScreen";
import AddScreen from "./AddScreen";

const Stack = createStackNavigator();

export default function PeopleScreen() {
  return (
    <Stack.Navigator
      initialRouteName="PeopleList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PeopleList" component={ListScreen} />
      <Stack.Screen name="PeopleAdd" component={AddScreen} />
    </Stack.Navigator>
  );
}
