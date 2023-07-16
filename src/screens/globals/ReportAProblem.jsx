import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { emailValidator } from "@helpers/emailValidator";
import FormLoader from "@components/loaders/FormLoader";

const ReportAProblem = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [text, setText] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitReport = async () => {
    const emailError = emailValidator(email.value);
    const textError = text.value==="" ? "Este campo no puede estar vacío" : "" 
    if (emailError || textError) {
      setEmail({ ...email, error: emailError });
      setText({ ...text, error: textError });

      return;
    }
    setIsLoading(true);
    setIsError(false);
    axios .post(`${backendURL}api/reports`, {
        email: email.value,
        message:text.value,
        phone:phone
      })
      .then(() => setIsSuccess(true))
      .then(() => setIsLoading(false))
      .then(()=>{setEmail({value:"",error:""});setText({value:"",error:""});setPhone("")})
      .catch((e) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ marginHorizontal: 10, flex: 1, marginTop: 80 }}>
        <Text
          style={{
            color: COLORS.indigo800,
            fontFamily: FONT.bold,
            fontSize: SIZES.xLarge,

            marginBottom: 20,
            marginHorizontal: 10,
          }}
        >
          Reportar un problema
        </Text>
        <View style={{ marginVertical: 12 }}>
          <TextInput
            label={"Email"}
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            style={{ backgroundColor: COLORS.primary }}
            mode="outlined"
            outlineColor={COLORS.tertiary}
          />
          {!!email.error && (
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
                color: COLORS.red600,
              }}
            >
              {email.error}
            </Text>
          )}
        </View>
        <View style={{ marginVertical: 6 }}>
          <TextInput
            label={"Mensaje"}
            style={{ backgroundColor: COLORS.primary }}
            returnKeyType="next"
            mode="outlined"
            value={text.value}
            error={!!text.error}
            onChangeText={(text) => setText({ value: text, error: "" })}
            outlineColor={COLORS.tertiary}
            multiline={true}
            numberOfLines={5}
          />
          {!!text.error && (
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
                color: COLORS.red600,
              }}
            >
              {text.error}
            </Text>
          )}
        </View>


        <View style={{ marginVertical: 6 }}>
          <TextInput
            label={"Teléfono (opcional)"}
            style={{ backgroundColor: COLORS.primary }}
            returnKeyType="done"
            mode="outlined"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            outlineColor={COLORS.tertiary}
            multiline={false}
            keyboardType="numeric"
          />
          
        </View>


        <Button
          onPress={submitReport}
          style={{
            backgroundColor: isSuccess ? COLORS.green400 : COLORS.tertiary,
            borderRadius: 10,
            marginTop: 20,
            paddingVertical: 5,
          }}
          labelStyle={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}
          textColor="white"
        >
          {isSuccess ? "Reporte enviado" : "Enviar"}
        </Button>

        {isError && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
              color: COLORS.red600,
            }}
          >
            Ocurrió algo inesperado, si el problema persiste, comuníquese directamente  pascojobsperu@gmail.com
          </Text>
        )}

        {isLoading && (
          <View style={{ paddingTop: 30, paddingBottom: 10 }}>
            <FormLoader isLoading={isLoading} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReportAProblem;

const styles = StyleSheet.create({});
