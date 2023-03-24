import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";
import moment from "moment";

export default function Profile({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");

    navigation.push("LoginScreen");
  };

  const GetUserProfile = async () => {
    setLoading(true);
    await axios
      .get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data.user);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  AsyncStorage.getItem("token").then((value) => {
    setToken(value);
  });

  useEffect(() => {
    GetUserProfile();
  }, [token]);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYFlT2BiplnqkNNGKteYvvI_mIIrnDdapFxg&usqp=CAU",
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View style={styles.header}>
            <Icon
              name="arrow-back-ios"
              size={28}
              color={COLORS.white}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={styles.imageContainer}>
            <Image source={{ uri: user.picture }} style={styles.image} />
            <View style={styles.activeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="circle" size={18} color="#4bb543" />
                <Text
                  style={{
                    color: COLORS.white,
                    marginLeft: 6,
                  }}
                >
                  Active
                </Text>
              </View>
              <Text
                style={{
                  color: COLORS.white,
                  marginTop: 5,
                }}
              >
                Created At : {moment(user.createdAt).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <ScrollView
              style={{
                marginTop: "3%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: "1%",
                  width: "80%",
                }}
              >
                Full Name
              </Text>
              <TextInput
                style={styles.textInput}
                value={user.fullName}
                editable={false}
              />

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: "1%",
                  width: "80%",
                }}
              >
                Email
              </Text>
              <TextInput
                style={styles.textInput}
                value={user.email}
                editable={false}
              />
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  backgroundColor: COLORS.blue,
                  width: "100%",
                  height: 50,
                  marginTop: responsiveHeight(2),
                  borderRadius: 10,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
              <View style={{ paddingBottom: 100 }}></View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
      {loading ? <CustomLoading /> : ""}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  imageContainer: {
    width: "100%",
    height: "45%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: COLORS.grey,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: "10%",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: COLORS.white,
    marginBottom: 15,
  },
  header: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: "5%",
    color: "black",
    fontSize: 16,
  },
  activeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
