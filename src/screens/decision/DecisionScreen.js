import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DecisionScreen = ({ navigation }) => {
  // Check if sufficient data exists before allowing user to proceed
  const checkAndStart = async () => {
    try {
      // Retrieve stored people and restaurants data
      const peopleData = await AsyncStorage.getItem("people");
      const restaurantsData = await AsyncStorage.getItem("restaurants");
      const people = peopleData ? JSON.parse(peopleData) : [];
      const restaurants = restaurantsData ? JSON.parse(restaurantsData) : [];

      // Validate that at least one person and restaurant exist
      if (people.length === 0 || restaurants.length === 0) {
        Alert.alert(
          "Missing Data",
          "Please add at least one person and one restaurant first.",
        );
        return;
      }

      // Proceed to next screen
      navigation.navigate("WhosGoingScreen");
    } catch (error) {
      console.error("Error checking data:", error);
      Alert.alert("Error", "Failed to load data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Touchable decision button with visual feedback */}
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
