import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/CustomButton";
import Checkbox from "expo-checkbox";

const WhosGoingScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadPeople();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert("Exit", "Are you sure you want to go back?", [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => navigation.goBack() },
        ]);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const loadPeople = async () => {
    const stored = await AsyncStorage.getItem("people");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPeople(parsed);
      setSelected(new Array(parsed.length).fill(false));
    }
  };

  const toggleSelection = (index) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    setSelected(updated);
  };

  const handleNext = () => {
    const selectedParticipants = people
      .map((person, idx) =>
        selected[idx] ? { ...person, vetoed: "no" } : null,
      )
      .filter(Boolean);
    if (selectedParticipants.length === 0) {
      Alert.alert("No one selected", "Please select at least one person.");
      return;
    }
    navigation.navigate("PreFiltersScreen", {
      participants: selectedParticipants,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Who's Going?</Text>
      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Checkbox
              value={selected[index]}
              onValueChange={() => toggleSelection(index)}
            />
            <Text style={styles.name}>
              {item.firstName} {item.lastName} ({item.relationship})
            </Text>
          </View>
        )}
      />
      <CustomButton text="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  headline: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  name: {
    fontSize: 18,
    color: "#333",
  },
});

export default WhosGoingScreen;
