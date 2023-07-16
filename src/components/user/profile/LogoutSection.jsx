import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import axios from "axios";
import { backendURL } from "@config/config";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useDispatch } from "react-redux";
import { clearUser } from "@features/user/userSlice";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
const LogoutSection = () => {
  const dispatch=useDispatch()

  const navigation=useNavigation()
  


  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}api/applicants/logout`,{});
      dispatch(clearUser());
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
      dispatch(clearUser());
      navigation.navigate("LoginScreen");

    }
  };

  // const handleLogin = async () => {
  //   await axios
  //     .post(`${backendURL}api/applicants/login`,{email:"applicant1@gmail.com",password:"applicant1"},{withCredentials:"include"})
  //     .then(({ data }) => console.log(data))
  //     .catch((e)=>console.log(e))
  // };

  return (
    <View style={{gap:20,marginTop:30}}>
      <TouchableOpacity activeOpacity={0.9} style={styles.button}   mode="elevated" onPress={handleLogout}>
        <Text style={styles.text}>Cerrar sesión</Text>
        <Icon name="logout" type="material" color={COLORS.white}/>
      </TouchableOpacity>
{/* 
      <Button style={styles.button}   mode="elevated" onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
        <Icon name="logout" type="material" color={COLORS.white}/>
      </Button> */}
    </View>
  );
};

export default LogoutSection;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.gray900,
    marginHorizontal:30,   
  
    flexDirection:"row",
    columnGap:10,
    justifyContent:"space-between",
    paddingHorizontal:20,
    paddingVertical:20,
    borderRadius:8,
    alignItems:"center"
    
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  container:{
    marginTop:20
  }
});
