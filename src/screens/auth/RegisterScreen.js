
import {

  View,

  ScrollView,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useState } from "react";

import {

  PaperProvider,
} from "react-native-paper";

import FormRegistrationUserStep from "@components/user/register/FormRegistrationUserStep";
import StepHeader from "@components/user/register/StepHeader";

const Stack = createStackNavigator();

export const RegisterScreen = ({ navigation }) => {

  const[stepForm,setStepForm]=useState(1)

  return (
    <>
      <PaperProvider>
        <ScrollView 
          style={{ flex: 1, width: "100%", backgroundColor: COLORS.lightWhite }}
        >

          <View
            style={{
              flexDirection: "row",
              
              justifyContent: "center",
              padding: 20,
              alignSelf: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 100,
              columnGap: 15,
            }}
          >
            <StepHeader title={"Autenticacion"} currentStep={1} subTitle={"Datos de sesion"} stepForm={stepForm}/>
            <StepHeader title={"General"} currentStep={2} subTitle={"Datos Generales"} stepForm={stepForm}/>
            <StepHeader title={"Perfil"} currentStep={3} subTitle={"CV "} stepForm={stepForm}/>

           
          </View>

          <FormRegistrationUserStep step={stepForm} setStep={setStepForm} navigation={navigation}/>

         
        </ScrollView>
      </PaperProvider>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    color: COLORS.indigo500,
    fontFamily: FONT.medium,
  },
  buttonModalConfirmation: {
    backgroundColor: COLORS.indigo400,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: "auto",
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONT.medium,
  },
});
