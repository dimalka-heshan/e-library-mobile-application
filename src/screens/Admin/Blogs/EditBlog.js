import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";

const EditBlog = ({ navigation }) => {
  const [uploadStatus, setUploadStatus] = useState("Choose Blog Image");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={style.header}>
          <Icon name="arrow-back-ios-ios" size={28} color={COLORS.black} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 100,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            height: "200%",
            width: "100%",
            resizeMode: "contain",
            marginTop: 30,
          }}
          source={{
            uri: "https://res.cloudinary.com/desnqqj6a/image/upload/v1679500731/Typing-bro_xchvsf.png",
          }}
        />
      </View>

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
          <View style={style.textInputContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                gap: 5,
              }}
            >
              <View>
                <Icon name="article" size={28} color={COLORS.white} />
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.white,

                  letterSpacing: 1,
                }}
              >
                Update Blog
              </Text>
            </View>
            <View style={style.loginContainer}>
              <TextInput style={style.textInput} placeholder="Blog Title" />
              <TextInput style={style.textInput} placeholder="Category" />
              <TextInput
                style={style.textArea}
                multiline={true}
                numberOfLines={10}
                placeholder="Blog Content"
              />
              <View style={style.imageUploadField}>
                <TextInput
                  style={style.ImageTextInput}
                  placeholder="Choose File"
                  editable={false}
                  selectTextOnFocus={false}
                  value={uploadStatus}
                />
                <TouchableOpacity style={style.uploadButton}>
                  <Text style={style.uploadTxt}>Upload</Text>
                </TouchableOpacity>
              </View>

              <View style={style.buttonContainer}>
                <TouchableOpacity
                  //   onPress={() => navigation.push("UserTabs")}
                  style={style.loginButton}
                >
                  <Text style={style.loginButtonText}>Publish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    top: 75,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
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
  textInputContainer: {
    flex: 2,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  loginButton: {
    width: "100%",
    height: "30%",
    backgroundColor: "#4BB543",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    marginBottom: 30,
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  loginContainer: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -25,
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
  },
  textArea: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
    textAlignVertical: "top",
    paddingTop: 10,
    textAlign: "justify",
  },

  imageUploadField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  ImageTextInput: {
    width: "60%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    color: "gray",
  },

  uploadButton: {
    width: "35%",
    height: "30%",
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    marginBottom: 30,
    marginLeft: 10,
  },

  uploadTxt: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditBlog;
