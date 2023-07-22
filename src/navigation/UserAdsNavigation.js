import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";

import ProfileUserAdsScreen from "@screens/userAds/ProfileUserAdsScreen";
import PublishAnAdUserAdsScreen from "@screens/userAds/PublishAnAdUserAdsScreen";
import PublishedAdsUserAdsScreen from "@screens/userAds/PublishedAdsUserAdsScreen";
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
          headerTitle: "",
          title: "Mis anuncios",
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
        name="PublishAnAdUserAdsScreen"
        component={PublishAnAdUserAdsScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "Publicar un anuncio",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="campaign"
              type="material"
              color={focused ? color : COLORS.secondary}
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
          headerTitle: "",
          title: "Perfil",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="office-building-cog"
              type="material-community"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserAdsNavigation;
