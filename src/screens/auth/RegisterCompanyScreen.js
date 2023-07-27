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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Button from "@components/login/Button";
import { emailValidator } from "@helpers/emailValidator";
import { passwordValidator } from "@helpers/passwordValidator";
import { createStackNavigator } from "@react-navigation/stack";
import TextInput from "@components/login/TextInput";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { nameValidator } from "@helpers/nameValidator";
import useRegister from "@hooks/user/auth/register";
import { SelectList } from "react-native-dropdown-select-list";
import provincesDistricts from "@data/data.json";

import {
  Modal,
  Portal,
  Text as TextModal,
  Button as ButtonModal,
  PaperProvider,
  Checkbox,
} from "react-native-paper";
import loginBackground from "@assets/images/loginbg.png";
import { Image } from "react-native";

const Stack = createStackNavigator();

export const RegisterCompanyScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [heading, setHeading] = useState({ value: "", error: "" });

  const [visibleModal, setVisibleModal] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //LOCATION
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");

  //PROFILE IMAGE
  const [profileImageLink, setProfileImageLink] = useState("");
  const [profileImageBase64, setProfileImageBase64] = useState("");

  //SHOW PASS
  const [visiblePass, setVisiblePass] = useState(false);


  const[isImageSavedToSubmitError,setIsImageSavedToSubmitError]=useState("")

  const handleImagePicker = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied to access media library");
        return;
      }

      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        aspect: [4, 4],
        allowsEditing: true,
      }).then((e) => setProfileImageBase64(e.assets[0].base64));
      // .then(
      //    () =>
      //      axios
      //       .post(`${backendURL}api/profilesupload/upload`, {
      //         base64: `data:image/png;base64,${profileImageBase64}`,
      //         name: `perfil`,
      //       })
      //       .then((a) => setProfileImageLink(a.data.url))
      // );
    } catch (error) {
      console.log("Error selecting image:", error);
      // Handle the error if needed
    }
  };
  const handleImageUpload = async () => {
    await axios
      .post(`${backendURL}api/profilesupload/upload`, {
        base64: `data:image/png;base64,${profileImageBase64}`,
        name: name.value,
      })
      .then(({ data }) => setProfileImageLink(data.url))
      .catch((e) => console.log(e));
  };

  const hideModal = () => {
    setIsRegister(false);
    navigation.navigate("LoginCompanyScreen");
  };

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const descriptionError = description.value
      ? ""
      : "Realiza una descripción de tu empresa";
    const headingError = heading.value ? "" : "Escribe el rubro de tu empresa";
    const provinceError = province ? "" : "Selecciona una provincia";
    const districtError = district ? "" : "Selecciona un distrito";
    const imageSavedToSubmitError=(profileImageBase64&& !profileImageLink) ? "Guarda tu imágen"  : ""


    if (
      emailError ||
      passwordError ||
      nameError ||
      descriptionError ||
      headingError ||
      provinceError ||
      districtError ||
      imageSavedToSubmitError
    ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setDescription({ ...description, error: descriptionError });
      setHeading({ ...heading, error: headingError });
      setDistrictError(districtError);
      setProvinceError(provinceError);
      setIsImageSavedToSubmitError(imageSavedToSubmitError)

      return;
    }
    setIsLoading(true);
    await axios
      .post(`${backendURL}api/employers`, {
        name: name.value,
        email: email.value,
        password: password.value,
        region: "Pasco",
        province: province,
        district: district,
        description: description.value,
        heading: heading.value,
        profile: profileImageLink,
      })
      .then(() => setIsRegister(true))
      .then(() => setIsLoading(false))
      .then(() => setVisibleModal(true))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <PaperProvider>
        <ScrollView
          style={{ flex: 1, width: "100%", backgroundColor: COLORS.lightWhite }}
        >
          <View
            style={{
              flexDirection: "column",
              maxWidth: 400,
              justifyContent: "center",
              padding: 20,
              alignSelf: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={{ width: "100%", marginTop: 100 }}>
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: FONT.medium,
                  fontSize: SIZES.xLarge,
                  fontWeight: "bold",
                  color: COLORS.gray800,
                }}
              >
                Registrar empresa
              </Text>
            </View>
            <Portal>
              <Modal
                visible={isRegister}
                onDismiss={hideModal}
                contentContainerStyle={{
                  backgroundColor: COLORS.indigo100,
                  padding: 20,
                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontFamily: FONT.medium }}>
                  Empresa registrada con éxito, ahora puedes iniciar sesión
                </Text>
                <View style={{ marginTop: 20 }}>
                  <ButtonModal
                    style={styles.buttonModalConfirmation}
                    onPress={() => navigation.navigate("LoginCompanyScreen")}
                  >
                    <Text style={styles.textButton}>Iniciar Sesión</Text>
                  </ButtonModal>
                </View>
              </Modal>
            </Portal>

            <Text
              style={{
                textAlign: "left",
                fontFamily: FONT.medium,
                fontSize: SIZES.large,
                fontWeight: "bold",
                color: COLORS.gray800,
                width: "100%",
                marginTop: 40,
              }}
            >
              Datos de autenticación
            </Text>
            <TextInput
              label="Nombre de empresa"
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
              <Text
                style={{ fontFamily: FONT.regular, fontSize: SIZES.xSmall }}
              >
                {visiblePass ? "Ocultar contraseña" : "Mostrar contraseña"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              maxWidth: 400,
              justifyContent: "center",
              padding: 20,
              alignSelf: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 60,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontFamily: FONT.medium,
                fontSize: SIZES.large,
                fontWeight: "bold",
                color: COLORS.gray800,
                width: "100%",
              }}
            >
              Perfil
            </Text>

            <View style={{ width: "100%", marginTop: 10 }}>
              <View style={{ width: "100%" }}>
                <TextInput
                  multiline={false}
                  label="Rubro de la empresa"
                  returnKeyType="next"
                  placeholder="Ej (Empresa de construcción, Tienda de electrónica, etc)"
                  value={heading.value}
                  onChangeText={(text) =>
                    setHeading({ value: text, error: "" })
                  }
                  error={!!heading.error}
                  errorText={heading.error}
                />
                <TextInput
                  multiline={true}
                  label="Descripción"
                  returnKeyType="next"
                  numberOfLines={4}
                  value={description.value}
                  onChangeText={(text) =>
                    setDescription({ value: text, error: "" })
                  }
                  error={!!description.error}
                  errorText={description.error}
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.medium,
                color: COLORS.gray800,
                width: "100%",
                textAlign: "left",
                marginTop: 30,
              }}
            >
              Imagen de perfil
            </Text>

            <View style={{ marginTop: 10 }}>
              {!profileImageBase64 && (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    borderRadius={50}
                    resizeMode="cover"
                    source={{
                      uri: "https://cdn.midjourney.com/d1f125dd-114f-41e9-ba7c-bc261f56d222/0_1.png",
                    }}
                    style={{
                      width: "50%",
                      height: "auto",
                      borderRadius: 1000,
                      aspectRatio: "1/1",
                    }}
                  />
                </View>
              )}
              {profileImageBase64 && (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    borderRadius={150}
                    resizeMode="cover"
                    source={{
                      uri: `data:image/jpeg;base64,${profileImageBase64}`,
                    }}
                    style={{
                      width: "50%",
                      height: "auto",
                      borderRadius: 1000,
                      aspectRatio: "1/1",
                    }}
                  />
                </View>
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  columnGap: 20,
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!profileImageLink && (
                  <View style={{ flexDirection: "column", rowGap: 10,width:"100%" }}>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 10,
                        borderRadius: 15,
                        width: "100%",
                        backgroundColor: COLORS.indigo700,
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        justifyContent: "center",
                        columnGap: 10,
                        alignItems: "center",
                      }}
                      onPress={
                        profileImageBase64
                          ? handleImageUpload
                          : handleImagePicker
                      }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          width: "auto",
                          color: COLORS.white,
                          fontFamily: FONT.medium,
                        }}
                      >
                        {profileImageBase64 ? "Guardar imagen" : "Subir Imagen"}
                      </Text>
                      <Icon
                        name={profileImageBase64 ? "save" : "upload"}
                        type="feather"
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                    {!profileImageBase64 && (
                      <View>
                        <Text
                          style={{
                            fontFamily: FONT.regular,
                            fontSize: SIZES.small,
                            color: COLORS.gray700,
                            marginTop: 5,
                            textAlign: "justify",
                          }}
                        >
                          Una imágen de perfil brindara mas confianza a las
                          personas
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                {profileImageLink && (
                  <View
                    style={{
                      paddingVertical: 20,
                      borderRadius: 15,
                      width: 150,
                      backgroundColor: COLORS.green400,
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      justifyContent: "center",
                      columnGap: 10,
                      alignItems: "center",
                    }}
                    onPress={handleImagePicker}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        width: "auto",
                        color: COLORS.white,
                        fontFamily: FONT.medium,
                      }}
                    >
                      Perfil guardado
                    </Text>
                    <Icon
                      name={"checkcircle"}
                      type="antdesign"
                      color={COLORS.white}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              maxWidth: 400,
              justifyContent: "center",
              padding: 20,
              alignSelf: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontFamily: FONT.medium,
                fontSize: SIZES.large,
                fontWeight: "bold",
                color: COLORS.gray800,
                width: "100%",
              }}
            >
              Ubicación
            </Text>

            <View style={{ width: "100%", marginTop: 10 }}>
              <SelectList
                key={1}
                setSelected={(val) => setProvince(val)}
                data={provincesDistricts.map((e) => {
                  return { key: e.id, value: e.name };
                })}
                placeholder="Provincia"
                search={false}
                onSelect={() => {
                  setDistrict("");
                  setProvinceError("");
                }}
                save="value"
              />
              {provinceError && (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.red600,
                    fontFamily: FONT.medium,
                  }}
                >
                  {provinceError}
                </Text>
              )}
            </View>

            {province && (
              <View style={{ marginTop: 10, width: "100%" }}>
                <SelectList
                  key={2}
                  setSelected={(val) => setDistrict(val)}
                  onSelect={() => setDistrictError("")}
                  data={provincesDistricts
                    .find((obj) => obj.name === province)
                    .districts.map((e) => {
                      return { key: e.id, value: e.name };
                    })}
                  searchPlaceholder={`Buscar un distrito de ${province}`}
                  placeholder="Distrito"
                  search={true}
                  save="value"
                  notFoundText="No se encontró ningún distrito"
                />
                {districtError && (
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      color: COLORS.red600,
                      fontFamily: FONT.medium,
                    }}
                  >
                    {districtError}
                  </Text>
                )}
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "column",
              maxWidth: 400,
              justifyContent: "center",
              padding: 20,
              alignSelf: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {isLoading && <ActivityIndicator />}
            <Button
              disabled={isLoading}
              mode="contained"
              onPress={onSignUpPressed}
              style={{ marginTop: 24, fontFamily: FONT.medium }}
            >
              Registrarse
            </Button>

            {isImageSavedToSubmitError && <Text
                style={{
                  marginBottom: 10,
                  fontFamily: FONT.medium,
                  color: COLORS.red600,
                }}
              >
               {isImageSavedToSubmitError}
              </Text> }
            {(email.error ||
              password.error ||
              name.error ||
              description.error ||
              provinceError ||
              districtError) && (
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: FONT.medium,
                  color: COLORS.red600,
                }}
              >
                {" "}
                Hay uno o mas campos inválidos
              </Text>
            )}

            <View style={styles.row}>
              <Text style={{ fontFamily: FONT.regular }}>
                ¿Ya tienes una cuenta?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.replace("LoginCompanyScreen")}
              >
                <Text style={styles.link}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    fontFamily: FONT.medium,
  },
  buttonModalConfirmation: {
    backgroundColor: COLORS.indigo400,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginHorizontal: "auto",
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONT.medium,
  },
});
