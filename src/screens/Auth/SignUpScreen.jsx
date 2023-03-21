import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import COLORS from "../../constants/color";
import SignUp from "../../assets/images/SignUp.png";

const SignUpScreen = () => {
  const [uploadStatus, setUploadStatus] = useState("Choose Profile Picture");

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image source={SignUp} style={styles.LogoImage} />
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.loginContainer}>
              <TextInput style={styles.textInput} placeholder="Full Name" />
              <TextInput style={styles.textInput} placeholder="Email" />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />

              <View style={styles.imageUploadField}>
                <TextInput
                  style={styles.ImageTextInput}
                  placeholder="Choose File"
                  editable={false}
                  selectTextOnFocus={false}
                  value={uploadStatus}
                />
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.uploadTxt}>Upload</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.signUpSen}>
            {" "}
            Already have an account?{"  "}
            <Text
              onPress={() => {
                navigation.push("LoginScreen");
              }}
              style={styles.signUpText}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: "4%",
  },

  textInputContainer: {
    flex: 2,
    width: "80%",
    height: "100%",
    alignSelf: "center",
    marginTop: responsiveHeight(5),
  },

  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
  },

  buttonContainer: {
    width: "50%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },

  loginButton: {
    width: "100%",
    height: "30%",
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    minHeight: 50,
    marginBottom: responsiveHeight(3),
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  LogoImage: {
    width: responsiveWidth(80),
    height: responsiveHeight(28),
    resizeMode: "contain",
    marginTop: responsiveHeight(1),
    alignContent: "center",
    alignSelf: "center",
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(3),
  },

  loginContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  signUpText: {
    color: "blue",
  },

  signUpSen: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  imageUploadField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  ImageTextInput: {
    width: "60%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    color: "gray",
  },

  uploadButton: {
    width: "38%",
    height: "30%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    marginBottom: responsiveHeight(3),
    marginLeft: responsiveWidth(2),
  },

  uploadTxt: {
    color: "black",
    fontWeight: "bold",
  },
});
