import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./ListScreen";
import AddScreen from "./AddScreen";

const Stack = createStackNavigator();

export default function RestaurantsScreen() {
  return (
    <Stack.Navigator
      initialRouteName="RestaurantsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RestaurantsList" component={ListScreen} />
      <Stack.Screen name="RestaurantsAdd" component={AddScreen} />
    </Stack.Navigator>
  );
}
