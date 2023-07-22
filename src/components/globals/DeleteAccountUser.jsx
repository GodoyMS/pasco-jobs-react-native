import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, Portal, PaperProvider, Button } from "react-native-paper";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import TextInput from "@components/login/TextInput";
import FormLoader from "@components/loaders/FormLoader";
import axios from "axios";
import { backendURL } from "@config/config";
import { emailValidator } from "@helpers/emailValidator";
import { useDispatch } from "react-redux";
import { clearUser } from "@features/user/userSlice";

const DeleteAccountUser = ({ visiblePassword, dismiss,idApplicant,navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
    const[isError,setIsError]=useState(false)
    const dispatch=useDispatch();
  const deleteAccount=async()=>{
    
    setIsLoading(true);
    setIsError(false)
    axios.delete(`${backendURL}api/applicants/${idApplicant}`)
    .then(()=>setIsLoading(false))
    .then(()=>dispatch(clearUser()))
    .then(()=>navigation.navigate("FirstScreen"))
    .catch((e)=>{setIsError(true)})
    .finally(()=>{setIsLoading(false);setTimeout(()=>setIsSuccess(false),2000)})

  }

  return (
    <Portal>
      <Modal
        visible={visiblePassword}
        onDismiss={dismiss}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 15,
        }}
      >
        <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
          ¿Eliminar cuenta? 
        </Text>

        <Text style={{textAlign:"justify",fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.gray600,marginTop:15}}> Esta acción es irreversible, se eliminará todos los datos de autenticación del usuario. Los datos de preferencias y ajustes de cuenta se borraran en 90 días</Text>
        <Button
          onPress={deleteAccount}
          disabled={isLoading}
          style={{ backgroundColor: COLORS.red600, borderRadius: 10,marginTop:20 }}
          textColor="white"          
        >
         Eliminar cuenta definitivamente
        </Button>

        {isError && <Text style={{textAlign:"center",fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.red600}}>Ocurrió algo inesperado, si el problema persiste, comuníquese con soporte de ayuda</Text>}

        {
            isLoading && <View style={{ paddingTop: 30, paddingBottom: 10 }}>
            <FormLoader isLoading={isLoading} />
          </View>
        }
        
      </Modal>
    </Portal>
  );
};

export default DeleteAccountUser;

const styles = StyleSheet.create({});
