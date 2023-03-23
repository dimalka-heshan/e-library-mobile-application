import {
  StyleSheet,
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

const UpdateAdvertisement = ({ navigation }) => {
  const [AdvertisementName, setAdvertisementName] = useState("");
  const [AdvertisementVideoUrl, setAdvertisementVideoUrl] = useState("");
  const [AdvertisementDescription, setAdvertisementDescription] = useState("");
  const [AdvertisementImage, setAdvertisementImage] = useState(null);
  const [imageUploadStatus, setImageUploadStatus] = useState(
    "Choose Advertisement Picture"
  );
  const [selectedItems, setSelectedItems] = useState([]);

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
      setAdvertisementImage(result);
      setImageUploadStatus("Advertisement Picture Uploaded");
    } else {
      setAdvertisementImage(null);
      setImageUploadStatus("Choose Advertisement Picture");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
    >
      <View style={styles.arrowHeader}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
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
                onChangeText={setAdvertisementName}
              />
              <TextInput
                style={styles.textArea}
                placeholder="Advertisement Description"
                multiline={true}
                numberOfLines={20}
                onChangeText={(text) => setAdvertisementDescription(text)}
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
                onChangeText={setAdvertisementVideoUrl}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>
                    Update Advertisement
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateAdvertisement;

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
    paddingLeft: 10,
    paddingRight: 10,
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
});
