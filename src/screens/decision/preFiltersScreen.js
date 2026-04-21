import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../components/CustomButton";
import * as FileSystem from "expo-file-system/legacy";

const restaurantsFile = `${FileSystem.documentDirectory}restaurants.json`;

const PreFiltersScreen = ({ route, navigation }) => {
  const { participants } = route.params;
  const [cuisine, setCuisine] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [delivery, setDelivery] = useState("");

  const handleNext = async () => {
    let stored = null;
    try {
      stored = await FileSystem.readAsStringAsync(restaurantsFile);
    } catch (e) {
      stored = null;
    }

    if (!stored) {
      Alert.alert("No restaurants", "Please add restaurants first.");
      return;
    }

    const allRestaurants = JSON.parse(stored);
    const filtered = allRestaurants.filter((rest) => {
      const matchCuisine = !cuisine || rest.cuisine === cuisine;
      const matchPrice = !price || Number(rest.price) <= Number(price);
      const matchRating = !rating || Number(rest.rating) >= Number(rating);
      const matchDelivery = !delivery || rest.delivery === (delivery === "Yes");
      return matchCuisine && matchPrice && matchRating && matchDelivery;
    });

    if (filtered.length === 0) {
      Alert.alert(
        "No matches",
        "No restaurants match your filters. Please adjust.",
      );
      return;
    }

    navigation.navigate("ChoiceScreen", {
      participants,
      restaurants: filtered,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.headline}>Pre-Filters</Text>
        <Text style={styles.label}>Cuisine</Text>
        <Picker
          selectedValue={cuisine}
          onValueChange={setCuisine}
          style={styles.picker}
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Chinese" value="Chinese" />
          <Picker.Item label="Indian" value="Indian" />
          <Picker.Item label="Mexican" value="Mexican" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Text style={styles.label}>Max Price</Text>
        <Picker
          selectedValue={price}
          onValueChange={setPrice}
          style={styles.picker}
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="$" value="1" />
          <Picker.Item label="$$" value="2" />
          <Picker.Item label="$$$" value="3" />
          <Picker.Item label="$$$$" value="4" />
        </Picker>
        <Text style={styles.label}>Min Rating</Text>
        <Picker
          selectedValue={rating}
          onValueChange={setRating}
          style={styles.picker}
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="1 Star" value="1" />
          <Picker.Item label="2 Stars" value="2" />
          <Picker.Item label="3 Stars" value="3" />
          <Picker.Item label="4 Stars" value="4" />
          <Picker.Item label="5 Stars" value="5" />
        </Picker>
        <Text style={styles.label}>Delivery</Text>
        <Picker
          selectedValue={delivery}
          onValueChange={setDelivery}
          style={styles.picker}
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
        <CustomButton text="Next" onPress={handleNext} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    padding: 20,
    gap: 10,
  },
  headline: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  picker: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    ...Platform.select({
      android: { height: 50 },
    }),
  },
});

export default PreFiltersScreen;
