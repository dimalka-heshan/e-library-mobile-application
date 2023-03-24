import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../../constants/color";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";
import truncate from "truncate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AllBookScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState("");

  AsyncStorage.getItem("token").then((value) => {
    setToken(value);
  });

  const GetBooks = async () => {
    setLoading(true);
    await axios
      .get("/book/getAllBooks/?category=")
      .then((res) => {
        setBooks(res.data.filteredBooks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const filterData = (books, searchKey) => {
    const result = books.filter(
      (book) =>
        book.bookName.toLowerCase().includes(searchKey) ||
        book.bookAuthor.toLowerCase().includes(searchKey)
    );
    setBooks(result);
  };

  const onSearch = async (e) => {
    await axios
      .get(`/book/getAllBooks/?category=`)
      .then((res) => {
        filterData(res.data.filteredBooks, e.toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete book
  const deleteBook = async (id) => {
    setLoading(true);
    await axios
      .delete(`/book/deleteBook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        Alert.alert("Success", "Book deleted successfully", [
          {
            text: "OK",
            onPress: () => navigation.push("AllBookScreen"),
          },
        ]);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    GetBooks();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          marginBottom: 80,
        }}
      >
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: "8%",
            height: "8%",
          }}
        >
          <Text style={styles.header}>Books</Text>
        </View>

        <View
          style={{
            width: "100%",
            height: "8%",
            paddingLeft: "2.5%",
            paddingRight: "2.5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: "3%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.searchContainer}>
              <Icon name="search" size={25} style={{ marginLeft: 20 }} />
              <TextInput
                placeholder="Search"
                style={styles.input}
                onChangeText={(text) => onSearch(text)}
              />
            </View>

            <TouchableOpacity
              style={styles.addIcon}
              onPress={() => navigation.push("AddBookScreen")}
            >
              <Icon
                name="add"
                size={28}
                style={{
                  color: COLORS.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            marginTop: "5%",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {books.map((book) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("OneBookScreen", book);
                }}
                key={book._id}
              >
                <View key={book._id} style={styles.bookContainer}>
                  <Image
                    source={{ uri: book.bookBanner }}
                    style={styles.bookImage}
                  />
                  <View
                    style={{
                      width: "100%",
                      marginTop: "10%",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5%",
                      minHeight: 75,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        letterSpacing: 0.4,
                        textAlign: "center",
                        lineHeight: 20,
                      }}
                    >
                      {truncate(book.bookName, 25)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "gray",
                        marginTop: 5,
                      }}
                    >
                      {truncate(book.bookAuthor, 20)}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push("UpdateBookScreen", book);
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: COLORS.grey,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name="edit"
                        size={18}
                        color={COLORS.primary}
                        style={{
                          position: "absolute",
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Delete Book",
                          "Are you sure you want to delete this book?",
                          [
                            {
                              text: "OK",
                              onPress: () => deleteBook(book._id),
                            },
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                            },
                          ]
                        );
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: COLORS.grey,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name="delete"
                        size={20}
                        color="red"
                        style={{
                          marginLeft: "5%",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? <CustomLoading /> : ""}
    </>
  );
};

export default AllBookScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 200,
    justifyContent: "space-evenly",
    gap: 10,
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "6%",
  },

  arrowHeader: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bookContainer: {
    width: responsiveWidth(40),
    height: responsiveHeight(32),
    backgroundColor: COLORS.white,
    marginBottom: "2%",
    borderRadius: 10,
    flexDirection: "column",
  },

  bookImage: {
    width: "80%",
    height: "50%",
    top: "5%",
    borderRadius: 15,
    alignContent: "center",
    alignSelf: "center",
    padding: 20,
  },

  searchContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },

  addIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
    marginLeft: 10,
  },
});
