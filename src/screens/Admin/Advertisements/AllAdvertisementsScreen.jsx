import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../../constants/color";
import TempAdvertisements from "../../../constants/book";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";

const AllAdvertisementsScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        marginBottom: 80,
      }}
    >
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          marginTop: "8%",
          height: "8%",
        }}
      >
        <Text style={styles.header}>Advertisements</Text>
      </View>

      <View
        style={{
          width: "100%",
          height: "8%",
          paddingLeft: "2.5%",
          paddingRight: "2.5%",
        }}
      >
        <View style={{ flexDirection: "row", padding: "3%" }}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={25} style={{ marginLeft: 20 }} />
            <TextInput placeholder="Search" style={styles.input} />
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          marginTop: "5%",
        }}
      >
        <View style={styles.container}>
          {TempAdvertisements.map((Advertisement) => (
            <View key={Advertisement.id} style={styles.AdvertisementContainer}>
              <Image
                source={{
                  uri: "https://www.bootdey.com/image/280x280/00BFFF/000000",
                }}
                style={styles.AdvertisementImage}
              />
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  marginLeft: "5%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: "-25%",
                  }}
                >
                  {Advertisement.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                    marginTop: 1,
                  }}
                >
                  {Advertisement.price}
                </Text>
                <View
                  style={{
                    display: "flex",
                    width: "25%",
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                    marginLeft: "30%",
                    marginTop: "10%",
                    marginBottom: "-25%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("UpdateAdvertisementScreen");
                    }}
                  >
                    <Icon name="edit" size={24} color={COLORS.blue} />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Icon
                      name="delete"
                      size={24}
                      color="red"
                      style={{
                        marginLeft: "5%",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => navigation.push("AddAdvertisementScreen")}
          >
            <Icon name="add" size={30} style={{ marginLeft: "80%" }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllAdvertisementsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "5%",
    paddingBottom: 200,
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "6%",
  },

  arrowHeader: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  AdvertisementContainer: {
    width: "100%",
    height: responsiveHeight(15),
    backgroundColor: COLORS.white,
    marginBottom: "5%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  AdvertisementImage: {
    width: "40%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 15,
    alignContent: "center",
    alignSelf: "center",
    marginLeft: "5%",
  },

  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
    marginLeft: 10,
  },
});
