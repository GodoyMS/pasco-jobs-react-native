import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransitionPresets } from "@react-navigation/stack";
import FirstScreen from "@screens/FirstScreen";
import LoginScreen from "@screens/auth/LoginScreen";
import RegisterScreen from "@screens/auth/RegisterScreen";
import LoginCompanyScreen from "@screens/auth/LoginCompanyScreen";
import RegisterCompanyScreen from "@screens/auth/RegisterCompanyScreen";
import JobDetailsUserScreen from "@screens/user/JobDetailsScreen";
import UserNavigation from "./UserNavigation";
import { Icon } from "@rneui/themed";
import { COLORS } from "@constants/theme";
import CompanyNavigation from "./CompanyNavigation";
import { useEffect } from "react";
import EditProfileUserScreen from "@screens/user/account/EditProfileUserScreen";
import EditCvUserScreen from "@screens/user/account/EditCvUserScreen";
import JobDetailsCompanyScreen from "@screens/company/JobDetailsCompanyScreen";
import JobApplicantsCompanyScreen from "@screens/company/JobApplicantsCompanyScreen";
import EditCompanyProfileScreen from "@screens/company/account/EditCompanyProfileScreen";
import InformationCompanyScreen from "@screens/globals/InformationCompanyScreen";
import InformationUserScreeen from "@screens/globals/InformationUserScreeen";
import ContactPascoJobsScreen from "@screens/globals/ContactPascoJobsScreen";
import ReportAProblem from "@screens/globals/ReportAProblem";
import ContactDeveloperScreen from "@screens/globals/ContactDeveloperScreen";
import AccountManagerUser from "@screens/globals/AccountManagerUser";
import AccountManagerCompany from "@screens/globals/AccountManagerCompany";
import ResetPasswordCompanyScreen from "@screens/auth/ResetPasswordCompanyScreen";
import ResetPasswordUserScreen from "@screens/auth/ResetPasswordUserScreen";
import CompanyProfileUserScreen from "@screens/user/CompanyProfileUserScreen";
import CompanyProfileCompanyScreen from "@screens/company/CompanyProfileCompanyScreen";
import ApplicantProfileCompanyScreen from "@screens/company/ApplicantProfileCompanyScreen";
import UserAdsNavigation from "./UserAdsNavigation";
import RegisterUserAdsScreen from "@screens/auth/RegisterUserAdsScreen";
import LoginUserAdsScreen from "@screens/auth/LoginUserAdsScreen";
import ResetPasswordUserAdsScreen from "@screens/auth/ResetPasswordUserAdsScreen";
import EditUserAdsAccountProfileScreen from "@screens/userAds/account/EditUserAdsAccountProfileScreen";
import AccountManagerUserAds from "@screens/globals/AccountManagerUserAds";
import FavoritesUserScreen from "@screens/user/FavoritesUserScreen";
import ApplicantProfileScreenGlobal from "@screens/globals/ApplicantProfileScreenGlobal";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={TransitionPresets.SlideFromRightIOS}
      initialRouteName="FirstScreen"
    >
      <Stack.Screen
        name="FirstScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={FirstScreen}
      />

      <Stack.Screen
        name="LoginScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={RegisterScreen}
      />

      <Stack.Screen
        name="ResetPasswordCompanyScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={ResetPasswordCompanyScreen}
      />

      <Stack.Screen
        name="ResetPasswordUserScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={ResetPasswordUserScreen}
      />

      {/**GLOBAL ACCOUNT */}

      {/**USER */}

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="InformationCompanyScreen"
        component={InformationCompanyScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="InformationUserScreeen"
        component={InformationUserScreeen}
      />
            <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="FavoritesUserScreen"
        component={FavoritesUserScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="AccountManagerUser"
        component={AccountManagerUser}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="AccountManagerCompany"
        component={AccountManagerCompany}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="ReportAProblem"
        component={ReportAProblem}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="ContactPascoJobsScreen"
        component={ContactPascoJobsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="ContactDeveloperScreen"
        component={ContactDeveloperScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="JobDetails"
        component={JobDetailsUserScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="CompanyProfileUserScreen"
        component={CompanyProfileUserScreen}
      />

      <Stack.Screen
        name="EditUserProfileScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={EditProfileUserScreen}
      />
      <Stack.Screen
        name="EditCvUserScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={EditCvUserScreen}
      />

      <Stack.Screen
        name="User"
        component={UserNavigation}
        options={{ headerShown: false }}
      />

      {/**USERADS */}
      <Stack.Screen
        name="UserAds"
        component={UserAdsNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterUserAdsScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={RegisterUserAdsScreen}
      />

      <Stack.Screen
        name="LoginUserAdsScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={LoginUserAdsScreen}
      />

      <Stack.Screen
        name="ResetPasswordUserAdsScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={ResetPasswordUserAdsScreen}
      />
      <Stack.Screen
        name="EditUserAdsAccountProfileScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={EditUserAdsAccountProfileScreen}
      />

<Stack.Screen
        name="AccountManagerUserAds"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={AccountManagerUserAds}
      />
      {/**COMPANY */}

      <Stack.Screen
        name="Company"
        component={CompanyNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="JobDetailsCompany"
        component={JobDetailsCompanyScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="CompanyProfileCompanyScreen"
        component={CompanyProfileCompanyScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="ApplicantProfileCompanyScreen"
        component={ApplicantProfileCompanyScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="JobApplicantsCompany"
        component={JobApplicantsCompanyScreen}
      />

      
<Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        name="ApplicantProfileScreenGlobal"
        component={ApplicantProfileScreenGlobal}
      />

      <Stack.Screen
        name="EditCompanyProfileScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={EditCompanyProfileScreen}
      />

      <Stack.Screen
        name="LoginCompanyScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={LoginCompanyScreen}
      />
      <Stack.Screen
        name="RegisterCompanyScreen"
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={RegisterCompanyScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
