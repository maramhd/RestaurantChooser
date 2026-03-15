import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { File, Paths } from "expo-file-system";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import * as validators from "./validators";

const restaurantsFile = new File(Paths.document, "restaurants.json");

// دالة لتوليد مفتاح فريد (يعتمد على الوقت + رقم عشوائي)
const generateUniqueKey = () => {
  return `r_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

const initialRestaurant = {
  key: generateUniqueKey(),
  name: "",
  cuisine: "",
  price: "",
  rating: "",
  phone: "",
  address: "",
  website: "",
  delivery: "",
  errors: {},
};

export default function AddScreen({ navigation }) {
  const [restaurant, setRestaurant] = useState(initialRestaurant);

  const setField = (field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const errors = {
      name: validators.validateName(restaurant.name),
      phone: validators.validatePhone(restaurant.phone),
      address: validators.validateAddress(restaurant.address),
      website: validators.validateWebsite(restaurant.website),
      cuisine: !restaurant.cuisine ? "Please select a cuisine type" : null,
      price: !restaurant.price ? "Please select a price level" : null,
      rating: !restaurant.rating ? "Please select a rating" : null,
      delivery: !restaurant.delivery ? "Please select delivery option" : null,
    };
    setRestaurant((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((e) => e !== null);
  };

  const saveRestaurant = async () => {
    if (!validateAllFields()) {
      const firstError = Object.values(restaurant.errors).find((e) => e);
      Toast.show({
        type: "error",
        text1: "Input Error",
        text2: firstError,
        visibilityTime: 3000,
      });
      return;
    }

    try {
      // قراءة المطاعم الحالية
      let restaurants = [];
      if (restaurantsFile.exists) {
        const data = await restaurantsFile.text();
        restaurants = data ? JSON.parse(data) : [];
      }

      // إضافة المطعم الجديد (بمفتاح جديد)
      const newRestaurant = {
        ...restaurant,
        key: generateUniqueKey(), // تأكيد توليد مفتاح جديد وقت الحفظ
      };
      restaurants.push(newRestaurant);

      // حفظ القائمة
      await restaurantsFile.write(JSON.stringify(restaurants));

      Toast.show({
        type: "success",
        text1: "Saved successfully",
        text2: `Added ${newRestaurant.name}`,
        visibilityTime: 2000,
      });

      // العودة بعد ظهور Toast
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <CustomTextInput
            label="Name"
            maxLength={50}
            value={restaurant.name}
            onChangeText={(text) => setField("name", text)}
            error={restaurant.errors.name}
          />

          <Text style={styles.fieldLabel}>Cuisine</Text>
          <View
            style={[
              styles.pickerContainer,
              restaurant.errors.cuisine && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={restaurant.cuisine}
              onValueChange={(value) => setField("cuisine", value)}
            >
              <Picker.Item label="Choose..." value="" />
              <Picker.Item label="American" value="American" />
              <Picker.Item label="Chinese" value="Chinese" />
              <Picker.Item label="Italian" value="Italian" />
              <Picker.Item label="Mexican" value="Mexican" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {restaurant.errors.cuisine && (
            <Text style={styles.errorText}>{restaurant.errors.cuisine}</Text>
          )}

          <Text style={styles.fieldLabel}>Price (1-5)</Text>
          <View
            style={[
              styles.pickerContainer,
              restaurant.errors.price && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={restaurant.price}
              onValueChange={(value) => setField("price", value)}
            >
              <Picker.Item label="Choose..." value="" />
              {[1, 2, 3, 4, 5].map((n) => (
                <Picker.Item
                  key={n}
                  label={n.toString()}
                  value={n.toString()}
                />
              ))}
            </Picker>
          </View>
          {restaurant.errors.price && (
            <Text style={styles.errorText}>{restaurant.errors.price}</Text>
          )}

          <Text style={styles.fieldLabel}>Rating (1-5)</Text>
          <View
            style={[
              styles.pickerContainer,
              restaurant.errors.rating && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={restaurant.rating}
              onValueChange={(value) => setField("rating", value)}
            >
              <Picker.Item label="Choose..." value="" />
              {[1, 2, 3, 4, 5].map((n) => (
                <Picker.Item
                  key={n}
                  label={n.toString()}
                  value={n.toString()}
                />
              ))}
            </Picker>
          </View>
          {restaurant.errors.rating && (
            <Text style={styles.errorText}>{restaurant.errors.rating}</Text>
          )}

          <CustomTextInput
            label="Phone"
            maxLength={20}
            value={restaurant.phone}
            onChangeText={(text) => setField("phone", text)}
            error={restaurant.errors.phone}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            label="Address"
            maxLength={50}
            value={restaurant.address}
            onChangeText={(text) => setField("address", text)}
            error={restaurant.errors.address}
          />

          <CustomTextInput
            label="Website"
            maxLength={50}
            value={restaurant.website}
            onChangeText={(text) => setField("website", text)}
            error={restaurant.errors.website}
            keyboardType="url"
            autoCapitalize="none"
          />

          <Text style={styles.fieldLabel}>Delivery?</Text>
          <View
            style={[
              styles.pickerContainer,
              restaurant.errors.delivery && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={restaurant.delivery}
              onValueChange={(value) => setField("delivery", value)}
            >
              <Picker.Item label="Choose..." value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
          {restaurant.errors.delivery && (
            <Text style={styles.errorText}>{restaurant.errors.delivery}</Text>
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
            onPress={saveRestaurant}
            buttonStyle={styles.saveButton}
            width="45%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 30 },
  formContainer: { width: "96%", alignSelf: "center" },
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
    marginBottom: 4,
  },
  pickerError: { borderColor: "#f8b4b4" },
  errorText: {
    color: "#f8b4b4",
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  cancelButton: { backgroundColor: "#a0a0a0" },
  saveButton: { backgroundColor: "#f8b4b4" },
});
