import React, { useRef, useState, useEffect } from "react";
const { height, width } = Dimensions.get("window");
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import COLORS from "../../../constants/color";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const post = {
  id: 1,
  title: "Advertisement title",
  image: "https://www.bootdey.com/image/280x280/00BFFF/000000",
  author: "Jane Doe",
  date: "January 1, 2020",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
};

const AdvertisementDetails = () => {
  const video = React.useRef(null);
  const [data, setData] = useState([1, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const [status, setStatus] = React.useState({});

  const dataList = [
    {
      id: 1,
      title: "Advertisement title",
      image: "https://www.bootdey.com/image/280x280/00BFFF/000000",
    },
    {
      id: 2,
      title: "Advertisement title",
      url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.meta}>
        <Text style={styles.author}>by {post.author}</Text>
        <Text style={styles.date}>{post.date}</Text>
      </View>
      {/* <Image source={{ uri: post.image }} style={styles.image} /> */}
      <View style={styles.image}>
        <View
          style={{
            height: height / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.FlatList
            ref={ref}
            data={dataList}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / (width - 50)).toFixed(0));
            }}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <Animated.View
                  style={{
                    width: width - 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      width: "97%",
                      height: 199,
                      backgroundColor: "green",
                      borderRadius: 10,
                    }}
                  >
                    {item.image ? (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.video}
                        resizeMode="contain"
                      />
                    ) : (
                      <Video
                        ref={video}
                        style={styles.video}
                        source={{
                          uri: item.url,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping="false"
                        onPlaybackStatusUpdate={setStatus}
                      />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
        <View
          style={{
            marginTop: "-20%",
            flexDirection: "row",
            width: width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((item, index) => {
            return (
              <View
                style={{
                  width: currentIndex == index ? 50 : 8,
                  height: currentIndex == index ? 10 : 8,
                  borderRadius: currentIndex == index ? 5 : 4,
                  backgroundColor: currentIndex == index ? "blue" : "gray",
                  marginLeft: 5,
                }}
              ></View>
            );
          })}
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <ScrollView
          style={{
            width: "100%",
            height: responsiveHeight(22),
            marginTop: "2%",
          }}
        >
          <Text style={styles.content}>{post.content}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 20,
    paddingTop: 20,
  },
  meta: {
    flexDirection: "row",
    marginBottom: 20,
    paddingLeft: 20,
  },
  author: {
    fontSize: 14,
    color: "#999",
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
    padding: 10,
  },
  detailsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginTop: "20%",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 10,
  },
});

export default AdvertisementDetails;
