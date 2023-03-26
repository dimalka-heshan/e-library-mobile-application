import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
// import TimeAgo from "react-native-timeago";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { Video } from "expo-av";
// import { YoutubePlayer } from "react-native-youtube-iframe";
// import { VideoPlayer } from "react-native-video";
import truncate from "truncate";
import COLORS from "../../../constants/color";

const AdminBlogContent = ({ navigation, route }) => {
  const allBlogs = route.params;

  const [token, setToken] = React.useState("");
  //Get token from local storage
  AsyncStorage.getItem("token").then((token) => {
    setToken(token);
  });
  //Delete blog from the database
  const deleteBlog = () => {
    axios
      .delete(`/blog/deleteBlog/${allBlogs._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        Alert.alert("Success", "Blog deleted successfully", [
          { text: "OK", onPress: () => navigation.push("AdminBlogs") },
        ]);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 0.7, height: 400 }}
        source={{
          uri: allBlogs.blogImage,
        }}
      >
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          {/* <Icon name="more-vert" size={28} color={COLORS.white} /> */}
        </View>
        <View style={style.imageDetails}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <Text
              style={{
                width: "100%",
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.white,
                marginBottom: 20,
              }}
            >
              {allBlogs.blogTitle}
            </Text>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              style={{ height: 25, width: 25, borderRadius: 25 }}
              source={{
                uri: allBlogs.blogAuthor.picture,
              }}
            />
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "normal",
                fontSize: 16,
              }}
            >
              {allBlogs.blogAuthor.fullName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="timer" size={16} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {moment(allBlogs.publishedOn).fromNow()}
              </Text>
            </View>
          </View>

          {/* Edit delete buttons */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.push("EditBlog", allBlogs)}
                style={{
                  backgroundColor: COLORS.grey,
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Icon name="edit" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Delete",
                    "Are you sure want to delete this blog?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => deleteBlog(),
                      },
                    ]
                  )
                }
                style={{
                  backgroundColor: COLORS.grey,
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Icon name="delete" size={20} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        style={style.detailsContainer}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 200,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              lineHeight: 22,
              textAlign: "justify",
            }}
          >
            {allBlogs.blogContent}
          </Text>

          {/* Link references: */}
          {allBlogs.blogReference ? (
            <View
              style={{
                marginTop: 20,
                lineHeight: 22,
                textAlign: "justify",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>References:</Text>
              <View>
                <Text
                  style={{ color: "blue" }}
                  onPress={() => {
                    Linking.openURL(allBlogs.blogReference);
                  }}
                >
                  {allBlogs.blogReference}
                </Text>
              </View>
            </View>
          ) : null}

          {allBlogs.similarBooks.length > 0 ? (
            <View>
              <Text
                style={
                  style.sectionTitle && {
                    top: 20,
                    fontSize: 14,
                    fontWeight: "bold",
                  }
                }
              >
                Similar Books
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={style.categoryContainer}>
                  {allBlogs.similarBooks.map((category, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Image
                        style={
                          style.iconContainer && {
                            width: 100,
                            height: 150,
                            borderRadius: 10,
                            objectFit: "cover",
                          }
                        }
                        source={{
                          uri: category.bookBanner,
                        }}
                      />

                      <Text
                        style={{
                          color: COLORS.dark,
                          fontSize: 10,
                          fontWeight: "bold",
                          marginTop: 5,
                          textAlign: "center",
                          letterSpacing: 1,
                          width: 100,
                          flexWrap: "wrap",
                        }}
                      >
                        {truncate(category.bookName, 40)}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -20,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 100,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  categoryContainer: {
    marginTop: 35,
    flexDirection: "row",
    gap: 20,
  },
});

export default AdminBlogContent;
