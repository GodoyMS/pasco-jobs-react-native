import React, { useEffect } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { StyleSheet, View } from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import TextInput from "@components/login/TextInput";

import axios from "axios";
import { backendURL } from "@config/config";

import { Icon } from "@rneui/themed";

import { useSelector } from "react-redux";
import FormLoader from "@components/loaders/FormLoader";
import emptyjobsImage from "@assets/images/jobs/emptyjobs-min.png";

import { SelectList } from "react-native-dropdown-select-list";
import provincesDistricts from "@data/data.json";
import Step2FormPublishAd from "@components/userads/publishAd/Step2FormPublishAd";
import * as ImagePicker from "expo-image-picker";
import { useRef } from "react";

const PublishAnAdUserAdsScreen = () => {
  const richText = useRef();
  const userads = useSelector((state) => state.userads.infoUserAds);

  const [stepForm, setStepForm] = useState(1);

  const [title, setTitle] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({
    value: "<p>Escribe una descripción de tu anuncio</p>",
    error: "",
  });

  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);

  const [profileImageLink, setProfileImageLink] = useState("");

  const [profileImageBase64, setProfileImageBase64] = useState("");
  const [saveImageError, setSaveImageError] = useState(false);
  //IMAGE SIZING ISSUE
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isUploadingImageLoading, setIsUploadingImageLoading] = useState(false);

  const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  const resetAllValues = () => {
    setTitle({ value: "", error: "" });
    setDescription({ value: "", error: "" });
    setIsSucces(false);
    //location values
    setProvince("");
    setDistrict("");
    setIsSucces(false);
    setProfileImageBase64("");
    setProfileImageLink("");
    setStepForm(1);
  };

  const handleNextStep = async () => {
    if (stepForm === 1) {
      const titleError = title.value ? "" : "No puede estar vacío";

      if (titleError) {
        setTitle({ ...title, error: titleError });

        return;
      }
      setStepForm(2);
    }

    if (stepForm === 2) {
      const descriptionError = description.value
        ? ""
        : "Escribe una descripción";

      if (descriptionError) {
        setDescription({ ...description, error: descriptionError });
        return;
      }

      setStepForm(3);
    }
  };

  const handleSubmitJob = async () => {
    const districtEr = district ? "" : "Selecciona un distrito";
    const provinceEr = province ? "" : "Selecciona una provincia";
    setSaveImageError(false);
    if (profileImageBase64 && !profileImageLink) {
      setSaveImageError(true);
      return;
    }

    if (districtEr || provinceEr) {
      setDistrictError(districtEr);
      setProvinceError(provinceEr);
      return;
    }
    setIsLoading(true);
    await axios
      .post(`${backendURL}api/ads`, {
        title: title.value,
        author: userads.id,
        description: description.value,
        province: province.toString(),
        district: district.toString(),
        image: profileImageLink,
      })
      .then(({ data }) => console.log(data))
      .then(() => setIsSucces(true))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };
  //UPLOAD|SAVE IMAGE POST

  const handleImagePicker = async () => {
    setSaveImageError(false);

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
    setSaveImageError(false);

    setIsUploadingImageLoading(true);

    await axios
      .post(`${backendURL}api/postsImagesUpload/upload`, {
        base64: `data:image/png;base64,${profileImageBase64}`,
        name: title.value,
      })
      .then(({ data }) => setProfileImageLink(data.url))
      .then(() => setIsUploadingImageLoading(false))
      .catch((e) => console.log(e))
      .finally(() => setIsUploadingImageLoading(false));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View>
        <View
          style={{
            marginTop: 40,
          }}
        >
          {userads && stepForm == 1 && (
            <View
              style={{
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <View style={{ marginHorizontal: 20 }}>
                  <Text
                    style={{
                      fontFamily: FONT.bold,
                      color: COLORS.gray800,
                      fontSize: SIZES.xLarge,
                      marginBottom: 0,
                    }}
                  >
                    Publicar un anuncio
                  </Text>
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      color: COLORS.indigo600,
                    }}
                  >
                    Publicar un anuncio nunca fue tan fácil
                  </Text>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                  <TextInput
                    label="Título"
                    returnKeyType="next"
                    value={title.value}
                    onChangeText={(text) =>
                      setTitle({ value: text, error: "" })
                    }
                    error={!!title.error}
                    errorText={title.error}
                    autoCapitalize="none"
                    autoCompleteType="job"
                    placeholder="Escribe un  título breve y conciso"
                  />
                </View>
                <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
                  <View style={{width:"50%",marginRight:20}}>
                  <Text style={{fontFamily:FONT.regular,fontSize:SIZES.xSmall,color:COLORS.tertiary,textAlign:"right",marginBottom:30}}><Text style={{fontFamily:FONT.medium}}>Tip: </Text>Coloca palabras clave para posicionarte en el motor de búsqueda de Pasco Jobs</Text>


                  </View>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      borderRadius: 20,
                      maxWidth: 200,
                      columnGap: 10,
                      backgroundColor: COLORS.tertiary,
                      borderWidth: 1,
                      borderColor: COLORS.gray400,

                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={handleNextStep}
                    underlayColor={COLORS.gray800}
                    activeOpacity={0.9}
                  >
                    <Text
                      style={{ color: COLORS.white, fontFamily: FONT.medium }}
                    >
                      Siguiente
                    </Text>
                    <Icon
                      name="arrow-forward"
                      color={COLORS.white}
                      type="ionsicon"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {userads && stepForm === 2 && (
            <View style={{ marginTop: 50 }}>
              <RichToolbar
                style={{ backgroundColor: COLORS.tertiary }}
                iconTint={COLORS.white}
                editor={richText}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.indent,
                  actions.outdent,
                  actions.alignFull,
                  actions.alignCenter,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                ]}
              />
              <View >
                <Step2FormPublishAd
                  richText={richText}
                  description={description}
                  setDescription={setDescription}
                />

                {/* {!profileImageBase64 && (
                <Image
                  borderRadius={50}
                  resizeMode="cover"
                  source={sex.value === "Hombre" ? man : woman}
                  style={{ width: 150, height: 200 }}
                />
              )} */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    columnGap: 10,
                    marginTop: 30,
                    paddingBottom: 200,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      borderRadius: 20,
                      maxWidth: 200,
                      columnGap: 10,
                      backgroundColor: COLORS.tertiary,
                      borderWidth: 1,
                      borderColor: COLORS.gray400,

                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => setStepForm(stepForm - 1)}
                    underlayColor={COLORS.gray800}
                    activeOpacity={0.9}
                  >
                    <Icon
                      name="arrow-back"
                      color={COLORS.white}
                      type="ionsicon"
                    />
                    <Text
                      style={{ color: COLORS.white, fontFamily: FONT.medium }}
                    >
                      Atras
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      borderRadius: 20,
                      maxWidth: 200,
                      columnGap: 10,
                      backgroundColor: COLORS.tertiary,
                      borderWidth: 1,
                      borderColor: COLORS.gray400,

                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={handleNextStep}
                    underlayColor={COLORS.gray800}
                    activeOpacity={0.9}
                  >
                    <Text
                      style={{ color: COLORS.white, fontFamily: FONT.medium }}
                    >
                      Siguiente
                    </Text>
                    <Icon
                      name="arrow-forward"
                      color={COLORS.white}
                      type="ionsicon"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {userads && stepForm === 3 && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              style={{ marginTop: 30, marginHorizontal: 20 }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {!isSuccess && (
                  <>
                    {profileImageBase64 && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: 0,
                        }}
                      >
                        {!profileImageLink && (
                          <TouchableOpacity
                            onPress={
                              !profileImageLink
                                ? () => setProfileImageBase64("")
                                : () => void null
                            }
                            style={{
                              top: 10,
                              right: 20,
                              zIndex: 500,
                              position: "absolute",
                              backgroundColor: COLORS.indigo100,
                              borderRadius: 50,
                              padding: 5,
                            }}
                          >
                            <View>
                              <Icon
                                color={COLORS.tertiary}
                                name="closecircle"
                                type="antdesign"
                              />
                            </View>
                          </TouchableOpacity>
                        )}

                        <View
                          style={{ marginHorizontal: 10, position: "relative" }}
                        >
                          <Image
                            borderRadius={10}
                            resizeMode="cover"
                            source={{
                              uri: `data:image/jpeg;base64,${profileImageBase64}`,
                            }}
                            style={{
                              width: "100%",
                              aspectRatio,
                              maxHeight: 300,
                            }}
                            onLoad={handleImageLoad}
                          />
                        </View>
                      </View>
                    )}

                    {isUploadingImageLoading && <ActivityIndicator />}

                    {profileImageLink ? (
                      <View
                        style={{
                          width: "100%",

                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 20,
                          padding: 20,
                        }}
                      >
                        <View
                          style={{
                            borderColor: COLORS.tertiary,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 20,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: FONT.regular,
                              color: COLORS.tertiary,
                            }}
                          >
                            Imagen guardada
                          </Text>
                          <Icon
                            name="checkcircle"
                            color={COLORS.tertiary}
                            type="antdesign"
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          marginHorizontal: 20,
                          marginVertical: 20,
                          flexDirection: "row",
                          columnGap: 10,
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{
                            borderColor: COLORS.tertiary,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderStyle: "dashed",
                            height: 100,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                          }}
                          onPress={handleImagePicker}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              rowGap: 10,
                            }}
                          >
                            <Icon
                              color={COLORS.tertiary}
                              name="image"
                              type="feather"
                            />
                            <Text
                              style={{
                                fontFamily: FONT.regular,
                                color: COLORS.tertiary,
                              }}
                            >
                              {profileImageBase64
                                ? "Reemplazar Imagen"
                                : "Subir Imagen"}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {profileImageBase64 && !profileImageLink && (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                              borderColor: COLORS.tertiary,
                              borderWidth: 1,
                              flex: 1,

                              borderRadius: 10,
                              borderStyle: "solid",
                              height: 100,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: COLORS.tertiary,
                            }}
                            onPress={handleImageUpload}
                          >
                            <View
                              style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                rowGap: 10,
                              }}
                            >
                              <Icon
                                color={COLORS.white}
                                name="image"
                                type="feather"
                              />
                              <Text
                                style={{
                                  fontFamily: FONT.regular,
                                  color: COLORS.white,
                                }}
                              >
                                Guardar Imagen
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}

                    <Text
                      style={{
                        fontFamily: FONT.bold,
                        color: COLORS.gray800,
                        fontSize: SIZES.large,
                        marginTop: 10,
                        marginBottom: 20,
                      }}
                    >
                      Ubicación
                    </Text>

                    <View>
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
                      <View style={{ marginTop: 10 }}>
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
                  </>
                )}

                {!isSuccess && (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      columnGap: 10,
                      backgroundColor: COLORS.gray100,
                      maxWidth: 200,
                      marginTop: 50,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    underlayColor={COLORS.gray100}
                    activeOpacity={0.9}
                    onPress={() => setStepForm(stepForm - 1)}
                  >
                    <Icon
                      name="arrow-back"
                      color={COLORS.gray800}
                      type="ionsicon"
                    />
                    <Text
                      style={{ color: COLORS.gray800, fontFamily: FONT.medium }}
                    >
                      Atras
                    </Text>
                  </TouchableOpacity>
                )}

                {isSuccess && (
                  <>
                    <View
                      style={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: SIZES.medium,
                          fontFamily: FONT.bold,
                          paddingHorizontal: 20,
                          color: COLORS.indigo600,
                          marginTop: 10,
                          textAlign: "center",
                        }}
                      >
                        ¡Gracias por confiar en Pasco Jobs!
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONT.medium,
                          paddingHorizontal: 20,
                          color: COLORS.gray700,
                          fontSize: SIZES.small,
                          textAlign: "center",
                          maxWidth: 300,
                        }}
                      >
                        Ahora tu anuncio es público y llegara a miles de
                        personas.
                      </Text>
                    </View>
                  </>
                )}
                {isSuccess && (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginTop: 50,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      resizeMode="cover"
                      style={{
                        width: 200,
                        height: 200,
                        aspectRatio: "1/1",
                        marginHorizontal: "auto",
                      }}
                      size="large"
                      source={emptyjobsImage}
                    />
                  </View>
                )}
                {isLoading && (
                  <View style={{ marginTop: 20 }}>
                    <FormLoader
                      message={"Actualizando"}
                      isLoading={isLoading}
                    />
                  </View>
                )}
                {saveImageError && (
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      marginTop: 20,
                      color: COLORS.red500,
                      textAlign: "center",
                    }}
                  >
                    Guarda tu imágen antes de publicar
                  </Text>
                )}

                <TouchableOpacity
                  onPress={isSuccess ? () => void null : handleSubmitJob}
                  activeOpacity={isSuccess ? 1 : 0.7}
                  style={{
                    marginTop: isSuccess ? 20 : 20,

                    paddingVertical: 15,
                    fontFamily: FONT.medium,
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 15,
                    columnGap: 15,
                    alignItems: "center",

                    backgroundColor: isSuccess
                      ? COLORS.green100
                      : isLoading
                      ? COLORS.indigo300
                      : COLORS.tertiary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      color: isSuccess ? COLORS.green600 : COLORS.white,
                      fontFamily: FONT.bold,
                    }}
                  >
                    {isSuccess ? "Publicado exitosamente" : "Publicar"}
                  </Text>

                  {isSuccess && (
                    <Icon
                      name="checkcircle"
                      color={COLORS.green800}
                      type="antdesign"
                    />
                  )}
                </TouchableOpacity>

                {isSuccess && (
                  <Button
                    mode="contained"
                    onPress={resetAllValues}
                    style={{
                      marginTop: 20,
                      fontFamily: FONT.medium,
                      backgroundColor: COLORS.indigo100,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: COLORS.tertiary,
                        fontFamily: FONT.medium,
                      }}
                    >
                      {" "}
                      Publicar otro anuncio
                    </Text>
                  </Button>
                )}
              </View>
            </ScrollView>
          )}

          {/**Buttons */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PublishAnAdUserAdsScreen;

const styles = StyleSheet.create({});
