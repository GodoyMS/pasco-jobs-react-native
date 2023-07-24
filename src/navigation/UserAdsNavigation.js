import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";

import ProfileUserAdsScreen from "@screens/userAds/ProfileUserAdsScreen";
import PublishAnAdUserAdsScreen from "@screens/userAds/PublishAnAdUserAdsScreen";
import PublishedAdsUserAdsScreen from "@screens/userAds/PublishedAdsUserAdsScreen";
import AllAdsUserAdsScreen from "@screens/userAds/AllAdsUserAdsScreen";
const Tab = createBottomTabNavigator();

const UserAdsNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PublishedAdsUserAdsScreen"
        component={PublishedAdsUserAdsScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          tabBarLabelStyle: { color: COLORS.gray800 },
          headerTitle: "",
          title: "Mis anuncios",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="ios-layers"
              type="ionicon"
              color={focused ? COLORS.indigo500 : COLORS.gray500}
            />
          ),
        }}
      />

      <Tab.Screen
        name="PublishAnAdUserAdsScreen"
        component={PublishAnAdUserAdsScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          tabBarLabelStyle: { color: COLORS.gray800 },
          headerTitle: "",
          title: "Publicar un anuncio",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="plus"
              type="evilicon"
              color={focused ? COLORS.indigo500 : COLORS.gray500}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllAdsUserAdsScreen"
        component={AllAdsUserAdsScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          tabBarLabelStyle: { color: COLORS.gray800 },
          headerTitle: "",
          title: "Anuncios",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="campaign"
              type="material"
              color={focused ? COLORS.indigo500 : COLORS.gray500}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileUserAdsScreen"
        component={ProfileUserAdsScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          tabBarLabelStyle: { color: COLORS.gray800 },
          headerTitle: "",
          title: "Perfil",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="cogs"
              type="font-awesome"
              color={focused ? COLORS.indigo500 : COLORS.gray500}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserAdsNavigation;
