import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { File, Paths } from "expo-file-system";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import * as validators from "./validators";

const peopleFile = new File(Paths.document, "people.json");

const initialPerson = {
  key: `p_${new Date().getTime()}`,
  firstName: "",
  lastName: "",
  relationship: "",
  errors: {},
};

export default function AddScreen({ navigation }) {
  const [person, setPerson] = useState(initialPerson);

  const setField = (field, value) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validate = () => {
    const errors = {
      firstName: validators.validateFirstName(person.firstName),
      lastName: validators.validateLastName(person.lastName),
      relationship: !person.relationship
        ? "Please select a relationship"
        : null,
    };
    setPerson((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((e) => e);
  };

  const save = async () => {
    if (!validate()) {
      const firstError = Object.values(person.errors).find((e) => e);
      Toast.show({
        type: "error",
        text1: "Input Error",
        text2: firstError,
        visibilityTime: 3000,
      });
      return;
    }

    try {
      let people = [];
      if (peopleFile.exists) {
        const data = await peopleFile.text();
        people = data ? JSON.parse(data) : [];
      }
      people.push(person);
      await peopleFile.write(JSON.stringify(people));

      Toast.show({
        type: "success",
        text1: "Saved successfully",
        text2: `Added ${person.firstName} ${person.lastName}`,
        visibilityTime: 2000,
      });

      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      console.error("Save error:", error);
      Toast.show({
        type: "error",
        text1: "Save Error",
        text2: error.message || "An unexpected error occurred",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <ScrollView>
        <View style={styles.form}>
          <CustomTextInput
            label="First Name"
            value={person.firstName}
            onChangeText={(t) => setField("firstName", t)}
            error={person.errors.firstName}
          />
          <CustomTextInput
            label="Last Name"
            value={person.lastName}
            onChangeText={(t) => setField("lastName", t)}
            error={person.errors.lastName}
          />
          <Text style={styles.fieldLabel}>Relationship</Text>
          <View
            style={[
              styles.pickerContainer,
              person.errors.relationship && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={person.relationship}
              onValueChange={(v) => setField("relationship", v)}
            >
              <Picker.Item label="Choose..." value="" />
              <Picker.Item label="Me" value="Me" />
              <Picker.Item label="Family" value="Family" />
              <Picker.Item label="Friend" value="Friend" />
              <Picker.Item label="Coworker" value="Coworker" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {person.errors.relationship && (
            <Text style={styles.errorText}>{person.errors.relationship}</Text>
          )}
        </View>
        <View style={styles.buttonRow}>
          <CustomButton
            text="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
            width="45%"
          />
          <CustomButton
            text="Save"
            onPress={save}
            buttonStyle={styles.saveButton}
            width="45%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "96%",
    alignSelf: "center",
    marginTop: 20,
  },
  fieldLabel: {
    marginLeft: 8,
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    color: "#555",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
  pickerError: {
    borderColor: "#f8b4b4",
  },
  errorText: {
    color: "#f87474",
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: "#a0a0a0",
  },
  saveButton: {
    backgroundColor: "#f8b4b4",
  },
});
