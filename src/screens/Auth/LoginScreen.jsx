import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../constants/color";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//images
import Login from "../../assets/images/Login.png";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInout";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        AsyncStorage.getItem("role").then((role) => {
          if (role === "admin") {
            navigation.push("AdminTabs");
          } else if (role === "user") {
            navigation.push("UserTabs");
          }
        });
      }
    });
  }, []);

  // Login Function
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    await axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.role === "admin") {
          AsyncStorage.setItem("token", res.data.token);
          AsyncStorage.setItem("role", res.data.role);
          setLoading(false);
          navigation.push("AdminTabs");
        } else if (res.data.role === "user") {
          AsyncStorage.setItem("token", res.data.token);
          AsyncStorage.setItem("role", res.data.role);
          setLoading(false);
          navigation.push("UserTabs");
        } else {
          setLoading(false);
          setError("Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
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
              <CustomTextInput placeholder="Email" onChangeText={setEmail} />

              <CustomTextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
              />

              {error ? (
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "red",
                    borderRadius: 10,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                  >
                    {error}
                  </Text>
                </View>
              ) : (
                ""
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleLogin}
                  style={styles.loginButton}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
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
    height: responsiveHeight(35),
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
