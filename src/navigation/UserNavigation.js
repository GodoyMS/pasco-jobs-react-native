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
import { View } from "react-native";
import { Text } from "react-native";
import AllCompaniesUserScreen from "@screens/user/AllCompaniesUserScreen";
import AdsUserScreen from "@screens/user/AdsUserScreen";

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
          .post(`${backendURL}api/applicants/refresh-token`, {})
          .then(({ data }) => dispatch(refreshUserOrCompanyToken(data)))
          .catch((e) => console.log(e));
      }
    };
    checkTokenExpiration(); // Check the token expiration on component mount
    const interval = setInterval(checkTokenExpiration, 1000); // Check token expiration periodically (e.g., every minute)
    return () => clearInterval(interval); //
  }, [navigation, dispatch, tokenExpTime]);

  const navigationMeny = [
     {
       id: 1,
       route: "AdsUserScreen",
       screen: AdsUserScreen,
      nameIcon: "campaign",
       typeIcon: "material",
       name: "Anuncios",
     }
    ,
    {
      id: 2,
      route: "ApplicationsUser",
      screen: ApplicationsUserScreen,
      nameIcon: "ios-layers",
      typeIcon: "ionicon",
      name: "Postulaciones",
    },

    {
      id: 3,
      route: "HomeUser",
      screen: HomeUserScreen,
      nameIcon: "search",
      typeIcon: "font-awesome",
      name: "Empleos",
    },
    {
      id: 4,
      route: "AllCompaniesUserScreen",
      screen: AllCompaniesUserScreen,
      nameIcon: "building",
      typeIcon: "font-awesome",
      name: "Empresas",
    },
    {
      id: 5,
      route: "ProfileUser",
      screen: ProfileUserScreen,
      nameIcon: "user-circle-o",
      typeIcon: "font-awesome",
      name: "Perfil",
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="HomeUser"
      screenOptions={{
        tabBarStyle: {         
          elevation: 2,
          backgroundColor: COLORS.white,
          shadowColor: COLORS.black,
          shadowOpacity: 0.6,
          shadowOffset: {
            width: 2,
            height: 4,
          }
        
        },

        tabBarBadgeStyle: {
          backgroundColor: COLORS.indigo300,
        },
      }}
    >
      {navigationMeny.map((e) => (
        <Tab.Screen
          key={e.id}
          name={e.route}
          component={e.screen}
          options={{
            tabBarLabelStyle:{color:COLORS.gray800},
            headerShown: false,
            headerBackVisible: true,
            headerTransparent: true,
            
            headerTitle: e.name,
            title: e.name,
            tabBarIcon: ({ color = COLORS.tertiary, focused }) => (
              <View
                style={{
                  borderRadius: 50,
                  paddingHorizontal: 30,
                }}
              >
                <Icon
                  name={e.nameIcon}
                  type={e.typeIcon}
                  size={20}
                  color={focused ? COLORS.tertiary : COLORS.gray500}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default UserNavigation;
