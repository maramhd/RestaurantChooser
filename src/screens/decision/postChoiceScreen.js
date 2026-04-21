import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";

const PostChoiceScreen = ({ route, navigation }) => {
  const { chosenRestaurant } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>Enjoy your meal!</Text>
      <View style={styles.box}>
        <Text style={styles.restaurantName}>{chosenRestaurant.name}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Cuisine:</Text>
          <Text style={styles.valueOrange}>{chosenRestaurant.cuisine}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.valueGreen}>
            {"$".repeat(chosenRestaurant.price)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.valueYellow}>
            {"★".repeat(chosenRestaurant.rating)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.valueBlue}>
            {chosenRestaurant.phone || "N/A"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.valuePurple}>
            {chosenRestaurant.address || "N/A"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Web Site:</Text>
          <Text style={styles.valueTeal}>
            {chosenRestaurant.website || "N/A"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Delivery:</Text>
          <Text
            style={
              chosenRestaurant.delivery
                ? styles.valueDeliveryYes
                : styles.valueDeliveryNo
            }
          >
            {chosenRestaurant.delivery ? "Yes" : "No"}
          </Text>
        </View>
      </View>
      <CustomButton text="All Done" onPress={() => navigation.popToTop()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 30,
    backgroundColor: "#f9f9f9",
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
  },
  box: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    backgroundColor: "#fff",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7f8c8d",
    width: 80,
  },

  valueOrange: {
    fontSize: 16,
    color: "#e67e22",
    fontWeight: "600",
  },
  valueGreen: {
    fontSize: 16,
    color: "#27ae60",
    fontWeight: "600",
  },
  valueYellow: {
    fontSize: 18,
    color: "#f39c12",
    fontWeight: "600",
  },
  valueBlue: {
    fontSize: 16,
    color: "#2980b9",
    fontWeight: "600",
  },
  valuePurple: {
    fontSize: 16,
    color: "#8e44ad",
    fontWeight: "600",
  },
  valueTeal: {
    fontSize: 16,
    color: "#16a085",
    fontWeight: "600",
  },
  valueDeliveryYes: {
    fontSize: 16,
    color: "#27ae60",
    fontWeight: "bold",
  },
  valueDeliveryNo: {
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "bold",
  },
});

export default PostChoiceScreen;
