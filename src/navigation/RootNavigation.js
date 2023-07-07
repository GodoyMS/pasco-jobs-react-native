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

      <Stack.Screen name="JobDetails" component={JobDetailsUserScreen} />
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

      <Stack.Screen
        name="Company"
        component={CompanyNavigation}
        options={{ headerShown: false }}
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
