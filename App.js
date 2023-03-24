import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import constants from "./src/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserTabs from "./src/components/UserTabs";
import AdminTabs from "./src/components/AdminTabs";
import LandingScreen from "./src/screens/Landing/LandingScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  axios.defaults.baseURL = constants.API.PREFIX;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LandingScreen"
          component={LandingScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUpScreen"
          component={SignUpScreen}
        />

        <Stack.Screen
          name="UserTabs"
          component={UserTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
