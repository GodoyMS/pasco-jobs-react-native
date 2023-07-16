import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { clearCompany } from "@features/user/companySlice";
import { backendURL } from "@config/config";
import { COLORS, FONT, SIZES } from "@constants/theme";
const CompanyLogout = () => {

  const navigation=useNavigation()
  const dispatch=useDispatch()

  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}api/employers/logout`,{});
      dispatch(clearCompany());
      navigation.navigate("LoginCompanyScreen");
    } catch (error) {
      console.log(error);
      dispatch(clearCompany());
      navigation.navigate("LoginCompanyScreen");

    }
  };


  return (
    <View style={{gap:20,marginTop:60,marginBottom:20}}>
      <TouchableOpacity activeOpacity={0.9} style={styles.button}   mode="elevated" onPress={handleLogout}>
        <Text style={styles.text}>Cerrar sesión</Text>
        <Icon name="logout" type="material" color={COLORS.white}/>
      </TouchableOpacity>

     
    </View>
  );
};

export default CompanyLogout;

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
