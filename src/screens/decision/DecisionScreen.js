import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DecisionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Decision Screen - Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  text: {
    fontSize: 20,
    color: "#353232",
  },
});
