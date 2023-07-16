import React, { useState } from "react";
import {
  Text,
  View,

  TouchableOpacity,
} from "react-native";
import { emailValidator } from "@helpers/emailValidator";

import axios from "axios";
import TextInput from "@components/login/TextInput";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "@config/config";

import FormLoader from "@components/loaders/FormLoader";


export const ResetPasswordCompanyScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);


  const[isSuccess,setIsSuccess]=useState(false);
  
  const dispatch = useDispatch();
  // const favJobsIdRedux = useSelector((state) => state.user.favUserJobs);

  const sendEmail = async () => {
    const emailError = emailValidator(email.value);

    if (emailError  ) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setIsLoading(true)
    setError(false)
    await axios.post(`${backendURL}api/employers/forgot-password`, {
      email: email.value,
    })
    
    .then(()=>setIsSuccess(true))
    .catch(()=>setError(true))
    .finally(()=>setIsLoading(false))
    
  };
  return (
    <View style={{ flex: 1, rowGap: 15 }}>
      <View style={{ height: 200, zIndex: 50, flexDirection: "column" }}></View>
      <View
        style={{
          flexDirection: "column",
          padding: 30,
          width: "100%",
          maxWidth: 340,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "left",
              fontFamily: FONT.medium,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              color: COLORS.gray800,
            }}
          >
            Ingresa tu correo
          </Text>
        </View>
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

       
       
        <View style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
        <TouchableOpacity
        disabled={isSuccess}
        activeOpacity={0.8}   
          style={{backgroundColor:isSuccess ?COLORS.green300 : COLORS.indigo700,paddingHorizontal:20,width:"100%",maxWidth:250,paddingVertical:15,borderRadius:15}}        

         
          onPress={sendEmail}
        >
          <Text style={{textAlign:"center",color:COLORS.white,fontFamily:FONT.bold}}>{isSuccess? "Enviado" : "Enviar"}</Text>
        </TouchableOpacity>           
        </View>
        {isSuccess && <Text style={{textAlign:"center",fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.gray600,marginTop:20}}>Revisa tu bandeja de entrada y haz click en el link enviado para restablecer tu contraseña</Text>}
        
        {error && <Text style={{textAlign:"center",fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.red600,marginTop:20}}>Ocurrió algo inesperado, si el problema persiste, comuníquese con soporte de ayuda</Text>}
        {
              isLoading && <View style={{ paddingTop: 30, paddingBottom: 10,flexDirection:"row" }}>
              <FormLoader isLoading={isLoading} />
            </View>
          }
        
        
      </View>
    </View>
  );
};

export default ResetPasswordCompanyScreen;

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    fontFamily: FONT.medium,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    fontFamily: FONT.regular,
  },
  forgot: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: FONT.regular,
  },
  link: {
    fontWeight: "bold",
    color: COLORS.indigo600,
    fontFamily: FONT.regular,
  },
  opacityLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 60,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust the opacity as desired
  },
});
