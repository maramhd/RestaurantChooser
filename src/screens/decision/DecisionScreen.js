import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DecisionScreen = ({ navigation }) => {
  const checkAndStart = async () => {
    const peopleData = await AsyncStorage.getItem("people");
    const restaurantsData = await AsyncStorage.getItem("restaurants");
    const people = peopleData ? JSON.parse(peopleData) : [];
    const restaurants = restaurantsData ? JSON.parse(restaurantsData) : [];
    if (people.length === 0 || restaurants.length === 0) {
      Alert.alert(
        "Missing Data",
        "Please add at least one person and one restaurant first.",
      );
      return;
    }
    navigation.navigate("WhosGoingScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={checkAndStart}>
        <Image
          source={require("../../../assets/its-decision-time.android.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Tap to choose a restaurant</Text>
      </TouchableOpacity>
    </View>
  );
};
// اختبار كتابة وقراءة
await AsyncStorage.setItem("test", "hello");
const testValue = await AsyncStorage.getItem("test");
console.log("Test value:", testValue);

const styles = {
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 150, height: 150, marginBottom: 20 },
  text: { fontSize: 18, color: "blue" },
};

export default DecisionScreen;
