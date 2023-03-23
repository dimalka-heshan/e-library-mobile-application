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

const AddBlog = ({ navigation }) => {
  const body = new FormData();
  const route = useRoute();
  const navigate = useNavigation();

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

  //UseStates
  const [loading, setLoading] = React.useState(false);
  const [blogTitle, setBlogTitle] = React.useState("");
  const [blogContent, setBlogContent] = React.useState("");
  const [blogImage, setBlogImage] = React.useState({});
  const [blogCategory, setBlogCategory] = React.useState("");
  const [blogReference, setBlogReference] = React.useState("");
  const [blogAuthor, setBlogAuthor] = React.useState({});
  const [similarBooks, setSimilarBooks] = React.useState([]);
  const [imageUploadStatus, setImageUploadStatus] = useState(
    "Choose Blog Picture"
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

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
        mimeType: `
        ${result.assets[0].type}/jpg`,
        imageName: "image.jpg",
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
        console.log(JSON.stringify(err));
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getAllBooks();
  }, []);

  //Publish blog
  const publishBlog = async () => {
    body.append("blogTitle", blogTitle);
    body.append("blogContent", blogContent);
    body.append("blogImage", blogImage);
    body.append("blogCategory", blogCategory);
    body.append("blogReference", blogReference);
    body.append("similarBooks", similarBooks);

    console.log(JSON.stringify(body));
    await axios
      .post("/blog/createBlog", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        Alert.alert("Success", "Blog Published Successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("AdminBlogs"),
          },
        ]);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        if (err.response.status == 400) {
          if (err.response.data.message != "Data validation error!") {
            setLoading(false);
            setError(err.response.data.message);
          } else {
            setLoading(false);
            setValidationErrors(err.response.data.errors);
          }
        } else {
          setLoading(false);
          setError("Something went wrong!");
        }
      });

    // if (blogTitle.length < 5) {
    //   setError("Blog title should be at least 5 characters");
    //   return;
    // } else if (blogTitle.length > 25) {
    //   setError("Blog title should be less than 25 characters");
    //   return;
    // } else {
    //   setLoading(true);
    //   body.append("blogTitle", blogTitle);
    //   body.append("blogContent", blogContent);
    //   body.append("blogImage", blogImage);
    //   body.append("blogCategory", blogCategory);
    //   body.append("blogReference", blogReference);
    //   body.append("similarBooks", similarBooks);

    //   console.log(JSON.stringify(body));
    //   await axios
    //     .post("/blog/createBlog", body, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       setLoading(false);
    //       Alert.alert("Success", "Blog Published Successfully", [
    //         {
    //           text: "OK",
    //           onPress: () => navigation.navigate("AdminBlogs"),
    //         },
    //       ]);
    //     })
    //     .catch((err) => {
    //       console.log(JSON.stringify(err));
    //       if (err.response.status == 400) {
    //         if (err.response.data.message != "Data validation error!") {
    //           setLoading(false);
    //           setError(err.response.data.message);
    //         } else {
    //           setError("");
    //           setLoading(false);
    //           setValidationErrors(err.response.data.data);
    //         }
    //       } else {
    //         setLoading(false);
    //         setError("Something went wrong!");
    //       }
    //     });
    // }
  };
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
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        backgroundColor: "white",
                        borderRadius: 5,
                        gap: 10,
                        marginBottom: "9%",
                        marginLeft: "8%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.black,
                        }}
                      >
                        {item.bookName}
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

export default AddBlog;
