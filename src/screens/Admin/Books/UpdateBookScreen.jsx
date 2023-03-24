import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../../constants/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInout";
import bookCategory from "../../../constants/bookCategory";
import { MultiSelect } from "react-native-element-dropdown";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";
const UpdateBookScreen = ({ navigation, route }) => {
  const [bookId, setBookId] = useState(route.params._id);
  const [bookName, setBookName] = useState(route.params.bookName);
  const [bookAuthor, setBookAuthor] = useState(route.params.bookAuthor);
  const [bookDescription, setBookDescription] = useState(
    route.params.bookDescription
  );
  const [bookImage, setBookImage] = useState({});
  const [imageUploadStatus, setImageUploadStatus] = useState(
    "Choose Book Picture"
  );
  const [eBookFile, setEBookFile] = useState({});
  const [selectedItems, setSelectedItems] = useState(
    route.params.bookCategories
  );
  const [pdfUploadStatus, setPdfUploadStatus] = useState("Choose E-Book File");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  AsyncStorage.getItem("token").then((value) => {
    setToken(value);
  });

  //For Multiple selection
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  //for PDF upload
  const selectFile = async () => {
    try {
      //allow only pdf
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setEBookFile({
          uri: result.uri,
          mimeType: "application/pdf",
          name: "file.pdf",
        });
        setPdfUploadStatus("E-Book File Uploaded");
      } else {
        setEBookFile({});
        setPdfUploadStatus("Choose E-Book File");
      }
    } catch (e) {
      console.log(e);
    }
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
      setBookImage({
        uri: result.assets[0].uri,
        mimeType: "image/jpeg",
        name: "image.jpg",
      });
      setImageUploadStatus("Book Picture Uploaded");
    } else {
      setBookImage({});
      setImageUploadStatus("Choose Book Picture");
    }
  };

  //update book
  const updateBook = async () => {
    setLoading(true);
    setError("");
    setValidationErrors({});
    const body = new FormData();
    body.append("bookId", bookId);
    body.append("bookName", bookName);
    body.append("bookAuthor", bookAuthor);
    body.append("bookDescription", bookDescription);

    for (var i = 0; i < selectedItems.length; i++) {
      body.append(`bookCategories[${i}]`, selectedItems[i]);
    }

    if (bookImage) {
      body.append("files", bookImage);
    }
    if (eBookFile) {
      body.append("files", eBookFile);
    }

    try {
      await axios
        .patch(`/book/updateBook/${bookId}`, body, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          Alert.alert("Success", "Book Updated Successfully", [
            {
              text: "OK",
              onPress: () => navigation.push("AllBookScreen"),
            },
          ]);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 400) {
            if (err.response.data.message != "Data validation error!") {
              setError(err.response.data.message);
            } else {
              setError("");
              setValidationErrors(err.response.data.data);
            }
          } else {
            setError("Something went wrong!");
          }
        });
    } catch (err) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
      >
        <View style={styles.arrowHeader}>
          <Icon
            name="arrow-back-ios"
            size={28}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Text style={styles.header}>Update Book</Text>
        </View>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <View style={styles.loginContainer}>
                <CustomTextInput
                  placeholder="Book Name"
                  onChangeText={setBookName}
                  value={bookName}
                />
                {validationErrors.bookName ? (
                  <Text style={styles.errorText}>
                    {validationErrors.bookName}
                  </Text>
                ) : (
                  ""
                )}

                <CustomTextInput
                  placeholder="Book Author"
                  onChangeText={setBookAuthor}
                  value={bookAuthor}
                />

                {validationErrors.bookAuthor ? (
                  <Text style={styles.errorText}>
                    {validationErrors.bookAuthor}
                  </Text>
                ) : (
                  ""
                )}

                <MultiSelect
                  style={styles.textInput}
                  placeholderStyle={{
                    fontSize: 14,
                    color: "grey",
                  }}
                  search
                  data={bookCategory.bookCategory}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Category"
                  searchPlaceholder="Search..."
                  value={selectedItems}
                  onChange={(item) => {
                    setSelectedItems(item);
                  }}
                  renderItem={renderItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                      onPress={() => unSelect && unSelect(item)}
                    >
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
                        <Text style={styles.textSelectedStyle}>
                          {item.label}
                        </Text>
                        <Icon name="delete" size={20} color="red" />
                      </View>
                    </TouchableOpacity>
                  )}
                />

                {validationErrors.bookCategories ? (
                  <Text style={styles.errorTextSelection}>
                    {validationErrors.bookCategories}
                  </Text>
                ) : (
                  ""
                )}

                <TextInput
                  style={styles.textArea}
                  placeholder="Book Description"
                  multiline={true}
                  numberOfLines={20}
                  value={bookDescription}
                  onChangeText={(text) => setBookDescription(text)}
                />
                {validationErrors.bookDescription ? (
                  <Text style={styles.errorText}>
                    {validationErrors.bookDescription}
                  </Text>
                ) : (
                  ""
                )}
                <View style={styles.imageUploadField}>
                  <TextInput
                    style={styles.ImageTextInput}
                    placeholder="Choose File"
                    editable={false}
                    selectTextOnFocus={false}
                    value={imageUploadStatus}
                  />
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.uploadButton}
                  >
                    <Text style={styles.uploadTxt}>Upload</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.imageUploadField}>
                  <TextInput
                    style={styles.ImageTextInput}
                    placeholder="Choose File"
                    editable={false}
                    selectTextOnFocus={false}
                    value={pdfUploadStatus}
                  />
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={selectFile}
                  >
                    <Text style={styles.uploadTxt}>Upload</Text>
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
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={updateBook}
                  >
                    <Text style={styles.loginButtonText}>Update Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading ? <CustomLoading /> : ""}
    </>
  );
};

export default UpdateBookScreen;

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: "4%",
    paddingBottom: 325,
  },

  arrowHeader: {
    paddingHorizontal: "5%",
    marginTop: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textInputContainer: {
    flex: 2,
    width: "90%",
    height: "100%",
    alignSelf: "center",
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
    height: 200,
    backgroundColor: "white",
    padding: 10,
    marginBottom: "5%",
    textAlignVertical: "top",

    borderRadius: 10,
  },

  buttonContainer: {
    width: "50%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },

  loginButton: {
    width: "100%",
    height: "30%",
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    minHeight: 50,
    marginBottom: responsiveHeight(3),
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  LogoImage: {
    width: responsiveWidth(80),
    height: responsiveHeight(28),
    resizeMode: "contain",
    marginTop: responsiveHeight(1),
    alignContent: "center",
    alignSelf: "center",
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "5%",
    marginBottom: "5%",
  },

  loginContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  signUpText: {
    color: "blue",
  },

  signUpSen: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  imageUploadField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "5%",
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
    width: "38%",
    height: "30%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,

    marginLeft: responsiveWidth(2),
  },

  uploadTxt: {
    color: "black",
    fontWeight: "bold",
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

  errorTextSelection: {
    width: "100%",
    marginLeft: "3%",
    color: "red",
    marginTop: "-2%",
    marginBottom: "3%",
    fontSize: 12,
    textAlign: "left",
  },
});
