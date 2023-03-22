import React from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";
import places from "../../../constants/places";
const { width } = Dimensions.get("screen");
const AdminBlogs = ({ navigation }) => {
  const categoryIcons = [
    <Icon name="flight" size={25} color={COLORS.primary} />,
    <Icon name="beach-access" size={25} color={COLORS.primary} />,
    <Icon name="near-me" size={25} color={COLORS.primary} />,
    <Icon name="place" size={25} color={COLORS.primary} />,
  ];

  const PopularCategories = [
    {
      id: 1,
      name: "History",
      catImg:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/1686_Mallet_Map_of_Ceylon_or_Sri_Lanka_%28Taprobane%29_-_Geographicus_-_Taprobane-mallet-1686.jpg",
    },
    {
      id: 2,
      name: "Culture",
      catImg:
        "https://strategicpsychology.com.au/wp-content/uploads/Multicultural-character.jpg",
    },
    {
      id: 3,
      name: "Nature",
      catImg:
        "https://images.news18.com/ibnlive/uploads/2021/07/1627448017_world-nature-conservation-day.png",
    },
    {
      id: 4,
      name: "Adventure",
      catImg:
        "https://warnercnr.colostate.edu/wp-content/uploads/sites/2/2017/04/shutterstock_428626417-1024x683.jpg",
    },
    {
      id: 5,
      name: "Religion",
      catImg:
        "https://www.jobs.ca/content/uploads/2018/03/religion-and-business.jpg",
    },
    {
      id: 6,
      name: "Food",
      catImg:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: 7,
      name: "Wildlife",
      catImg:
        "https://designgrapher.com/wp-content/uploads/2015/10/types-of-photography1.jpg",
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
              fontWeight: "bold",
            }
          }
        >
          Popular Categories
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={style.categoryContainer}>
            {PopularCategories.map((category, index) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Image
                  style={
                    style.iconContainer && {
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      objectFit: "cover",
                    }
                  }
                  source={{
                    uri: category.catImg,
                  }}
                />

                <Text
                  style={{
                    color: COLORS.dark,
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 5,
                    textAlign: "center",
                    letterSpacing: 1,
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

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("AdminBlogContent", place)}
      >
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Icon name="star" size={20} color={COLORS.white} /> */}
            <Text style={{ color: COLORS.white }}>October 21st</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="category" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {place.location}
              </Text>
            </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Icon name="calendar" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text>
            </View> */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ place }) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
                alignItems: "center",
              }}
            >
              <Icon name="category" size={16} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="timer" size={16} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                1 hour ago
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
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        {/* <Icon name="sort" size={28} color={COLORS.white} /> */}
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
            uri: "https://cdn.shopify.com/s/files/1/1045/8368/files/Young-blonde-lady-smiling-wearing-round-tortoise-shell-acetate-eyeglasses-frame.jpg?v=1654863352",
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
                style={{ color: COLORS.grey, marginLeft: 10 }}
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
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recently Added Blogs</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({ item }) => <RecommendedCard place={item} />}
          />
          <ListCategories />
        </View>
      </ScrollView>
    </SafeAreaView>
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
