import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileUserScreen from "@screens/user/ProfileUserScreen";
import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";
import PublishAJobCompanyScreen from "@screens/company/PublishAJobCompanyScreen";
import PublishedJobsCompanyScreen from "@screens/company/PublishedJobsCompanyScreen";
import ApplicantsViewCompanyScreen from "@screens/company/ApplicantsViewCompanyScreen";
import ProfileCompanyScreen from "@screens/company/ProfileCompanyScreen";
const Tab = createBottomTabNavigator();

const CompanyNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeCompany"
        component={PublishedJobsCompanyScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "Trabajos",
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
        name="PublishJobCompany"
        component={PublishAJobCompanyScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "Publicar un trabajo",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="add-circle"
              type="material  "
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="ApplicantsViewCompany"
        component={ApplicantsViewCompanyScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
          title: "Profesionales",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="users"
              type="font-awesome-5"
              color={focused ? color : COLORS.secondary}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="ProfileCompany"
        component={ProfileCompanyScreen}
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

export default CompanyNavigation;
