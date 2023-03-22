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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../../constants/color";
import TempBooks from "../../../constants/book";

const AllBookScreen = ({ navigation }) => {
  return (
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
        <View style={{ flexDirection: "row", padding: "3%" }}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={25} style={{ marginLeft: 20 }} />
            <TextInput placeholder="Search" style={styles.input} />
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          marginTop: "5%",
        }}
      >
        <View style={styles.container}>
          {TempBooks.map((book) => (
            <View key={book.id} style={styles.bookContainer}>
              <Image source={book.img} style={styles.bookImage} />
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  marginLeft: "5%",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {book.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "gray",
                    marginTop: 1,
                  }}
                >
                  {book.price}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  width: "25%",
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                  marginLeft: "5%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("UpdateBookScreen");
                  }}
                >
                  <Icon name="edit" size={28} color={COLORS.blue} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Icon
                    name="delete"
                    size={28}
                    color="red"
                    style={{
                      marginLeft: "5%",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={() => navigation.push("AddBookScreen")}>
            <Icon name="add" size={30} style={{ marginLeft: "80%" }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllBookScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "5%",
    paddingBottom: 200,
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
    width: "100%",
    height: responsiveHeight(11),
    backgroundColor: COLORS.white,
    marginBottom: "5%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  bookImage: {
    width: "15%",
    height: "80%",
    resizeMode: "contain",
    borderRadius: 15,
    alignContent: "center",
    alignSelf: "center",
    marginLeft: "5%",
  },

  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
    marginLeft: 10,
  },
});
