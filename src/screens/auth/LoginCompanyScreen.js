import React, { useState } from "react";
import Background from "@components/login/Background";
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Button from "@components/login/Button";
import { emailValidator } from "@helpers/emailValidator";
import { passwordValidator } from "@helpers/passwordValidator";

import TextInput from "@components/login/TextInput";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import loginBackground from "@assets/images/loginbg.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCompany } from "@features/user/companySlice";
import { backendURL } from "@config/config";
import { clearUser } from "@features/user/userSlice";
export const LoginCompanyScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const[isLoading,setIsLoading]=useState(false)
  const [error, setError] = useState(false);

  const dispatch=useDispatch();

  const onLoginPressed = async () => {

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

  setIsLoading(true)
    setError(false)
    await axios
      .post(
        `${backendURL}api/employers/login`,
        {
          email: email.value,
          password: password.value,
        }
      )

      .then(({ data }) => {dispatch(setCompany(data));dispatch(clearUser())})
      .then(() => setIsLoading(false))

      .then(() => navigation.replace("Company"))
      .catch((e) => {
        setError(true);
      
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <View style={{ flex: 1, rowGap: 15 }}>
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
                <View style={{ height: 200, zIndex: 50, flexDirection: "column" }}>
        {/* <ImageBackground
          source={loginImage}
          resizeMode="cover"
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <View style={styles.opacityLayer} />

          <Text
            style={{
              textAlign: "left",
              fontFamily: FONT.medium,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              color: COLORS.gray50,
              zIndex: 70,
              marginBottom: 10,
            }}
          >
            Ingresa a tu cuenta
          </Text>
        </ImageBackground> */}
      </View>
          <Text
            style={{
              textAlign: "left",
              fontFamily: FONT.medium,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              color: COLORS.gray800,
            }}
          >
            Ingresa a tu cuenta
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
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPasswordCompanyScreen")}
          >
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View>
          {isLoading && <ActivityIndicator/>}
        </View>
        <Button
          style={{ fontFamily: FONT.medium }}
          mode="contained"
          onPress={onLoginPressed}
        >
          Entrar
        </Button>
        {error && <Text style={{fontFamily:FONT.medium,color:COLORS.red700,fontSize:SIZES.small,textAlign:"center"}}>Contraseña o correo incorrecto</Text>}

        <View style={styles.row}>
          <Text style={{ fontFamily: FONT.regular }}>
            ¿No tienes una cuenta aun?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterCompanyScreen")}
          >
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>
        </View>
       
      </View>
    </>
  );
};

export default LoginCompanyScreen;

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
});
