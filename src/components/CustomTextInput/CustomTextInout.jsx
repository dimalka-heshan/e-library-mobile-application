import { StyleSheet, TextInput } from "react-native";
import React from "react";

const CustomTextInput = (props) => {
  const {
    value,
    onChangeText,
    placeholder,
    editable,
    selectTextOnFocus,
    secureTextEntry,
  } = props;
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={(text) => onChangeText(text)}
      placeholder={placeholder}
      value={value}
      editable={editable}
      selectTextOnFocus={selectTextOnFocus}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
  },
});
