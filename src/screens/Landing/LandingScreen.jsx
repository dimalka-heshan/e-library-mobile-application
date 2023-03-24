import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
const newLocal = "";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
import COLORS from "../../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

//images
const Logo = require("../../assets/images/Logo.png");

const LandingScreen = () => {
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.LogoImage} />
      <Text style={styles.landingText}>
        Osprey is a mobile e-library that offers users a wide range of digital
        books, magazines, and publications to browse and download. With an
        easy-to-use interface, Osprey allows users to access their digital
        library from anywhere and at any time. Whether looking for fiction or
        non-fiction, academic or professional resources, Osprey has something
        for everyone. It is an innovative and user-friendly platform that helps
        readers expand their knowledge and reading horizons.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.push("LoginScreen")}
          style={styles.getStartedButton}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Icon
            name="arrow-circle-right"
            size={responsiveFontSize(3)}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },

  LogoImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(35),
    resizeMode: "contain",
    marginBottom: responsiveHeight(3),
  },

  buttonContainer: {
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },

  getStartedButton: {
    width: responsiveWidth(40),
    height: responsiveHeight(6),
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: responsiveHeight(4),
    maxWidth: 200,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },

  landingText: {
    width: "88%",
    textAlign: "center",
    fontSize: 17,
    marginBottom: responsiveHeight(2),
  },
});
