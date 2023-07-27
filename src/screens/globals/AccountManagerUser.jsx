import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React,{useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import { Modal, Portal,  PaperProvider } from 'react-native-paper';
import UpdatePasswordUser from "@components/globals/UpdatePasswordUser";
import { useSelector } from "react-redux";
import UpdateEmailUser from "@components/globals/UpdateEmailUser";
import DeleteAccountUser from "@components/globals/DeleteAccountUser";
import { StatusBar } from "expo-status-bar";

const AccountManagerUser = ({navigation}) => {
  const[visiblePassword,setVisiblePassword]=useState(false)
  const[visibleEmail,setVisibleEmail]=useState(false)
  const[visibleAccountDelete,setVisibleAccountDelete]=useState(false)
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,marginHorizontal:20};

  const user=useSelector((state)=>state.user.infoUser)
  return (

    <PaperProvider>
      <StatusBar/>

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>

     <Portal>
        <Modal visible={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>


      <UpdatePasswordUser idApplicant={user?.id ? user?.id : ""} visiblePassword ={visiblePassword}  dismiss={()=>setVisiblePassword(false)} />
      <UpdateEmailUser  idApplicant={user?.id ? user?.id : ""} visiblePassword ={visibleEmail}  dismiss={()=>setVisibleEmail(false)}  />
      <DeleteAccountUser navigation={navigation} idApplicant={user?.id ? user?.id : ""} visiblePassword ={visibleAccountDelete}  dismiss={()=>setVisibleAccountDelete(false)} />
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

export default AccountManagerUser;

const styles = StyleSheet.create({});
