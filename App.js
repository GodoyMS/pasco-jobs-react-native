
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeUserScreen from "@screens/user/HomeUserScreen";
import { Icon } from "@rneui/themed";
import FavoritesUserScreen from "@screens/user/FavoritesUserScreen";
import ApplicationsUserScreen from "@screens/user/ApplicationsUserScreeen";
import { COLORS } from "@constants/theme";
import ProfileUserScreen from "@screens/user/ProfileUserScreen";

import 'react-native-gesture-handler';



import UserProvider from "@store/userProvider";
import RootNavigation from "@navigation/RootNavigation";

import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import moment from "moment";
import { backendURL } from "@config/config";

moment.locale('es')

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: `${backendURL}api/graphql` ,
  cache: new InMemoryCache(
    {
      typePolicies: {
        Query: {
          fields: {
            Applications: {
              merge(existing, incoming) {
                // Custom merge logic here
                // Make sure to handle the merging of existing and incoming data appropriately
                return incoming;
              },
            },
          },
        },
      },
    }
  )
});

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
    <ApolloProvider client={client}>

    <UserProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </UserProvider>
    </ApolloProvider>

  );
}

AppRegistry.registerComponent('MyApplication', () => App);

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
