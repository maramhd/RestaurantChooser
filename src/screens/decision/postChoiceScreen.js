import React from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";

const PostChoiceScreen = ({ route, navigation }) => {
  const { chosenRestaurant } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>Enjoy your meal!</Text>
      <View style={styles.box}>
        <Text style={styles.name}>{chosenRestaurant.name}</Text>
        <Text>Cuisine: {chosenRestaurant.cuisine}</Text>
        <Text>Price: {"$".repeat(chosenRestaurant.price)}</Text>
        <Text>Rating: {"★".repeat(chosenRestaurant.rating)}</Text>
        <Text>Phone: {chosenRestaurant.phone || "N/A"}</Text>
        <Text>Address: {chosenRestaurant.address || "N/A"}</Text>
        <Text>Website: {chosenRestaurant.website || "N/A"}</Text>
        <Text>Delivery: {chosenRestaurant.delivery ? "Yes" : "No"}</Text>
      </View>
      <CustomButton text="All Done" onPress={() => navigation.popToTop()} />
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 30,
  },
  headline: { fontSize: 32, fontWeight: "bold" },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    gap: 8,
  },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
};

export default PostChoiceScreen;
