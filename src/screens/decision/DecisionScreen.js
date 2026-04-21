import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";

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
      <TouchableOpacity onPress={checkAndStart} activeOpacity={0.7}>
        <Image
          source={require("../../../assets/its-decision-time.android.png")}
          style={styles.image}
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
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "blue",
    fontWeight: "500",
  },
});

export default DecisionScreen;
