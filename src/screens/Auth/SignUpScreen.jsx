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
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import COLORS from "../../constants/color";
import SignUp from "../../assets/images/SignUp.png";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInout";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const body = new FormData();

const SignUpScreen = ({ navigation }) => {
  const [uploadStatus, setUploadStatus] = useState("Choose Profile Picture");
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // sign up handler
  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setValidationErrors({});
    if (password == confirmPassword) {
      //constuct request body
      body.append("fullName", fullName);
      body.append("email", email);
      body.append("password", password);
      body.append("role", "user");
      if (image) {
        body.append("picture", {
          uri: image,
          mimetype: "image/jpeg",
          name: "image.jpg",
        });
      }

      await axios
        .post("/user/register", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data) {
            setLoading(false);
            Alert.alert("Success", "User Registered Successfully", [
              {
                text: "OK",
                onPress: () => navigation.navigate("LoginScreen"),
              },
            ]);
          }
        })
        .catch((err) => {
          if (err.response.status == 400) {
            if (err.response.data.message != "Data validation error!") {
              setLoading(false);
              setError(err.response.data.message);
            } else {
              setValidationErrors(err.response.data.data);
              setLoading(false);
            }
          } else {
            setLoading(false);
            setError("Something went wrong!");
          }
        });
    } else {
      setLoading(false);
      setError("Password and Confirm Password must be same !");
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
      setImage(result.assets[0].uri);
      setUploadStatus("Book Picture Uploaded");
    } else {
      setImage(null);
      setUploadStatus("Choose Book Picture");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View>
            <Image source={SignUp} style={styles.LogoImage} />
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.loginContainer}>
              <CustomTextInput
                placeholder="Full Name"
                onChangeText={setFullName}
              />
              {validationErrors.fullName ? (
                <Text style={styles.errorText}>
                  {validationErrors.fullName}
                </Text>
              ) : (
                ""
              )}

              <CustomTextInput placeholder="Email" onChangeText={setEmail} />

              {validationErrors.email ? (
                <Text style={styles.errorText}>{validationErrors.email}</Text>
              ) : (
                ""
              )}

              <CustomTextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
              />

              {validationErrors.password ? (
                <Text style={styles.errorText}>
                  {validationErrors.password}
                </Text>
              ) : (
                ""
              )}

              <CustomTextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={setConfirmPassword}
              />

              <View style={styles.imageUploadField}>
                <TextInput
                  style={styles.ImageTextInput}
                  placeholder="Choose File"
                  editable={false}
                  selectTextOnFocus={false}
                  value={uploadStatus}
                />
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.uploadButton}
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
                    style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
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
                  onPress={handleSignUp}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Text style={styles.loginButtonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.signUpSen}>
            {" "}
            Already have an account?{"  "}
            <Text
              onPress={() => {
                navigation.push("LoginScreen");
              }}
              style={styles.signUpText}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: "4%",
  },

  textInputContainer: {
    flex: 2,
    width: "80%",
    height: "100%",
    alignSelf: "center",
    marginTop: responsiveHeight(5),
  },

  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
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
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(3),
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
    marginBottom: responsiveHeight(3),
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
