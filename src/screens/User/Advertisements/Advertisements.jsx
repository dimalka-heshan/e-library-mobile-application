import React from "react";
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
  return (
    <View>
      <Text style={styles.title}>Advertisements</Text>

      <ScrollView>
        {posts.map((post) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("AdvertisementDetails")}
            key={post.id}
            style={styles.post}
          >
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postMeta}>
                by {post.author} | {post.date}
              </Text>
              <Text style={styles.postExcerpt}>{post.excerpt}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
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
});

export default Advertisements;
