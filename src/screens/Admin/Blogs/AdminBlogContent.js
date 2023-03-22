import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { Video } from "expo-av";
// import { YoutubePlayer } from "react-native-youtube-iframe";
// import { VideoPlayer } from "react-native-video";
import truncate from "truncate";
import COLORS from "../../../constants/color";

const PopularCategories = [
  {
    id: 1,
    name: "History of Sri Lanka | ශ්‍රී ලංකාවේ ඉතිහාසය in Sinhala",
    catImg:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/1686_Mallet_Map_of_Ceylon_or_Sri_Lanka_%28Taprobane%29_-_Geographicus_-_Taprobane-mallet-1686.jpg",
  },
  {
    id: 2,
    name: "Culture of South Asia by Dr. Nalin de Silva",
    catImg:
      "https://strategicpsychology.com.au/wp-content/uploads/Multicultural-character.jpg",
  },
  {
    id: 3,
    name: "Nature Conservation in Sri Lanka",
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

const AdminBlogContent = ({ navigation, route }) => {
  const place = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7, height: 400 }} source={place.image}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          {/* <Icon name="more-vert" size={28} color={COLORS.white} /> */}
        </View>
        <View style={style.imageDetails}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <Text
              style={{
                width: "100%",
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.white,
                marginBottom: 20,
              }}
            >
              {place.name}
            </Text>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              style={{ height: 25, width: 25, borderRadius: 25 }}
              source={{
                uri: "https://static.toiimg.com/photo/67538607.cms",
              }}
            />
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "normal",
                fontSize: 16,
              }}
            >
              Hasith Deminda
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="timer" size={16} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                1 hour ago
              </Text>
            </View>
          </View>

          {/* Edit delete buttons */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("EditBlog")}
                style={{
                  backgroundColor: COLORS.grey,
                  padding: 5,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Icon name="edit" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Delete",
                    "Are you sure want to delete this blog?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => console.log("OK Pressed"),
                      },
                    ]
                  )
                }
                style={{
                  backgroundColor: COLORS.grey,
                  padding: 5,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Icon name="delete" size={20} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        style={style.detailsContainer}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 200,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              lineHeight: 22,
              textAlign: "justify",
            }}
          >
            {place.details}
          </Text>

          {/* Link references: */}
          <View
            style={{
              marginTop: 20,
              lineHeight: 22,
              textAlign: "justify",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>References:</Text>
            <View>
              <Text style={{ color: "blue" }}>
                https://www.youtube.com/watch?v=0S5a0e7jwlU
              </Text>
            </View>
          </View>
          <>
            <Text
              style={
                style.sectionTitle && {
                  top: 20,
                  fontSize: 14,
                  fontWeight: "bold",
                }
              }
            >
              Similar Books
            </Text>
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
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
                          width: 100,
                          height: 150,
                          borderRadius: 10,
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
                        width: 100,
                        flexWrap: "wrap",
                      }}
                    >
                      {truncate(category.name, 40)}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -20,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 100,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  categoryContainer: {
    marginTop: 35,
    flexDirection: "row",
    gap: 20,
  },
});

export default AdminBlogContent;
