import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import COLORS from "../../../constants/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MaterialIcons } from '@expo/vector-icons';
import {
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";
import { TextInput } from 'react-native';
import axios from 'axios';
  


// const createFeedback = ({navigation}) => {
//   const body = new FormData();
//   const { bookID } = route.params;
//     const [starRating, setStarRating] = useState(null);
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = useState("");


//   const publishFeedback = async () => {
//     setLoading(true);
//     setError("");

//     const body = new FormData();
//     body.append("feedback", feedback);
//     body.append("rating", rating);

//     await axios
//       .post("feedback/createFeedback/${bookID}", body, {
//         headers: {
//           "Contest-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         setLoading(false);
//         Alert.alert("Success", "Feedback Published Successfully", [
//           {
//             text: "OK",
//             onPress: () => navigation.push("BookFeedback"),
//           },
//         ]);
//       })
//       .catch((err) => {
//         setLoading(false);
//         if (err.response.status == 400) {
//           if (err.response.data.message != "Data validation error!") {
//             setError(err.response.data.message);
//           } else {
//             setValidationErrors(err.response.data.data);
//           }
//         } else {
//           setError("Something went wrong!");
//         }
//       });
//   };


  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>

      <View>
        <Text
          style={{
            fontSize: 27,
            color: COLORS.blue,
            fontWeight: "bold",
            marginLeft: "3%",
            marginTop: "1%",
            justifyContent: "center",
          }}
        >
          Create your Feedback
        </Text>
      </View>

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
          <TextInput style={styles.textInput} placeholder="Your Feedback" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={publishFeedback}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default createFeedback;


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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop:"5%"
      },
      heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      stars: {
        display: 'flex',
        flexDirection: 'row',
      },
      starUnselected: {
        color: '#aaa',
      },

      starSelected: {
        color: '#ffb300',
      },
      textInputContainer: {
        flex: 4,
        width: "80%",
        height: "50%",
        alignSelf: "center",
        marginTop: responsiveHeight(-5),
        backgroundColor: "white"
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
        fontSize: 27
      },
    
})