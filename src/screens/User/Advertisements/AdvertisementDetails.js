import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.meta}>
        <Text style={styles.author}>by {post.author}</Text>
        <Text style={styles.date}>{post.date}</Text>
      </View>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meta: {
    flexDirection: "row",
    marginBottom: 20,
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
  },
  content: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default AdvertisementDetails;
