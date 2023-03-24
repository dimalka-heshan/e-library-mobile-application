import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const BookScreen = ({ navigation, route }) => {
  const [book, setBook] = useState(route.params);

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={style.imageContainer}>
        <Image source={{ uri: book.bookBanner }} style={style.bookImage} />
      </View>

      <View style={style.detailsContainer}>
        <View>
          <View>
            <View style={style.bookNameContainer}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginTop: "2%",
                  width: "80%",
                }}
              >
                {book.bookName}
              </Text>
              <View
                style={{
                  width: "20%",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={style.downloadButton}
                  onPress={() => {
                    Linking.openURL(book.eBook);
                  }}
                >
                  <Icon name="file-download" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "gray",
                  marginTop: 1,
                }}
              >
                {book.bookAuthor}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.push("BookFeedback", book._id)}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: COLORS.blue,
                    marginTop: 1,
                  }}
                >
                  {"View Feedback >>"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingHorizontal: 20,
              marginTop: "5%",
            }}
          >
            About
          </Text>
          <ScrollView
            style={{
              width: "100%",
              height: responsiveHeight(20),
              marginTop: "2%",
            }}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 16,
                  lineHeight: 22,
                  marginTop: 10,
                }}
              >
                {book.bookDescription}
              </Text>
            </View>
          </ScrollView>
          <Text
            style={{
              fontSize: 14,
              marginTop: "2%",
              paddingHorizontal: 20,
              fontWeight: "bold",
            }}
          >
            {book.bookCategories ? (
              <Text>Book Categories : {book.bookCategories.join(", ")}</Text>
            ) : (
              ""
            )}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookScreen;

const style = StyleSheet.create({
  header: {
    paddingHorizontal: "5%",
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageContainer: {
    width: "100%",
    height: "37%",
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },

  bookImage: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },

  detailsContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginTop: "5%",
  },

  downloadButton: {
    backgroundColor: COLORS.blue,
    padding: "15%",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },

  bookNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
});
