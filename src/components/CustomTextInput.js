import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const CustomTextInput = ({
  label,
  labelStyle,
  maxLength,
  textInputStyle,
  value,
  onChangeText,
  error,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, textInputStyle, error ? styles.inputError : null]}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 14,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#f8b4b4",
  },
  errorText: {
    color: "#f8b4b4",
    marginLeft: 8,
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomTextInput;
