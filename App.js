import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeUserScreen from "@screens/user/HomeUserScreen";
import JobDetailsUserScreen from "@screens/user/JobDetailsScreen";
import { Icon } from "@rneui/themed";
import FavoritesUserScreen from "@screens/user/FavoritesUserScreen";
import ApplicationsUserScreen from "@screens/user/ApplicationsUserScreeen";
import { COLORS } from "@constants/theme";
import ProfileUserScreen from "@screens/user/ProfileUserScreen";
import { TransitionPreset } from "@react-navigation/stack";
import FirstScreen from "@screens/FirstScreen";
import RegisterScreen from "@screens/auth/RegisterScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";

import LoginCompanyScreen from "@screens/auth/LoginCompanyScreen";
import RegisterCompanyScreen from "@screens/auth/RegisterCompanyScreen";

import UserProvider from "@store/userProvider";
import RootNavigation from "@navigation/RootNavigation";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import moment from "moment";

moment.locale('es')


export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </UserProvider>
  );
}

function User() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeUser"
        component={HomeUserScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="search"
              type="font-awesome"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesUser"
        component={FavoritesUserScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="favorite"
              type="material"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ApplicationsUser"
        component={ApplicationsUserScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="ios-layers"
              type="ionicon"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileUser"
        component={ProfileUserScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="user-circle-o"
              type="font-awesome"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
