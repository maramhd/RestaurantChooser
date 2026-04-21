import React, { useState, useCallback } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system/legacy";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";

const peopleFile = `${FileSystem.documentDirectory}people.json`;

export default function ListScreen({ navigation }) {
  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    try {
      let loaded = [];
      try {
        const fileContent = await FileSystem.readAsStringAsync(peopleFile);
        loaded = fileContent ? JSON.parse(fileContent) : [];
      } catch (err) {
        loaded = [];
      }

      //  إصلاح أي keys مكررة تلقائياً
      const seenKeys = new Set();
      const fixed = loaded.map((item) => {
        if (seenKeys.has(item.key)) {
          item = {
            ...item,
            key: `p_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          };
        }
        seenKeys.add(item.key);
        return item;
      });

      //  احفظ البيانات المصلحة إذا كان هناك تغيير
      if (JSON.stringify(fixed) !== JSON.stringify(loaded)) {
        await FileSystem.writeAsStringAsync(peopleFile, JSON.stringify(fixed));
      }

      setPeople(fixed);
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
              await FileSystem.writeAsStringAsync(
                peopleFile,
                JSON.stringify(updated),
              );
              setPeople(updated);
              Toast.show({
                type: "success",
                text1: "Deleted",
                text2: "The person has been successfully deleted.",
                visibilityTime: 2000,
              });
            } catch (error) {
              Alert.alert("Error", "Deletion failed: " + error.message);
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
