import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
const width = Dimensions.get("window").width / 2 - 30;
import COLORS from "../../../constants/color";
import TempBooks from "../../../constants/book";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const categories = [
  "All",
  "Classics",
  "Novel",
  "Educational",
  "Detective",
  "Fantasy",
  "Short Stories",
  "Horror",
  "Mystery",
  "Non-Fiction",
  "Romance",
];

export default function HomeScreen({ navigation }) {
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(selectedCategory);

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  setCategoryIndex(index);
                  if (index === 0) {
                    setSelectedCategory("");
                  } else {
                    setSelectedCategory(item);
                  }
                }}
              >
                <Text
                  style={[
                    style.categoryText,
                    catergoryIndex === index && style.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const Card = ({ book }) => {
    return (
      <TouchableOpacity
        key={book.id}
        onPress={() => navigation.navigate("BookScreen")}
      >
        <View style={style.card}>
          <View
            style={{
              height: "76%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={book.img}
              style={{ flex: 1, resizeMode: "contain" }}
            />
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {book.name}
          </Text>
          <View
            style={{
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              {book.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text
            style={{ fontSize: 38, color: COLORS.blue, fontWeight: "bold" }}
          >
            Osprey Library
          </Text>
        </View>
        {/* <Icon name="shopping-cart" size={28} /> */}
      </View>
      <View style={{ marginTop: "5%", flexDirection: "row", padding: "3%" }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
      </View>
      <CategoryList />
      <View style={style.scrollItems}>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          width={"100%"}
          numColumns={2}
          data={TempBooks}
          renderItem={({ item }) => {
            return <Card book={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: "3%",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
  },

  categoryContainer: {
    flexDirection: "row",
    marginTop: "4%",
    marginBottom: "5%",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.blue,
    paddingBottom: "2%",
    borderBottomWidth: 2,
    borderColor: COLORS.blue,
  },
  card: {
    height: responsiveHeight(31),
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: "2.9%",
    borderRadius: 10,
    marginBottom: "5%",
    padding: "5%",
  },
  header: {
    marginTop: "11%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
  },
  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: COLORS.light,
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
  sortBtn: {
    marginLeft: "2%",
    height: responsiveHeight(6),
    width: responsiveWidth(15),
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollItems: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
});
