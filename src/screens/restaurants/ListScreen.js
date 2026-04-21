import React, { useState, useCallback } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system/legacy";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";

// Define restaurants file path using Expo FileSystem API
const restaurantsFile = `${FileSystem.documentDirectory}restaurants.json`;

export default function ListScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);

  const loadRestaurants = async () => {
    try {
      let loaded = [];
      try {
        const fileContent = await FileSystem.readAsStringAsync(restaurantsFile);
        loaded = fileContent ? JSON.parse(fileContent) : [];
      } catch (err) {
        // File doesn't exist yet
        loaded = [];
      }

      // Remove any duplicate keys (failsafe)
      const seenKeys = new Set();
      const unique = loaded.filter((item) => {
        if (seenKeys.has(item.key)) {
          console.warn(`Duplicate key found and removed: ${item.key}`);
          return false;
        }
        seenKeys.add(item.key);
        return true;
      });

      // If duplicates were removed, save the unique data back
      if (unique.length !== loaded.length) {
        await FileSystem.writeAsStringAsync(
          restaurantsFile,
          JSON.stringify(unique),
        );
      }

      setRestaurants(unique);
    } catch (error) {
      console.error("Error loading restaurants:", error);
      Toast.show({
        type: "error",
        text1: "Loading Error",
        text2: error.message || "Could not load data",
      });
      setRestaurants([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRestaurants();
    }, []),
  );

  const deleteRestaurant = async (id) => {
    Alert.alert("Confirm", "Are you sure you want to delete this restaurant?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const updated = restaurants.filter((r) => r.key !== id);
            await FileSystem.writeAsStringAsync(
              restaurantsFile,
              JSON.stringify(updated),
            );
            setRestaurants(updated);
            Toast.show({
              type: "success",
              text1: "Deleted",
              text2: "Restaurant deleted successfully",
              visibilityTime: 2000,
            });
          } catch (error) {
            Alert.alert("Error", "Deletion failed: " + error.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        text="Add Restaurant"
        onPress={() => navigation.navigate("RestaurantsAdd")}
        width="90%"
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.text}>{item.name}</Text>
            <CustomButton
              text="Delete"
              onPress={() => deleteRestaurant(item.key)}
              buttonStyle={styles.deleteButton}
              width={80}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No restaurants added yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },
  restaurantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: { fontSize: 18 },
  deleteButton: {
    backgroundColor: "#f8b4b4",
    paddingVertical: 6,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#a0a0a0",
  },
});
