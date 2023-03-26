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
  Alert,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import COLORS from "../../../constants/color";
import TempAdvertisements from "../../../constants/book";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";
import axios from "axios";
import moment from "moment";

const AllAdvertisementsScreen = ({ navigation }) => {
  const [allAdvertisements, setAllAdvertisements] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getAllAdvertisements = () => {
    setLoading(true);
    axios
      .get("/advertisement/getAllAdvertisements")
      .then((res) => {
        setAllAdvertisements(res.data.advertisements);
        setLoading(false);
      }, 1000)
      .catch((err) => {
        setLoading(false);
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

  useEffect(() => {
    getAllAdvertisements();
  }, []);

  const filterData = (advertisements, searchKey) => {
    const result = advertisements.filter((advertisement) =>
      advertisement.adTitle.toLowerCase().includes(searchKey)
    );
    setAllAdvertisements(result);
  };

  const onSearch = async (e) => {
    await axios
      .get(`/advertisement/getAllAdvertisements`)
      .then((res) => {
        filterData(res.data.advertisements, e.toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete Advertisement
  const deleteAdvertisement = async (ID) => {
    setLoading(true);
    await axios
      .delete(`/advertisement/deleteAdvertisement/${ID}`)
      .then((res) => {
        setLoading(false);
        Alert.alert("Success", "Advertisement deleted successfully", [
          {
            text: "OK",
            onPress: () => navigation.push("Advertisement"),
          },
        ]);
      })
      .catch((err) => {
        setLoading(false);
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
    <>
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
              <TextInput
                placeholder="Search"
                style={styles.input}
                onChangeText={(text) => onSearch(text)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("AddAdvertisementScreen")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Add New Advertisement</Text>
        </TouchableOpacity>

        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            marginTop: "2.5%",
          }}
        >
          <View style={styles.container}>
            {allAdvertisements.map((Advertisement) => (
              <TouchableOpacity
                key={Advertisement._id}
                onPress={() =>
                  navigation.push("AdvertisementDetails", {
                    advertisementId: Advertisement._id,
                  })
                }
              >
                <View
                  key={Advertisement._id}
                  style={styles.AdvertisementContainer}
                >
                  <Image
                    source={{ uri: Advertisement.advertisementBanner }}
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
                        marginRight: 10,
                      }}
                    >
                      {Advertisement.adTitle}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "gray",
                        marginTop: 1,
                      }}
                    >
                      Published -{" "}
                      {moment(Advertisement.createdAt)
                        .subtract(10, "days")
                        .calendar()}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        width: "25%",
                        flexDirection: "row",
                        alignContent: "center",
                        alignSelf: "center",
                        marginLeft: "-75%",
                        marginTop: "10%",
                        marginBottom: "-25%",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push("UpdateAdvertisementScreen", {
                            advertisementId: Advertisement._id,
                          });
                        }}
                      >
                        <Icon name="edit" size={24} color={COLORS.blue} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Delete Advertisement",
                            "Are you sure you want to delete this advertisement?",
                            [
                              {
                                text: "OK",
                                onPress: () =>
                                  deleteAdvertisement(Advertisement._id),
                              },
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                              },
                            ]
                          );
                        }}
                      >
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
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? <CustomLoading /> : null}
    </>
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
  loginButton: {
    width: "50%",
    backgroundColor: COLORS.blue,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    minHeight: 50,
    marginLeft: "45%",
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
