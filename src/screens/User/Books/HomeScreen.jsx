import React, { useState, useEffect } from "react";
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
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
const width = Dimensions.get("window").width / 2 - 30;
import COLORS from "../../../constants/color";
import TempBooks from "../../../constants/book";
import LottieView from "lottie-react-native";
import truncate from "truncate";

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
import CustomLoading from "../../../components/CustomLoding.jsx/CustomLoading";

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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const GetAllData = async () => {
    setLoading(true);
    await axios
      .get(`/book/getAllBooks/?category=${category}`)
      .then((res) => {
        setTimeout(() => {
          setBooks(res.data.filteredBooks);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //book search function
  const filterData = (books, searchKey) => {
    const result = books.filter(
      (book) =>
        book.bookName.toLowerCase().includes(searchKey) ||
        book.bookAuthor.toLowerCase().includes(searchKey)
    );
    setBooks(result);
  };

  const onSearch = async (e) => {
    await axios
      .get(`/book/getAllBooks/?category=${category}`)
      .then((res) => {
        filterData(res.data.filteredBooks, e.toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetBooksByCategory = async (category) => {
    setLoading(true);
    await axios
      .get(`/book/getAllBooks/?category=${category}`)
      .then((res) => {
        setTimeout(() => {
          setBooks(res.data.filteredBooks);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetAllData();
  }, []);

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <View
              key={index}
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
                    GetBooksByCategory("");
                    setCategory("");
                  } else {
                    GetBooksByCategory(item);
                    setCategory(item);
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
        key={book._id}
        onPress={() => navigation.navigate("BookScreen", book)}
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
              source={{ uri: book.bookBanner }}
              style={{
                flex: 1,
                resizeMode: "contain",
                height: "100%",
                width: "100%",
              }}
            />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 13,
              marginTop: 10,
            }}
          >
            {truncate(book.bookName, 40)}
          </Text>
          <View
            style={{
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              {book.bookAuthor}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
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
            <TextInput
              placeholder="Search"
              style={style.input}
              onChangeText={(text) => onSearch(text)}
            />
          </View>
        </View>
        <CategoryList />
        {books.length > 0 ? (
          <View style={style.scrollItems}>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsVerticalScrollIndicator={false}
              width={"100%"}
              numColumns={2}
              data={books}
              renderItem={({ item }) => {
                return <Card book={item} />;
              }}
            />
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              marginTop: "40%",
              justifyContent: "center",
            }}
          >
            <LottieView
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
              No Books Found
            </Text>
          </View>
        )}
      </SafeAreaView>
      {loading ? <CustomLoading /> : ""}
    </>
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
    marginBottom: 80,
  },
});
