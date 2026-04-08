import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DecisionScreen from "./DecisionScreen";
import WhosGoingScreen from "./whosGoingScreen";
import PreFiltersScreen from "./preFiltersScreen";
import ChoiceScreen from "./choiceScreen";
import PostChoiceScreen from "./postChoiceScreen";

const Stack = createStackNavigator();

export default function DecisionScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DecisionTimeScreen" component={DecisionScreen} />
      <Stack.Screen name="WhosGoingScreen" component={WhosGoingScreen} />
      <Stack.Screen name="PreFiltersScreen" component={PreFiltersScreen} />
      <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
      <Stack.Screen name="PostChoiceScreen" component={PostChoiceScreen} />
    </Stack.Navigator>
  );
}
