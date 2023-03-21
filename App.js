import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserTabs from "./src/components/UserTabs";
import AdminTabs from "./src/components/AdminTabs";
import LandingScreen from "./src/screens/Landing/LandingScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
