import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React,{useState} from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import {   PaperProvider } from 'react-native-paper';
import { useSelector } from "react-redux";
import UpdatePasswordCompany from "@components/globals/UpdatePasswordCompany";
import UpdateEmailCompany from "@components/globals/UpdateEmailCompany";
import DeleteAccountCompany from "@components/globals/DeleteAccountCompany";
import { SafeAreaView } from "react-native";
import UpdatePasswordUserAds from "@components/globals/UpdatePasswordUserAds";
import UpdateEmailUserAds from "@components/globals/UpdateEmailUserAds";
import DeleteAccountUserAds from "@components/globals/DeleteAccountUserAds";

const AccountManagerUserAds = ({navigation}) => {
  const[visiblePassword,setVisiblePassword]=useState(false)
  const[visibleEmail,setVisibleEmail]=useState(false)
  const[visibleAccountDelete,setVisibleAccountDelete]=useState(false)



  const userAds=useSelector((state)=>state.userads.infoUserAds)
  console.log("xdxdxdxdxd"+userAds)
  return (

    <PaperProvider>

    <SafeAreaView style={{ flex: 1}}>

     


      <UpdatePasswordUserAds idApplicant={userAds?.id ? userAds?.id : ""} visiblePassword ={visiblePassword}  dismiss={()=>setVisiblePassword(false)} />
      <UpdateEmailUserAds  idApplicant={userAds?.id ? userAds?.id : ""} visiblePassword ={visibleEmail}  dismiss={()=>setVisibleEmail(false)}  />
      <DeleteAccountUserAds navigation={navigation} idApplicant={userAds?.id ? userAds?.id : ""} visiblePassword ={visibleAccountDelete}  dismiss={()=>setVisibleAccountDelete(false)} />
     
     
      <View style={{ marginHorizontal: 10, flex: 1 }}>
        <Text
          style={{
            color: COLORS.indigo800,
            fontFamily: FONT.bold,
            fontSize: SIZES.xLarge,
            marginTop: 60,
            marginBottom: 20,
            marginHorizontal: 10,
          }}
        >
          Cuenta
        </Text>

        <View style={{ flexDirection: "column", rowGap: 20,marginTop:20 }}>
        <TouchableOpacity
        onPress={()=>setVisibleEmail(true)}
            style={{
              borderColor: COLORS.indigo100,
              borderBottomWidth:1,
              flexDirection: "row",
              columnGap: 10,
              justifyContent: "space-between",
              paddingHorizontal:10,
              paddingVertical:10,
              alignItems:"center"
            }}
          >
            <Text style={{fontFamily:FONT.bold,color:COLORS.gray800,fontSize:SIZES.medium}}>Dirección de correo electrónico</Text>
            <Icon name="email" color={COLORS.gray700} type="material-community" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>setVisiblePassword(true)}
            style={{
              borderColor: COLORS.indigo100,
              borderBottomWidth:1,
              flexDirection: "row",
              columnGap: 10,
              justifyContent: "space-between",
              paddingHorizontal:10,
              paddingVertical:10,
              alignItems:"center"
            }}
          >
            <Text style={{fontFamily:FONT.bold,color:COLORS.gray800,fontSize:SIZES.medium}}>Contraseña</Text>
            <Icon name="lock" color={COLORS.gray700} type="entypo" />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>setVisibleAccountDelete(true)}
            style={{
              borderColor: COLORS.indigo100,
              borderBottomWidth:1,
              flexDirection: "row",
              columnGap: 10,
              justifyContent: "space-between",
              paddingHorizontal:10,
              paddingVertical:10,
              alignItems:"center"
            }}
          >
            <Text style={{fontFamily:FONT.bold,color:COLORS.red800,fontSize:SIZES.medium}}>Eliminar Cuenta</Text>
            <Icon name="account-remove" color={COLORS.red900} type="material-community" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </PaperProvider>

  );
};

export default AccountManagerUserAds;

const styles = StyleSheet.create({});
