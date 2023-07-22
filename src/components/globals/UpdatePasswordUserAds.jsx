import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, Portal,  Button } from "react-native-paper";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import TextInput from "@components/login/TextInput";
import FormLoader from "@components/loaders/FormLoader";
import axios from "axios";
import { backendURL } from "@config/config";

const UpdatePasswordUserAds = ({ visiblePassword, dismiss,idApplicant }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
    const[isError,setIsError]=useState(false)
    
  const submitPassword=async()=>{
    if(password ==="" || confirmPassword ===""){
      setErrorPassword("Los campos no puede estar vacios")
      return
    }
    if(password !== confirmPassword){

          setErrorPassword("La confirmación de contraseña no coincide")
          return ;
    }
    setIsLoading(true);
    setIsError(false)
    axios.patch(`${backendURL}api/userAds/${idApplicant}`,{password})
    .then(()=>setIsSuccess(true))
    .then(()=>setIsLoading(false))
    .catch(()=>setIsError(true))
    .finally(()=>setIsLoading(false))

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
          Actualizar contraseña
        </Text>
        <TextInput
          label="Contraseña"
          returnKeyType="next"
          value={password}
          onChangeText={(text) =>{setPassword(text);setErrorPassword("")}}
          secureTextEntry
        />
        <TextInput
          label="Confirmar contraseña"
          returnKeyType="next"
          value={confirmPassword}
          onChangeText={(text) =>{ setConfirmPassword(text);setErrorPassword("")}}
          secureTextEntry
        />

        <Button
          onPress={submitPassword}
          style={{ backgroundColor: isSuccess ?COLORS.green400 :COLORS.tertiary, borderRadius: 10,marginTop:20 }}
          textColor="white"
          
        >
          { isSuccess ? "Actualizado" : "Confirmar" }
        </Button>

        {errorPassword && <Text style={{textAlign:"center",fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.red600}}>{errorPassword}</Text>}
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

export default UpdatePasswordUserAds;

const styles = StyleSheet.create({});
