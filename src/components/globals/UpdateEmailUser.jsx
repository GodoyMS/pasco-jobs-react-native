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

const UpdateEmailUser = ({ visiblePassword, dismiss,idApplicant }) => {

  const[email,setEmail]=useState({value:"",error:""})
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
    const[isError,setIsError]=useState(false)
    
  const submitPassword=async()=>{
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    setIsLoading(true);
    setIsError(false)
    axios.patch(`${backendURL}api/applicants/${idApplicant}`,{email:email.value})
    .then(()=>setIsSuccess(true))
    .then(()=>setIsLoading(false))
    .catch((e)=>{setIsError(true)})
    .finally(()=>{setIsLoading(false)})

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
          Actualizar correo electrónico
        </Text>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
       

        <Button
          onPress={submitPassword}
          style={{ backgroundColor: isSuccess ?COLORS.green400 :COLORS.tertiary, borderRadius: 10,marginTop:20 }}
          textColor="white"
          
        >
          { isSuccess ? "Actualizado" : "Confirmar" }
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

export default UpdateEmailUser;

const styles = StyleSheet.create({});
