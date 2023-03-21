import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../constants/color";

//images
import Login from "../../assets/images/Login.png";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View>
            <Image source={Login} style={styles.LogoImage} />
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.header}>Login</Text>
            <View style={styles.loginContainer}>
              <TextInput style={styles.textInput} placeholder="Email" />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => navigation.push("UserTabs")}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.signUpSen}>
                New to Osprey Library?{"  "}
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.push("SignUpScreen")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

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
    marginTop: responsiveHeight(3),
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
    height: responsiveHeight(39),
    resizeMode: "contain",
    marginTop: responsiveHeight(8),
    alignContent: "center",
    alignSelf: "center",
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: responsiveHeight(3),
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
});
