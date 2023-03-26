import {
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../../constants/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInout";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";

const AddAdvertisement = ({ navigation }) => {
  const body = new FormData();
  const [adTitle, setAdTitle] = useState("");
  const [adVideoUrl, setAdVideoUrl] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [advertisementBanner, setAdvertisementBanner] = useState(null);
  const [imageUploadStatus, setImageUploadStatus] = useState(
    "Choose Advertisement Picture"
  );
  const [loading, setLoading] = React.useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

  //For Multiple selection
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
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
      setAdvertisementBanner(result.assets[0].uri);
      setImageUploadStatus("Advertisement Picture Uploaded");
    } else {
      setAdvertisementBanner(null);
      setImageUploadStatus("Choose Advertisement Picture");
    }
  };

  const publishAdvertisement = async () => {
    setLoading(true);
    setError("");
    const body = new FormData();
    body.append("adTitle", adTitle);
    body.append("adDescription", adDescription);
    body.append("adVideoUrl", adVideoUrl);
    body.append("file", {
      uri: advertisementBanner,
      mimeType: "image/jpeg",
      name: "image.jpg",
    });

    if (adTitle == "" || adDescription == "" || adVideoUrl == "") {
      setLoading(false);
      setError("Plaese fill all fields !!!");
    } else {
      await axios
        .post("/advertisement/createAdvertisement", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          Alert.alert("Success", "Advertisement Published Successfully", [
            {
              text: "OK",
              onPress: () => navigation.push("Advertisement"),
            },
          ]);
        });
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
      >
        <View style={styles.arrowHeader}>
          <Icon
            name="arrow-back"
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
          <Text style={styles.header}>Add Advertisement</Text>
        </View>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <View style={styles.loginContainer}>
                <CustomTextInput
                  placeholder="Advertisement Title"
                  onChangeText={setAdTitle}
                />
                {validationErrors.adTitle ? (
                  <Text style={styles.errorText}>
                    {validationErrors.adTitle}
                  </Text>
                ) : (
                  ""
                )}
                <TextInput
                  style={styles.textArea}
                  placeholder="Advertisement Description"
                  multiline={true}
                  numberOfLines={20}
                  onChangeText={(text) => setAdDescription(text)}
                />
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
                <CustomTextInput
                  placeholder="Advertisement Video Link"
                  onChangeText={setAdVideoUrl}
                />
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
                    onPress={publishAdvertisement}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>
                      Add Advertisement
                    </Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading ? <CustomLoading /> : null}
    </>
  );
};

export default AddAdvertisement;

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
});
