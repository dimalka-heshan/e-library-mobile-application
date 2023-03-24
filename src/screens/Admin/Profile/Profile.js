import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { responsiveHeight } from "react-native-responsive-dimensions";

export default function Profile({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");

    navigation.push("LoginScreen");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYFlT2BiplnqkNNGKteYvvI_mIIrnDdapFxg&usqp=CAU",
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: "1%",
              width: "80%",
            }}
          >
            Full Name
          </Text>
          <TextInput
            style={styles.textInput}
            value={"Nimna Thiranjaya"}
            editable={false}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: "1%",
              width: "80%",
            }}
          >
            Email
          </Text>
          <TextInput
            style={styles.textInput}
            value={"nimnathiranjaya@gmail.com"}
            editable={false}
          />
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: COLORS.blue,
              width: "100%",
              height: 50,
              marginTop: responsiveHeight(2),
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  imageContainer: {
    width: "100%",
    height: "45%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: COLORS.grey,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: "10%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 10,
    borderColor: COLORS.white,
  },
  header: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: "5%",
    color: "black",
    fontSize: 16,
  },
});
