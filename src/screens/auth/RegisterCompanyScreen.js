import Background from "@components/login/Background";
import axios from "axios";
import { backendURL } from "@config/config";
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Button from "@components/login/Button";
import { emailValidator } from "@helpers/emailValidator";
import { passwordValidator } from "@helpers/passwordValidator";
import { createStackNavigator } from "@react-navigation/stack";
import TextInput from "@components/login/TextInput";
import { StyleSheet } from "react-native";
import { COLORS, FONT,SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { nameValidator } from "@helpers/nameValidator";
import useRegister from "@hooks/user/auth/register";

import {
  Modal,
  Portal,
  Text as TextModal,
  Button as ButtonModal,
  PaperProvider,
} from "react-native-paper";
import loginBackground from "@assets/images/loginbg.png"

const Stack = createStackNavigator();

export const RegisterCompanyScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const [visibleModal, setVisibleModal] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const hideModal = () => {
    setVisibleModal(false);
    navigation.navigate("LoginScreen");
  };

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    await axios
      .post(`${backendURL}api/applicants`, { name:name.value, email:email.value, password:password.value })
      .then(() => setIsRegister(true))
      .then(() => setIsLoading(false))
      .then(()=>setVisibleModal(true))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <PaperProvider>
        <Background backgroundImage={loginBackground} >
        <View style={{width:"100%"}} >
          <Text style={{textAlign:"left",fontFamily:FONT.medium,fontSize:SIZES.xLarge,fontWeight:"bold",color:COLORS.gray800 }}>Regístrate</Text>

        </View>
          <Portal>
            <Modal
              visible={visibleModal}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: COLORS.indigo100,
                padding: 20,
                marginHorizontal: 20,
                borderRadius:10,
                
              }}
            >
              <Text style={{fontFamily:FONT.medium}}>
                Usuario registrado con éxito, ahora puedes iniciar sesión
              </Text>
              <View style={{marginTop:20}}>
                <ButtonModal style={styles.buttonModalConfirmation} onPress={()=>navigation.navigate("LoginScreen")}><Text style={styles.textButton}>Iniciar Sesión</Text></ButtonModal>
              </View>
            </Modal>
          </Portal>
          <TextInput
            label="Nombre"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            error={!!name.error}
            errorText={name.error}
          />
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
            label="Contraseña"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24,fontFamily:FONT.medium }}
          >
            Registrarse
          </Button>
          <View style={styles.row}>
            <Text style={{fontFamily:FONT.regular}}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.replace("LoginCompanyScreen")}>
              <Text style={styles.link}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </PaperProvider>
    </>
  );
};

export default RegisterCompanyScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    color: COLORS.indigo500,
    fontFamily:FONT.medium
  },
  buttonModalConfirmation:{
    backgroundColor:COLORS.indigo400,
    paddingHorizontal:10,
    paddingVertical:3,
    borderRadius:20,
    flex:1,
    marginHorizontal:"auto"
  },
  textButton:{
    color: COLORS.white,
    fontFamily:FONT.medium

  }
});
