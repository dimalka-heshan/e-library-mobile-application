import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar
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

const UpdateFeedback = ({ navigation, route }) => {
  const rate = route.params;
  const [starRating, setStarRating] = useState(rate.rating);
  const [feedBack, setFeedBack] = useState(rate.feedback);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  AsyncStorage.getItem("token").then((token) => {
    setToken(token);
  });
  // console.log(rate._id);

  //update book
  const updateFeedbackuser = async () => {
    const body = {
      rating: starRating,
      feedback: feedBack,
    };
    // console.log(body);

    try {
      await axios
        .patch(`/feedback/updateFeedback/${rate._id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          Alert.alert("Success", "Feedback Updated Successfully", [
            {
              text: "OK",
              onPress: () => navigation.push("BookFeedback", rate.book),
            },
          ]);
        })
        .catch((err) => {
          if (err.response.status == 400) {
            if (err.response.data.message != "Data validation error!") {
              setError(err.response.data.message);
            } else {
              setError("");
              setValidationErrors(err.response.data.data);
            }
          } else {
            setError("Something went wrong!");
          }
        });
    } catch (err) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={{ flex: 6 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{height:300}}
        source={{
          uri: "https://i0.wp.com/ketto.blog/wp-content/uploads/2021/09/shutterstock_1100033681-min-1.jpg?fit=5000%2C2813&ssl=1",
        }}
      >
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>

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
            value={feedBack}
            onChangeText={(text) => setFeedBack(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={updateFeedbackuser}
            >
              <Text style={styles.submitButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateFeedback;

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
