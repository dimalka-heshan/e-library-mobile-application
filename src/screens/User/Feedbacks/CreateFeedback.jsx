import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StatusBar,
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import COLORS from "../../../constants/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateFeedback = ({ navigation, route }) => {
  const book = route.params;
  const [starRating, setStarRating] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  AsyncStorage.getItem("token").then((token) => {
    setToken(token);
  });

  const PublishFeedback = async () => {
    const newFeedback = {
      rating: starRating,
      feedback: feedBack,
    };

    await axios
      .post(`/feedback/createFeedback/${book}`, newFeedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Alert.alert("success", "Feedback created successfully", [
          {
            text: "OK",
            onPress: () => navigation.push("BookFeedback", book),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 6 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{height:300}}
        source={{
          uri: "https://cdn.shrm.org/image/upload/c_crop,h_768,w_1366,x_0,y_0/c_fit,f_auto,q_auto,w_767/v1/People%20Managers/Honest_Feedback_photo_fcxcie?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjAsIngyIjoxMzY2LCJ5MiI6NzY4LCJ3IjoxMzY2LCJoIjo3Njh9fQ%3D%3D",
        }}
      >
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>

      {/* <View>
        <Text
          style={{
            fontSize: 27,
            color: COLORS.white,
            fontWeight: "bold",
            marginLeft: "3%",
            marginTop: "1%",
            justifyContent: "center",
          }}
        >
          Create your Feedback
        </Text>
      </View> */}
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.heading}>
          {starRating ? `${starRating}*` : "Tap to rate"}
        </Text>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => setStarRating(1)}>
            <MaterialIcons
              name={starRating >= 1 ? "star" : "star-border"}
              size={60}
              style={
                starRating >= 1 ? styles.starSelected : styles.starUnselected
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(2)}>
            <MaterialIcons
              name={starRating >= 2 ? "star" : "star-border"}
              size={60}
              style={
                starRating >= 2 ? styles.starSelected : styles.starUnselected
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(3)}>
            <MaterialIcons
              name={starRating >= 3 ? "star" : "star-border"}
              size={60}
              style={
                starRating >= 3 ? styles.starSelected : styles.starUnselected
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(4)}>
            <MaterialIcons
              name={starRating >= 4 ? "star" : "star-border"}
              size={60}
              style={
                starRating >= 4 ? styles.starSelected : styles.starUnselected
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(5)}>
            <MaterialIcons
              name={starRating >= 5 ? "star" : "star-border"}
              size={60}
              style={
                starRating >= 5 ? styles.starSelected : styles.starUnselected
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Enter your Feedback"
            multiline={true}
            numberOfLines={20}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onChangeText={(text) => setFeedBack(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={PublishFeedback}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateFeedback;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container: {
    flex: 2,
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: "5%",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },

  starSelected: {
    color: "#ffb300",
  },
  textInputContainer: {
    flex: 4,
    width: "80%",
    height: "50%",
    alignSelf: "center",
    marginTop: responsiveHeight(-5),
  },
  loginContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "102%",
    marginTop: responsiveHeight(1),
    height: 150,
    backgroundColor: "#99FFFF",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "15%",
  },
  submitButton: {
    width: 220,
    height: "30%",
    backgroundColor: COLORS.green,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    minHeight: 50,
    marginBottom: responsiveHeight(5),
  },

  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 27,
  },
  textArea: {
    width: "100%",
    height: 200,
    backgroundColor: "white",
    padding: 10,
    marginBottom: "5%",
    textAlignVertical: "top",

    borderRadius: 10,
  },
});
