import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Icon,
  TextInput,
} from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";
import axios from "axios";
import moment from "moment";
import COLORS from "../../../constants/color";

const posts = [
  {
    id: 1,
    title: "Add 1",
    image: "https://www.bootdey.com/image/280x280/7B68EE/000000",
    author: "Jane Doe",
    date: "January 1, 2020",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 2,
    title: "Add 2",
    image: "https://www.bootdey.com/image/280x280/7B68EE/000000",
    author: "John Doe",
    date: "January 2, 2020",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
];

const Advertisements = ({ navigation }) => {
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
  return (
    <>
      <View>
        <Text style={styles.title}>Advertisements</Text>

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
              {/* <Icon name="search" size={25} style={{ marginLeft: 20 }} /> */}
              <TextInput
                placeholder="Search"
                style={styles.input}
                onChangeText={(text) => onSearch(text)}
              />
            </View>
          </View>
        </View>

        <ScrollView>
          {allAdvertisements.map((post) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push("AdvertisementDetails", {
                  advertisementId: post._id,
                })
              }
              key={post._id}
              style={styles.post}
            >
              <Image
                source={{ uri: post.advertisementBanner }}
                style={styles.postImage}
              />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.adTitle}</Text>
                <Text style={styles.postMeta}>
                  Published -{" "}
                  {moment(post.createdAt).subtract(10, "days").calendar()}
                </Text>
                <Text style={styles.postExcerpt}>{post.adDescription}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {loading ? <CustomLoading /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  postImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postContent: {
    padding: 20,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  postMeta: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  postExcerpt: {
    fontSize: 14,
  },
  title: {
    marginTop: 40,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    marginLeft: 20,
  },
  input: {
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
    marginLeft: 18,
  },
});

export default Advertisements;
