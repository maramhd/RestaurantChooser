import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";

const { width, height } = Dimensions.get("window");

const peopleFile = `${FileSystem.documentDirectory}people.json`;
const restaurantsFile = `${FileSystem.documentDirectory}restaurants.json`;

const DecisionScreen = ({ navigation }) => {
  const checkAndStart = async () => {
    try {
      let people = [];
      let restaurants = [];

      try {
        const peopleContent = await FileSystem.readAsStringAsync(peopleFile);
        people = peopleContent ? JSON.parse(peopleContent) : [];
      } catch (e) {
        people = [];
      }

      try {
        const restaurantsContent =
          await FileSystem.readAsStringAsync(restaurantsFile);
        restaurants = restaurantsContent ? JSON.parse(restaurantsContent) : [];
      } catch (e) {
        restaurants = [];
      }

      if (people.length === 0 || restaurants.length === 0) {
        Alert.alert(
          "Missing Data",
          "Please add at least one person and one restaurant first.",
        );
        return;
      }

      navigation.navigate("WhosGoingScreen");
    } catch (error) {
      console.error("Error checking data:", error);
      Alert.alert("Error", "Failed to load data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={checkAndStart}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <Image
          source={require("../../../assets/its-decision-time.ios.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Tap to choose a restaurant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  touchable: {
    alignItems: "center",
  },
  image: {
    width: width * 0.7, // 70% من عرض الشاشة
    height: width * 0.7, // نفس العرض لجعلها مربعة
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#2f80ed",
    fontWeight: "600",
  },
});

export default DecisionScreen;
