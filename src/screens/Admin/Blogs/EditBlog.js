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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { MultiSelect } from "react-native-element-dropdown";
import axios from "axios";
import truncate from "truncate";

const EditBlog = ({ navigation, route }) => {
  const allBlogs = route.params;
  const navigate = useNavigation();

  const body = new FormData();

  const [token, setToken] = React.useState("");
  //Get token from local storage
  AsyncStorage.getItem("token").then((token) => {
    setToken(token);
  });

  //For Multiple selection
  const renderItem = (item) => {
    return (
      <View style={style.item}>
        <Text>{item.bookName}</Text>
      </View>
    );
  };

  //UseStates for updated blog
  const [loading, setLoading] = React.useState(false);
  const [blogTitle, setBlogTitle] = React.useState(allBlogs.blogTitle);
  const [blogContent, setBlogContent] = React.useState(allBlogs.blogContent);
  const [blogImage, setBlogImage] = React.useState(allBlogs.blogImage);
  const [blogCategory, setBlogCategory] = React.useState(allBlogs.blogCategory);
  const [blogReference, setBlogReference] = React.useState(
    allBlogs.blogReference
  );
  const [imageUploadStatus, setImageUploadStatus] = useState(
    "Choose Blog Picture"
  );
  const [selectedItems, setSelectedItems] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

  const filterSimilarBooks = (item) => {
    let temp = [];
    for (let i = 0; i < allBlogs.similarBooks.length; i++) {
      temp.push(allBlogs.similarBooks[i]._id);
    }
    setSelectedItems(temp);
  };

  //for Image upload
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setBlogImage({
        uri: result.assets[0].uri,
        name: "image.jpg",
        mimetype: "image/jpeg",
      });
      setImageUploadStatus("Blog Image Uploaded");
    } else {
      setBlogImage(null);
      setImageUploadStatus("Choose Blog Image");
    }
  };

  //Get all books from database
  const [books, setBooks] = React.useState([]);

  const getAllBooks = () => {
    setLoading(true);
    axios
      .get("/book/getAllBooks")
      .then((res) => {
        setBooks(res.data.filteredBooks);
        setLoading(false);
      }, 1000)
      .catch((err) => {
        // console.log(JSON.stringify(err));
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getAllBooks();
    filterSimilarBooks();
  }, []);

  //Publish blog
  const publishBlog = async () => {
    setError("");
    body.append("blogTitle", blogTitle);
    body.append("blogContent", blogContent);
    body.append("blogBanner", blogImage);
    body.append("blogCategory", blogCategory);
    body.append("blogReference", blogReference);

    if (selectedItems.length > 0) {
      for (let i = 0; i < selectedItems.length; i++) {
        body.append(`similarBooks[${i}]`, selectedItems[i]);
      }
    }

    await axios
      .patch(`/blog/updateBlog/${allBlogs._id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        Alert.alert("Success", "Blog Updated Successfully", [
          {
            text: "OK",
            onPress: () => navigate.push("AdminBlogs"),
          },
        ]);
      })
      .catch((err) => {
        // console.log(JSON.stringify(err.response));
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color={COLORS.white}
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
                <Icon name="article" size={28} color={COLORS.primary} />
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.primary,
                  letterSpacing: 1,
                }}
              >
                Update Blog
              </Text>
            </View>
            <View style={style.loginContainer}>
              <TextInput
                style={style.textInput}
                placeholder="Blog Title"
                value={blogTitle}
                onChangeText={(text) => setBlogTitle(text)}
              />
              {validationErrors.blogTitle ? (
                <Text style={style.errorText}>
                  {validationErrors.blogTitle}
                </Text>
              ) : (
                ""
              )}
              <TextInput
                style={style.textInput}
                placeholder="Category"
                value={blogCategory}
                onChangeText={(text) => setBlogCategory(text)}
              />
              <TextInput
                style={style.textArea}
                multiline={true}
                numberOfLines={10}
                value={blogContent}
                placeholder="Blog Content"
                onChangeText={(text) => setBlogContent(text)}
              />
              <TextInput
                style={style.textArea}
                value={blogReference}
                multiline={true}
                numberOfLines={10}
                onChangeText={(text) => setBlogReference(text)}
                placeholder="Add Reference Links (Optional)"
              />
              <MultiSelect
                style={style.textInput}
                placeholderStyle={{
                  fontSize: 14,
                  color: "grey",
                }}
                search
                data={books}
                labelField="bookName"
                valueField="_id"
                placeholder="Select Similar Books"
                searchPlaceholder="Search Books"
                value={selectedItems}
                onChange={(item) => {
                  setSelectedItems(item);
                }}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity
                    onPress={() => unSelect && unSelect(item)}
                    key={item}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        backgroundColor: COLORS.grey,
                        borderRadius: 5,
                        gap: 10,
                        marginBottom: 20,
                        marginRight: "5%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.black,
                        }}
                      >
                        {truncate(item.bookName, 10)}
                      </Text>
                      <Icon name="delete" size={20} color="red" />
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={style.imageUploadField}>
                <TextInput
                  style={style.ImageTextInput}
                  placeholder="Choose File"
                  editable={false}
                  selectTextOnFocus={false}
                  value={imageUploadStatus}
                />

                <TouchableOpacity
                  style={style.uploadButton}
                  onPress={pickImage}
                >
                  <Text style={style.uploadTxt}>Upload</Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "red",
                    borderRadius: 10,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",

                    top: -20,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                  >
                    {error}
                  </Text>
                </View>
              ) : (
                ""
              )}
              <View style={style.buttonContainer}>
                <TouchableOpacity
                  onPress={publishBlog}
                  style={style.loginButton}
                >
                  <Text style={style.loginButtonText}>Update & Publish</Text>
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
    backgroundColor: COLORS.white,
    flex: 0.3,
    paddingTop: 50,
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
    marginBottom: 75,
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
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
  },
  textArea: {
    width: "100%",
    height: 150,
    borderColor: COLORS.primary,
    borderWidth: 1,
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
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "gray",
  },

  uploadButton: {
    width: "35%",
    height: "30%",
    backgroundColor: COLORS.primary,
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
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    width: "100%",
    marginLeft: "3%",
    color: "red",
    marginTop: "-4%",
    marginBottom: "3%",
    fontSize: 12,
    textAlign: "left",
  },
});

export default EditBlog;
