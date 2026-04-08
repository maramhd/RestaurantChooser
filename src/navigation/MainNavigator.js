import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image, StatusBar } from "react-native";
import Constants from "expo-constants";
import { SafeAreaProvider } from "react-native-safe-area-context";

import PeopleScreen from "../screens/people/PeopleScreen";
import DecisionScreenNavigation from "../screens/decision/decisionScreenNavigation"; // ✅ استيراد Stack Navigator
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";

const Tab = createMaterialTopTabNavigator();

export default function MainNavigator() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Restaurants"
          tabBarPosition="top"
          screenOptions={{
            animationEnabled: true,
            swipeEnabled: true,
            lazy: true,
            tabBarActiveTintColor: "#f59292",
            tabBarInactiveTintColor: "#a0a0a0",
            tabBarIndicatorStyle: { backgroundColor: "#f8b4b4" },
            tabBarStyle: {
              backgroundColor: "#fff",
              paddingTop: Constants.statusBarHeight,
              elevation: 4,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        >
          <Tab.Screen
            name="People"
            component={PeopleScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={require("../../assets/icon-people.png")}
                  style={{ width: 24, height: 24, tintColor: color }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Decision"
            component={DecisionScreenNavigation} // ✅ استخدام الـ Stack Navigator بدلاً من الشاشة المباشرة
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={require("../../assets/icon-decision.png")}
                  style={{ width: 24, height: 24, tintColor: color }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Restaurants"
            component={RestaurantsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={require("../../assets/icon-restaurants.png")}
                  style={{ width: 24, height: 24, tintColor: color }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
