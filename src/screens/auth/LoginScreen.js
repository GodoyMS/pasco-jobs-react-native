import React, { useState } from "react";
import Background from "@components/login/Background";
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
import loginBackground from "@assets/images/loginbg3.jpg";
import axios from "axios";
import TextInput from "@components/login/TextInput";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { addAllFavoriteJobs, setUser } from "@features/user/userSlice";
import { backendURL } from "@config/config";
import loginImage from "@assets/images/GodoyMS_a_job_agency_company_in_building_process_in_the_middle__cbe54923-f429-4ab7-9a9e-fa51da4d2c8d.jpg";
import { clearCompany } from "@features/user/companySlice";
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);

  const dispatch = useDispatch();
  // const favJobsIdRedux = useSelector((state) => state.user.favUserJobs);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const currentJobsId = [];

    await axios
      .post(
        `${backendURL}api/applicants/login`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: "include" }
      )

      .then(({ data }) => {dispatch(setUser(data));dispatch(clearCompany())})
      .then(() => setIsLoggedIn(true))
      .then(() => setIsLoading(false))
      .then(() => {
        setVisibleModal(true);
      })
      .then(() => {
        axios
          .get(`${backendURL}api/favoriteJobs`, {
            withCredentials: "include",
          })
          .then(({ data }) => {
            console.log(data.docs);
            data.docs.map((e) => currentJobsId.push(e.job.id));
          })
          .then(() => dispatch(addAllFavoriteJobs(currentJobsId)))
          .catch((e) => console.log(e));
      })
      .then(() => navigation.navigate("User"))
      .catch((e) => {
        setError(e);
        console.log(e);
        return null;
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <View style={{ flex: 1, rowGap: 15 }}>
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
        {/* <View>
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
        </View> */}
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
            onPress={() => navigation.navigate("ResetPasswordScreen")}
          >
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <Button
          style={{ fontFamily: FONT.medium }}
          mode="contained"
          onPress={onLoginPressed}
        >
          Entrar
        </Button>
        <View style={styles.row}>
          <Text style={{ fontFamily: FONT.regular }}>
            ¿No tienes una cuenta aun?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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