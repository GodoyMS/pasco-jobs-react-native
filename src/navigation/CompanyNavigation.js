import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileUserScreen from "@screens/user/ProfileUserScreen";
import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";
import PublishAJobCompanyScreen from "@screens/company/PublishAJobCompanyScreen";
import PublishedJobsCompanyScreen from "@screens/company/PublishedJobsCompanyScreen";
import ApplicantsViewCompanyScreen from "@screens/company/ApplicantsViewCompanyScreen";
import ProfileCompanyScreen from "@screens/company/ProfileCompanyScreen";
import AllCompaniesUserScreen from "@screens/user/AllCompaniesUserScreen";
import AllApplicantsCompanyScreen from "@screens/company/AllApplicantsCompanyScreen";
import AllCompaniesCompanyScreen from "@screens/company/AllCompaniesCompanyScreen";
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
            color={focused ? COLORS.indigo500 : COLORS.gray500}
            />
          ),
        }}
      />
            <Tab.Screen
        name="AllCompaniesCompanyScreen"
        component={AllCompaniesCompanyScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,

          headerTitle: "",
          title: "Empresas",
          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
            name="building"
            type="font-awesome"
            color={focused ? COLORS.indigo500 : COLORS.gray500}
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
              color={focused ? COLORS.indigo500 : COLORS.gray500}
              />
          ),
        }}
      />
            <Tab.Screen
        name="AllApplicantsCompanyScreen"
        component={AllApplicantsCompanyScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: true,

          headerTitle: "",
          title: "Profesionales",

          tabBarIcon: ({ color = COLORS.primary, focused }) => (
            <Icon
              name="users"
              type="font-awesome-5"
              color={focused ? COLORS.indigo500 : COLORS.gray500}
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
              name="cogs"
              type="font-awesome-5"
              color={focused ? COLORS.indigo500 : COLORS.gray500}
              />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CompanyNavigation;
