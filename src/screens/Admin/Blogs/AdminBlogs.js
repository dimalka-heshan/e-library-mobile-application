import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";
const { width } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import AnimatedLottieView from "lottie-react-native";

const AdminBlogs = ({ navigation }) => {
  //Fetch all blogs from the database
  const [allBlogs, setAllBlogs] = React.useState([]);

  //Search function for blogs
  const filterData = (allBlogs, searchKey) => {
    const result = allBlogs.filter((item) =>
      item.blogTitle.toLowerCase().includes(searchKey)
    );
    setAllBlogs(result);
  };

  const onSearch = async (e) => {
    await axios
      .get("/blog/getAllBlogs")
      .then((res) => {
        filterData(res.data.blogs, e);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //Get total blogs
  const [totalBlogs, setTotalBlogs] = React.useState(0);
  const getTotalBlogs = () => {
    axios
      .get("/blog/getTotalBlogs")
      .then((res) => {
        setTotalBlogs(res.data.totalBlogs);
        // console.log("Total Blogs", res.data.totalBlogs);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //Get all recent blogs
  const [recentBlogs, setRecentBlogs] = React.useState(0);
  const getRecentBlogs = () => {
    axios
      .get("/blog/getTodaysBlogs")
      .then((res) => {
        setRecentBlogs(res.data.todaysBlogs);
        // console.log("Recent Blogs", res.data.todaysBlogs);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //Get total users
  const [totalUsers, setTotalUsers] = React.useState(0);
  const getTotalUsers = () => {
    axios
      .get("/user/getTotalUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalUsers(res.data.userCount);
        // console.log("Total Users", res.data.userCount);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //Get total admins
  const [totalAdmins, setTotalAdmins] = React.useState(0);
  const getTotalAdmins = () => {
    axios
      .get("/user/getTotalAdmins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalAdmins(res.data.adminCount);
        // console.log("Total Admins", res.data.adminCount);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const [token, setToken] = React.useState("");
  //Get token from local storage
  AsyncStorage.getItem("token").then((token) => {
    setToken(token);
  });

  //Get logged in user details
  const [user, setUser] = React.useState([]);
  const getUserDetails = () => {
    setLoading(true);
    axios
      .get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const [loading, setLoading] = React.useState(false);

  const getAllBlogs = () => {
    setLoading(true);
    axios
      .get("/blog/getAllBlogs")
      .then((res) => {
        setAllBlogs(res.data.blogs);
        setLoading(false);
      }, 1000)
      .catch((err) => {
        setLoading(false);
      });
  };

  //Get recently added blogs
  const [recentlyAddedBlogs, setRecentlyAddedBlogs] = React.useState([]);
  const getRecentlyAddedBlogs = () => {
    setLoading(true);
    axios
      .get("/blog/getRecentBlogs")
      .then((res) => {
        setRecentlyAddedBlogs(res.data.blogs);
        setLoading(false);
      }, 1000)
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserDetails();
    getAllBlogs();
    getTotalBlogs();
    getRecentBlogs();
    getTotalUsers();
    getTotalAdmins();
    getRecentlyAddedBlogs();
  }, [token]);

  const PopularCategories = [
    {
      name: "Total Blogs",
      count: totalBlogs,
      icon: "book",
    },
    {
      name: "Today's Published",
      count: recentBlogs,
      icon: "category",
    },
    {
      name: "Total Users",
      count: totalUsers,
      icon: "people",
    },
    {
      name: "Total Admins",
      count: totalAdmins,
      icon: "people",
    },
  ];
  const ListCategories = () => {
    return (
      <>
        <Text
          style={
            style.sectionTitle && {
              bottom: 0,
              marginTop: 20,
              left: 20,
              fontSize: 20,
              letterSpacing: 1,
            }
          }
        >
          Dashboard Statistics
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={style.categoryContainer}>
            {PopularCategories.map((category, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <View
                  style={
                    style.iconContainer && {
                      width: 75,
                      height: 75,
                      borderRadius: 20,
                      objectFit: "cover",
                      textAlign: "center",
                      justifyContent: "center",
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                    }
                  }
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 20,
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {category.count}
                  </Text>
                </View>

                <Text
                  style={{
                    color: COLORS.dark,
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 5,
                    textAlign: "center",
                    letterSpacing: 1,
                    width: 75,
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    );
  };

  const Card = ({ allBlogs }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("AdminBlogContent", allBlogs)}
      >
        <ImageBackground
          style={style.cardImage}
          source={{
            uri: allBlogs.blogImage,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {allBlogs.blogTitle}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon name="date-range" size={16} color={COLORS.white} />
            <Text style={{ color: COLORS.white }}>
              {moment(allBlogs.createdAt).format("DD MMM YYYY")}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="category" size={16} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {allBlogs.blogCategory}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ recentlyAddedBlogs }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("AdminBlogContent", recentlyAddedBlogs)
        }
      >
        <ImageBackground
          style={style.rmCardImage}
          source={{
            uri: recentlyAddedBlogs.blogImage,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {recentlyAddedBlogs.blogTitle}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{ width: "100%", flexDirection: "row", marginTop: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 10,
                  alignItems: "center",
                }}
              >
                <Icon name="category" size={16} color={COLORS.white} />
                <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                  {recentlyAddedBlogs.blogCategory}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="timer" size={16} color={COLORS.white} />
                <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                  {moment(recentlyAddedBlogs.publishedOn).fromNow()}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 13,
                paddingTop: 30,
                textAlign: "justify",
              }}
            >
              {recentlyAddedBlogs.blogContent}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />
        <View style={style.header}>
          <ImageBackground
            source={{
              uri: "https://www.graphicsprings.com/filestorage/stencils/2f3bdb9733c4a68659dc2900a7595fea.png?width=500&height=500",
            }}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
            }}
          />
          <Image
            source={{
              uri:
                user.picture ||
                "https://res.cloudinary.com/desnqqj6a/image/upload/v1667591378/user_1_bze4lv.png",
            }}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 50,
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: 120,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={
                  style.headerTitle && {
                    letterSpacing: 1,
                    color: COLORS.white,
                    fontSize: 24,
                  }
                }
              >
                Blogs & Articles
              </Text>
              <Text
                style={
                  style.headerTitle && {
                    color: COLORS.white,
                    fontSize: 16,
                    color: COLORS.grey,
                  }
                }
              >
                Admin Panel
              </Text>
              <View style={style.inputContainer}>
                <Icon name="search" size={24} />
                <TextInput
                  placeholder="Search Blogs"
                  onChangeText={(text) => onSearch(text.toLocaleLowerCase())}
                  style={{ color: COLORS.black, marginLeft: 10 }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text style={style.sectionTitle}>Featured Blogs</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddBlog")}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 20,
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: 10,
                marginRight: 20,
              }}
            >
              <Icon name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View>
            {allBlogs.length != 0 ? (
              <FlatList
                contentContainerStyle={{ paddingLeft: 20 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={allBlogs}
                renderItem={({ item }) => <Card allBlogs={item} />}
              />
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedLottieView
                  source={require("../../../assets/searching.json")}
                  autoPlay
                  loop
                  style={{ width: 100, height: 100 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "grey",
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  No Blogs Found
                </Text>
              </View>
            )}
            <Text style={style.sectionTitle}>Recently Added Blogs</Text>

            {recentlyAddedBlogs.length != 0 ? (
              <FlatList
                snapToInterval={width - 20}
                contentContainerStyle={{ paddingLeft: 20 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={recentlyAddedBlogs}
                renderItem={({ item }) => (
                  <RecommendedCard recentlyAddedBlogs={item} />
                )}
              />
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedLottieView
                  source={require("../../../assets/searching.json")}
                  autoPlay
                  loop
                  style={{ width: 100, height: 100 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "grey",
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  No Blogs Found
                </Text>
              </View>
            )}
            <ListCategories />
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      ) : null}
    </>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    paddingTop: 30,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
  categoryContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    gap: 20,
    paddingBottom: 100,
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
});
export default AdminBlogs;
