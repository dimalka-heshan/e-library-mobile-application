import React, { useState } from "react";
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
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { Picker } from "@react-native-picker/picker";

const AddBlog = ({ navigation }) => {
  const route = useRoute();
  const navigate = useNavigation();

  //Async store token
  const [Token, setToken] = useState("");

  //   useEffect(() => {
  //     AsyncStorage.getItem("token").then((token) => {
  //       setToken(token);
  //     });
  //   }, []);

  //   console.log(Token);

  //UseStates
  const [blogTitle, setBlogTitle] = React.useState("");
  const [blogContent, setBlogContent] = React.useState("");
  const [blogImage, setBlogImage] = React.useState("");
  const [blogCategory, setBlogCategory] = React.useState("");
  const [blogReference, setBlogReference] = React.useState("");
  const [blogAuthor, setBlogAuthor] = React.useState("");
  const [blogAuthorImage, setBlogAuthorImage] = React.useState("");
  const [similarBooks, setSimilarBooks] = React.useState([
    {
      bookId: "",
      bookTitle: "",
      bookImage: "",
    },
  ]);

  const publishBlog = async () => {
    if (
      blogTitle === "" ||
      blogContent === "" ||
      blogImage === "" ||
      blogCategory === ""
    ) {
      alert("Please fill all the fields");
      return;
    } else if (blogTitle.length < 5) {
      alert("Blog Title should be atleast 5 characters long");
      return;
    } else if (blogTitle.length > 50) {
      alert("Blog Title should be less than 50 characters long");
      return;
    } else if (blogContent.length < 100) {
      alert("Blog Content should be atleast 100 characters long");
      return;
    } else if (blogContent.length > 10000) {
      alert("Blog Content should be less than 10000 characters long");
      return;
    } else {
      try {
        const data = {
          blogTitle: blogTitle,
          blogContent: blogContent,
          blogImage: blogImage,
          blogCategory: blogCategory,
          blogReference: blogReference,
          blogAuthor: blogAuthor,
          blogAuthorImage: blogAuthorImage,
          similarBooks: similarBooks,
        };
        console.log(data);

        axios
          .post("http://localhost:5000/api/blogs/add", data, {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert("Blog Published Successfully");
            navigate.push("AdminBlogs");
          })
          .catch((err) => {
            console.log(err);
            alert("Error Publishing Blog");
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [uploadStatus, setUploadStatus] = useState("Choose Blog Image");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color={COLORS.black}
          onPress={navigation.goBack}
        />
      </View>
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
                Publish Blog
              </Text>
            </View>
            <View style={style.loginContainer}>
              <TextInput
                style={style.textInput}
                placeholder="Blog Title"
                onChangeText={(text) => setBlogTitle(text)}
              />
              <TextInput
                style={style.textInput}
                placeholder="Category"
                onChangeText={(text) => setBlogCategory(text)}
              />
              <TextInput
                style={style.textArea}
                multiline={true}
                numberOfLines={10}
                placeholder="Blog Content"
                onChangeText={(text) => setBlogContent(text)}
              />
              <TextInput
                style={style.textArea}
                multiline={true}
                numberOfLines={10}
                onChangeText={(text) => setBlogReference(text)}
                placeholder="Add Reference Links (Optional)"
              />
              {/* <Picker
                selectedValue={blogCategory}
                style={style.textInput}
                onValueChange={(itemValue, itemIndex) =>
                  setBlogCategory(itemValue)
                }
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Technology" value="Technology" />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Health" value="Health" />
              </Picker> */}
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
                  onPress={publishBlog}
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
    paddingTop: 100,
  },
  header: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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

export default AddBlog;
