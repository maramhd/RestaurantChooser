import React, { useState, useCallback } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { File, Paths } from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";

const peopleFile = new File(Paths.document, "people.json");

export default function ListScreen({ navigation }) {
  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    try {
      if (peopleFile.exists) {
        const data = await peopleFile.text();
        setPeople(data ? JSON.parse(data) : []);
      } else {
        setPeople([]);
      }
    } catch (error) {
      console.error("Error loading people:", error);
      Toast.show({
        type: "error",
        text1: "Loading Error",
        text2: error.message || "Failed to load data",
      });
      setPeople([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, []),
  );

  const deletePerson = async (id) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this person?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const updated = people.filter((p) => p.key !== id);
              await peopleFile.write(JSON.stringify(updated));
              setPeople(updated);
              Toast.show({
                type: "error",
                text1: "Deleted",
                text2: "The person has been successfully deleted.",
                visibilityTime: 2000,
              });
            } catch (error) {
              Alert.alert("Error", "Deletion failed");
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        text="Add Person"
        onPress={() => navigation.navigate("PeopleAdd")}
        width="90%"
      />
      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            <Text style={styles.text}>
              {item.firstName} {item.lastName}
            </Text>
            <CustomButton
              text="Delete"
              onPress={() => deletePerson(item.key)}
              buttonStyle={styles.deleteButton}
              width={80}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No people have been added yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(245, 245, 245)",
  },
  personItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "#f8b4b4",
    paddingVertical: 6,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#0a0a0a",
  },
});
