import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeUserScreen from "@screens/user/HomeUserScreen";
import FavoritesUserScreen from "@screens/user/FavoritesUserScreen";
import ProfileUserScreen from "@screens/user/ProfileUserScreen";
import ApplicationsUserScreen from "@screens/user/ApplicationsUserScreeen";
import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { refreshUserOrCompanyToken } from "@features/user/userSlice";
import axios from "axios";
import { backendURL } from "@config/config";
import { useNavigation } from "@react-navigation/native";
import getUserinfo from "@hooks/user/getUserInfo";
import { View  } from "react-native";

const Tab = createBottomTabNavigator();

const UserNavigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.infoUser);
  const tokenExpTime = useSelector((state) => state.user.exp);

  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const remainingTimeExpToken = tokenExpTime * 1000 - Date.now();
      const fiveSecInMiliseconds = 1000 * 10;
      if (remainingTimeExpToken <= fiveSecInMiliseconds) {
        await axios
          .post(
            `${backendURL}api/applicants/refresh-token`,
            {}
          )
          .then(({ data }) => dispatch(refreshUserOrCompanyToken(data)))
          .catch((e) => console.log(e));
      }
    };
    checkTokenExpiration(); // Check the token expiration on component mount
    const interval = setInterval(checkTokenExpiration, 1000); // Check token expiration periodically (e.g., every minute)
    return () => clearInterval(interval); //
  }, [navigation, dispatch, tokenExpTime]);



  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 900,
          position: "absolute",
          bottom: 20,
          left: 25,
          right: 25,
          elevation: 1,
          backgroundColor:COLORS.black,
          height: 60,
        },
        tabBarBadgeStyle: {
          backgroundColor: COLORS.indigo300,
        },
      }}
    >
      <Tab.Screen
        name="HomeUser"
        component={HomeUserScreen}
        options={{
          headerShown: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",

          title: "Inicio",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.indigo800 : "transparent",
                borderRadius: 50,
                paddingHorizontal: 30,
                paddingVertical:16
              }}
            >
             
              <Icon name="search" type="font-awesome" size={20} color={COLORS.white} />
            </View>
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
          title: "Favoritos",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.indigo800 : "transparent",
                borderRadius: 50,
                paddingHorizontal: 30,
                paddingVertical:16
              }}
            >
            
              <Icon name="favorite" type="material" size={20} color={COLORS.white} />
            </View>
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
          title: "Postulaciones",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.indigo800 : "transparent",
                borderRadius: 50,
                paddingHorizontal: 30,
                paddingVertical:16
              }}
            >
              <Icon name="ios-layers" type="ionicon" size={20} color={COLORS.white} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileUser"
        component={ProfileUserScreen}
        options={{
          headerShown: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "Perfil",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.indigo800 : "transparent",
                borderRadius: 50,
                paddingHorizontal: 30,
                paddingVertical:16
              }}
            >
              <Icon
                name="user-circle-o"
                type="font-awesome"
                size={20}
                color={COLORS.white}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserNavigation;
