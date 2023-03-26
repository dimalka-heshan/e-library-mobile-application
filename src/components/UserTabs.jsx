import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Font Awesome Icons...
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";

//Books
import HomeScreen from "../screens/User/Books/HomeScreen";
import BookScreen from "../screens/User/Books/BookScreen";

import BookFeedback from "../screens/User/Feedbacks/BookFeedback";
import CreateFeedback from "../screens/User/Feedbacks/CreateFeedback"
import UpdateFeedback from "../screens/User/Feedbacks/UpdateFeedback";

import Profile from "../screens/User/Profile/Profile";

import Blogs from "../screens/User/Blogs/Blogs";
import BlogContent from "../screens/User/Blogs/BlogContent";

import Advertisement from "../screens/User/Advertisements/Advertisements";
import AdvertisementDetails from "../screens/User/Advertisements/AdvertisementDetails";
import AdminBlogContent from "../screens/Admin/Blogs/AdminBlogContent";
import AdminBlogs from "../screens/Admin/Blogs/AdminBlogs";
import AddBlog from "../screens/Admin/Blogs/AddBlog";
import EditBlog from "../screens/Admin/Blogs/EditBlog";

const BlogsStack = createNativeStackNavigator();
const BooksStack = createNativeStackNavigator();
const AdvertisementStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function BooksStackScreen() {
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <BooksStack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{
          headerShown: false,
        }}
      />

      <BooksStack.Screen
        name="BookFeedback"
        component={BookFeedback}
        options={{
          headerShown: false,
        }}
      />

      <BooksStack.Screen
        name="CreateFeedback"
        component={CreateFeedback}
        options={{
          headerShown: false,
        }}
      />

      <BooksStack.Screen
        name="UpdateFeedback"
        component={UpdateFeedback}
        options={{
          headerShown: false,
        }}
      />

    </BooksStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

function AdvertisementStackScreen() {
  return (
    <AdvertisementStack.Navigator>
      <AdvertisementStack.Screen
        name="Advertisement"
        component={Advertisement}
        options={{
          headerShown: false,
        }}
      />
      <AdvertisementStack.Screen
        name="AdvertisementDetails"
        component={AdvertisementDetails}
        options={{
          headerShown: false,
        }}
      />
    </AdvertisementStack.Navigator>
  );
}

function BlogsStackScreen() {
  return (
    <BlogsStack.Navigator>
      <BlogsStack.Screen
        name="Blogs"
        component={Blogs}
        options={{
          headerShown: false,
        }}
      />

      <BlogsStack.Screen
        name="BlogContent"
        component={BlogContent}
        options={{
          headerShown: false,
        }}
      />
    </BlogsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function UserTabs() {
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 20,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 15,
          // Shadow...
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      {
        // Tab Screens....
        // Tab ICons....
      }
      <Tab.Screen
        name={"Home"}
        component={BooksStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="home"
                size={22}
                color={focused ? "#2E2EFF" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 8,
              useNativeDriver: true,
            }).start();
          },
        })}
      ></Tab.Screen>

      <Tab.Screen
        name={"Advertisements"}
        component={AdvertisementStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="newspaper"
                size={22}
                color={focused ? "#2E2EFF" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 92,
              useNativeDriver: true,
            }).start();
          },
        })}
      ></Tab.Screen>

      {
        // Extra Tab Screen For Action Button..
      }

      <Tab.Screen
        name={"BlogsStack"}
        component={BlogsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="file-invoice"
                size={21}
                color={focused ? "#2E2EFF" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2.64,
              useNativeDriver: true,
            }).start();
          },
        })}
      ></Tab.Screen>

      <Tab.Screen
        name={"ProfileStack"}
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="user-alt"
                size={22}
                color={focused ? "#2E2EFF" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3.88,
              useNativeDriver: true,
            }).start();
          },
        })}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
