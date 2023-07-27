import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  Portal,
  Button as ButtonModal,
  Modal,
  Checkbox,
} from "react-native-paper";
import TextInput from "@components/login/TextInput";
import Button from "@components/login/Button";
import axios from "axios";
import { emailValidator } from "@helpers/emailValidator";
import { passwordValidator } from "@helpers/passwordValidator";
import { nameValidator } from "@helpers/nameValidator";
import { confirmPasswordValidator } from "@helpers/confirmPasswordValidator";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import useRegister from "@hooks/user/auth/register";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import { positionValidator } from "@helpers/positionValidator";
import { descriptionValidator } from "@helpers/descriptionValidator";
import { ageValidator } from "@helpers/ageValidator";
import { backendURL } from "@config/config";
const FormRegistrationUserStep = ({ step, setStep, navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [position, setPosition] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState("");

  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");

  const [age, setAge] = useState({ value: "", error: "" });
  const [sex, setSex] = useState({ value: "Hombre", error: "" });

  const [profileImageLink, setProfileImageLink] = useState("");
  const [cvDocumentLink, setCvDocumentLink] = useState("");

  const [profileImageBase64, setProfileImageBase64] = useState("");
  const [cvDocumentBase64, setCvDocumentBase64] = useState("");

  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);


  const[isCvError,setIsCvError]=useState(false)
  const[isImageError,setIsImageError]=useState(false)

  const hideModal = () => {
    setVisibleModal(false);
    navigation.navigate("LoginScreen");
  };

  const onSignUpPressed = async () => {
    setIsCvError("")
    setIsImageError("")

    const imgError=(profileImageBase64 && !profileImageLink) ? "Guarda tu imagen de perfil" : ""
    const cvError=(cvDocumentBase64 && !cvDocumentLink) ? "Guarda tu cv" : ""

    if(imgError || cvError ){
      setIsImageError(imgError)
      setIsCvError(cvError)
      return;
    }
    setIsLoading(true);
    await axios
      .post(`${backendURL}api/applicants`, {
        name: name.value,
        email: email.value,
        password: password.value,
        age: age.value,
        description: description.value,
        district: district,
        province: province,
        position: position.value,
        region: "Pasco",
        sex: sex.value,
        profile: profileImageLink,
        cv: cvDocumentLink,
      })
      .then(() => setIsRegister(true))
      .then(() => setIsLoading(false))
      .then(() => setVisibleModal(true))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  const handleNextStep = () => {
    if (step === 1) {
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      const confirmPasswordError = confirmPasswordValidator(
        password.value,
        confirmPassword.value
      );

      if (emailError || passwordError || nameError || confirmPasswordError) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });

        return;
      }
      setStep(2);
    }
    if (step === 2) {
      const positionError = positionValidator(position.value);
      const descriptionError = descriptionValidator(description.value);
      const ageError = ageValidator(age.value);
      const provinceError = province ? "" : "Selecciona una provincia";
      const districtError = district ? "" : "Selecciona un distrito";

      if (
        positionError ||
        descriptionError ||
        ageError ||
        provinceError ||
        districtError
      ) {
        setDistrictError(districtError);
        setProvinceError(provinceError);
        setPosition({ ...position, error: positionError });
        setDescription({ ...description, error: descriptionError });
        setAge({ ...age, error: ageError });
        return;
      }
      setStep(3);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        maxWidth: step === 3 ? 600 : 400,
        justifyContent: "center",
        padding: 20,
        alignSelf: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Portal>
        <Modal
          visible={visibleModal}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: COLORS.indigo100,
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: FONT.medium }}>
            Usuario registrado con éxito, ahora puedes iniciar sesión
          </Text>
          <View style={{ marginTop: 20 }}>
            <ButtonModal
              style={{
                backgroundColor: COLORS.tertiary,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 20,
                marginHorizontal: "auto",
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={{ color: COLORS.white }}>Iniciar Sesión</Text>
            </ButtonModal>
          </View>
        </Modal>
      </Portal>

      {step === 1 && (
        <>
          {/* <Text style={{fontFamily:FONT.medium,color:COLORS.gray700}}>Tus datos introducidos te ayudara </Text> */}
          <TextInput
            label="Nombre"
            returnKeyType="next"
            selectionColor={COLORS.gray800}
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
            secureTextEntry={!visiblePass}

          />
          <TextInput
            label="Confirmar contraseña"
            returnKeyType="done"
            value={confirmPassword.value}
            onChangeText={(text) =>
              setConfirmPassword({ value: text, error: "" })
            }
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry={!visiblePass}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              columnGap: 4,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Checkbox
              color={COLORS.tertiary}
              theme={"light"}
              status={visiblePass ? "checked" : "unchecked"}
              onPress={() => {
                setVisiblePass(!visiblePass);
              }}
            />
            <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.xSmall }}>
              {visiblePass ? "Ocultar contraseña" : "Mostrar contraseña"}
            </Text>
          </View>
        </>
      )}

      {step === 2 && (
        <>
          <Step2Form
            position={position}
            setPosition={setPosition}
            age={age}
            setAge={setAge}
            description={description}
            setDescription={setDescription}
            sex={sex}
            districtError={districtError}
            setDistrictError={setDistrictError}
            provinceError={provinceError}
            setProvinceError={setProvinceError}
            setSex={setSex}
            province={province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Step3Form
            profileImageBase64={profileImageBase64}
            setProfileImageBase64={setProfileImageBase64}
            profileImageLink={profileImageLink}
            setProfileImageLink={setProfileImageLink}
            cvDocumentBase64={cvDocumentBase64}
            setCvDocumentBase64={setCvDocumentBase64}
            cvDocumentLink={cvDocumentLink}
            setCvDocumentLink={setCvDocumentLink}
            sex={sex}
            isLoading={isLoading}
            name={name}
            description={description}
            position={position}
            isCvError={isCvError}
            setIsCvError={setIsCvError}
            isImageError={isImageError}
            setIsImageError={setIsImageError}
          />
        </>
      )}

      {step <= 3 && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            justifyContent: "space-between",
            width: "100%",
            columnGap: 10,
          }}
        >
          {step > 1 && step <= 3 && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                columnGap: 10,
                flex: 1,
                maxWidth: 200,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
              underlayColor={COLORS.gray800}
              activeOpacity={0.5}
              onPress={() => setStep(step - 1)}
            >
              <Icon name="arrow-back" color={COLORS.gray800} type="ionsicon" />

              <Text style={{ color: COLORS.gray700 }}>Atras</Text>
            </TouchableOpacity>
          )}

          {step >= 1 && step <= 2 && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                maxWidth: 200,
                columnGap: 10,
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
              underlayColor={COLORS.gray800}
              activeOpacity={0.5}
              onPress={handleNextStep}
            >
              <Text style={{ color: COLORS.gray700 }}>Siguiente</Text>
              <Icon name="arrow-forward" color={COLORS.gray700} type="ionsicon" />
            </TouchableOpacity>
          )}
        </View>
      )}
      {isLoading && <ActivityIndicator />}
      {step === 3 && (
        <>
          <Button
            disabled={isLoading}
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 20, fontFamily: FONT.medium }}
          >
            Registrarse
          </Button>
          {isImageError && <Text
                style={{
                  marginBottom: 10,
                  fontFamily: FONT.medium,
                  color: COLORS.red600,
                }}
              >
               {isImageError}
              </Text> }
              {isCvError && <Text
                style={{
                  marginBottom: 10,
                  fontFamily: FONT.medium,
                  color: COLORS.red600,
                }}
              >
               {isCvError}
              </Text> }
          <View style={styles.row}>
            <Text style={{ fontFamily: FONT.regular }}>
              ¿Ya tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text style={styles.link}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default FormRegistrationUserStep;

const styles = StyleSheet.create({});
