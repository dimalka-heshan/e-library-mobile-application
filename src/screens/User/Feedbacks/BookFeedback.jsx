import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useRef, useState, useEffect } from "react";
import COLORS from "../../../constants/color";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const book = {
  id: 1,
  name: "Game Of Thrones The Dance Of Dragons",
};

const mycomment = {
  id: 1,
  rating: "5",
  name: "Ravindu sandeepana",
  date: "January 1, 2020",
  comment:
    "Ravindu mycommentt, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
};

const posts = [
  {
    id: 1,
    rating: "5",
    name: "Ravindu sandeepana",
    date: "January 1, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 2,
    rating: "3",
    name: "Nimna thiranjaya",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 3,
    rating: "1",
    name: "Dimalka heshan",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 4,
    rating: "5",
    name: "hasith damsara",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 5,
    rating: "3",
    name: "Ravindu",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
];

const BookFeedback = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState("");
  // const [bookID, setBookID] = useState(route.params);

  const book = route.params;
  const [token, setToken] = React.useState("");
  AsyncStorage.getItem("token").then((token) => {
    setToken(token);
  });
  const [user, setUser] = React.useState("");

  const getUserDetails = () => {
    setLoading(true);
    axios
      .get("/user/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data.user);
        // console.log(res.data.user.firstName);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  

  const getAllFeedbacks = async () => {
    setLoading(true);

    await axios
      .get(`/feedback/getFeedbacks/${book}`)
      .then((res) => {
        

        setLoading(false);
        setFeedbacks(res.data.feedbacks);
        // console.log(res.data.feedbacks._id);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status == 400) {
          if (err.response.data.message != "Data validation error!") {
            setError(err.response.data.message);
          } else {
            setValidationErrors(err.response.data.data);
          }
        } else {
          setError("Something went wrong!");
        }
      });
  };

  //delete feedback
  const deletefeedback = async (id) => {
    setLoading(true);
    await axios
      .delete(`/feedback/deleteFeedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        Alert.alert("Success", "Feedback deleted successfully", [
          {
            text: "OK",
            onPress: () => navigation.push("BookFeedback", book),
          },
        ]);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllFeedbacks();
    getUserDetails();
  }, [token]);

  // console.log(feedbacks);

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.light,
      }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>

      <Text
        style={{
          fontSize: 30,
          marginLeft: "30%",
          fontWeight: "bold",
          marginTop: "2%",
          marginBottom: "1%",
          width: "100%",
          color: COLORS.blue,
          fontWeight: "bold",
        }}
      >
        User Feedbacks
      </Text>

      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.push("CreateFeedback", book)}
          style={style.getStartedButton}
        >
          <Text style={style.buttonText}>Add Feedback</Text>
          <Icon name="edit" size={27} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {feedbacks.map((post) => (
          <TouchableOpacity key={post._id} style={style.post}>
            <View style={style.postContent}>
              <Text style={style.postTitle}>
                User - {user.fullName}
                <Icon
                  justifyContent="flex-end"
                  name="star"
                  size={responsiveFontSize(4)}
                  color="#ffb300"
                />
                {post.rating}/5
              </Text>
              {post.user._id === user._id ? (
                <View
                  style={{
                    width: "10%",
                    marginLeft: "77%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                  onPress={() => {
                    navigation.push("UpdateFeedback",post);
                  }}>
                    <Icon name="edit" size={35} color={COLORS.blue} />
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: "30%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Delete Book",
                          "Are you sure you want to delete your feedback?",
                          [
                            {
                              text: "OK",
                              onPress: () => deletefeedback(post._id),
                            },
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                            },
                          ]
                        );
                      }}
                    >
                      <Icon name="delete" size={35} color={COLORS.red} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <Text style={style.postMeta}>| {post.createdAt}</Text>
              <Text style={style.postExcerpt}>{post.feedback}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookFeedback;

const style = StyleSheet.create({
  header: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  post: {
    marginTop: "-1%",
    marginBottom: 20,
    backgroundColor: "#E5E4E2",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },

  postContent: {
    marginTop: "0%",
    padding: 20,
  },
  postTitle: {
    fontSize: 20,
    width: "80%",
    fontWeight: "bold",
    marginBottom: 10,
  },
  postMeta: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  postExcerpt: {
    fontSize: 14,
  },
  title: {
    marginTop: 40,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    marginLeft: 20,
  },

  mypost: {
    marginBottom: 20,
    backgroundColor: "#E5E4E2",
    height: 250,
    marginTop: -75,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  buttonContainer: {
    width: "100%",
    height: "16%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginLeft: 5,
  },
  getStartedButton: {
    width: responsiveWidth(55),
    height: responsiveHeight(6),
    backgroundColor: COLORS.green,
    borderRadius: 15,
    marginRight: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: responsiveHeight(-5),
    maxWidth: 200,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },

  editButton: {
    justifyContent: "space-around",
    alignItems: "baseline",
  },

  deleteButton: {
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
