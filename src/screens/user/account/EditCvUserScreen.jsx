import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES, FONT } from "@constants/theme";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { setOnlyUserInfo } from "@features/user/userSlice";
import { Icon } from "@rneui/themed";
import SaveButton from "@components/buttons/SaveButton";
import FormLoader from "@components/loaders/FormLoader";
import { StatusBar } from "expo-status-bar";

const EditCvUserScreen = () => {
  const userInfo = useSelector((state) => state.user.infoUser);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const [age, setAge] = useState("");

  const [cvBase64, setCvBase64] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [cvName, setCvName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (userInfo.name) setName(userInfo.name);
    if (userInfo.position) setPosition(userInfo.position);
    if (userInfo.age) setAge(userInfo.age);
    if (userInfo.description) setDescription(userInfo.description);
    if (userInfo.cv) setCvLink(userInfo.cv);
  }, [userInfo]);

  const dispatch = useDispatch();

  const downloadPdf = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    const base64Data = await convertToBase64DownloadPDF(cvLink);

    try {
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        `${name}-cv.pdf`,
        "application/pdf"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  const convertToBase64DownloadPDF = async (pdfUrl) => {
    try {
      // Download the PDF file
      const fileUri = FileSystem.cacheDirectory + 'sample.pdf';
      await FileSystem.downloadAsync(pdfUrl, fileUri);
  
      // Read the downloaded file as Base64
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log('Base64:', base64.slice(0,200));


      return base64
  
    } catch (error) {
      console.error('Error converting to Base64:', error);
    }
  };



  const handleCVUpload = async () => {
    setIsLoading(true);
    await axios
      .post(`${backendURL}api/cvuploads/upload`, {
        base64: `${cvBase64}`,
        name: `${name}-cv`,
      })
      .then(({ data }) =>
        axios.patch(
          `${backendURL}api/applicants/${userInfo.id}`,
          { cv: data.url }
        )
      )
      .then(({ data }) => dispatch(setOnlyUserInfo({ user: data.doc })))
      .then(() => setIsSuccess(true))
      .catch((e) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleCvSelection = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
      });

      if (file.type === "success") {
        setCvName(file.name);
        await convertToBase64(file.uri).then((e) => setCvBase64(e));

        // await axios
        //   .post(`${backendURL}api/cvuploads/upload`, {
        //     base64: `${cvDocument}`,
        //     name: `cv`,
        //   })
        //   .then((e) => setCvDocumentLink(e.data.url));
      }
    } catch (error) {
      console.log("Error while selecting file:", error);
    }
  };

  const convertToBase64 = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      return base64;
    } catch (error) {
      return null;
    }
  };
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.primary,
        flex: 1,
        paddingBottom: 90,
        justifyContent: "space-between",
      }}
    >
      <StatusBar/>
      <ScrollView style={{ marginTop: 90 }}>
        <FormLoader isLoading={isLoading} message={"Actualizando CV"} />
        {userInfo && (
          <View style={{ marginHorizontal: 30 }}>
            <View>
              <Text
                style={{
                  color: COLORS.gray800,
                  fontFamily: FONT.bold,
                  fontSize: SIZES.xLarge,
                  marginTop: 30,
                }}
              >
                {userInfo.cv
                  ? "Actualizar Curriculum Vitae"
                  : "Subir Curriculum Vitae"}
              </Text>
            </View>

            <Text
              style={{
                color: COLORS.gray600,
                fontFamily: FONT.regular,
                fontSize: SIZES.medium,
                marginVertical: 10,
              }}
            >
              Mantener tu cv actualizado es importante
            </Text>

            {/**IF CV IS UPLOADED    "CV SUBIDO" Show cv download update      |    */}

            {cvLink && (
              <>
                {cvBase64 ? (
                  <View style={{ marginTop: 50 }}>
                    <Text
                      style={{ textAlign: "center", fontFamily: FONT.medium }}
                    >
                      {cvName}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 20,
                        backgroundColor: COLORS.green300,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginTop: 80,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: FONT.medium,
                          fontSize: SIZES.medium,
                        }}
                      >
                        {" "}
                        Cv Subido{" "}
                      </Text>
                      <Icon
                        name="checkcircle"
                        type="antdesign"
                        color={COLORS.white}
                        size={20}
                      />
                    </View>
                  </View>
                )}

                <View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 20,
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={downloadPdf}
                      activeOpacity={0.8}
                      style={{
                        backgroundColor: COLORS.indigo100,
                        flexDirection: "row",
                        columnGap: 10,
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.gray800,
                          fontFamily: FONT.bold,
                          fontSize: SIZES.medium,
                        }}
                      >
                        Descargar CV
                      </Text>
                      <Icon
                        name="download"
                        type="antdesign"
                        color={COLORS.gray900}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleCvSelection}
                      style={{
                        backgroundColor: COLORS.tertiary,
                        flexDirection: "row",
                        columnGap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 10,
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: FONT.bold,
                          fontSize: SIZES.medium,
                        }}
                      >
                        Reemplazar CV
                      </Text>
                      <Icon
                        name="upload"
                        type="antdesign"
                        color={COLORS.white}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}


            {!cvLink && (
              <>
                {cvBase64 ? (
                  <View style={{ marginTop: 50 }}>
                    <Text
                      style={{ textAlign: "center", fontFamily: FONT.medium }}
                    >
                      {cvName}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginTop: 80,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.gray800,
                          fontFamily: FONT.medium,
                          fontSize: SIZES.medium,
                        }}
                      >
                        {" "}
                        Sin CV
                      </Text>
                    
                    </View>
                  </View>
                )}

                <View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 20,
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  >

                    <TouchableOpacity
                      onPress={handleCvSelection}
                      style={{
                        backgroundColor: COLORS.tertiary,
                        flexDirection: "row",
                        columnGap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 10,
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: FONT.bold,
                          fontSize: SIZES.medium,
                        }}
                      >
                        Seleccionar CV
                      </Text>
                      <Icon
                        name="upload"
                        type="antdesign"
                        color={COLORS.white}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {/**IF CV ISN'T UPLOADED */}

            {!cvLink && <></>}

            {cvBase64 && (
              //  <Button
              //   onPress={handleUpadateProfile}
              //   mode="contained"
              //   style={{ marginTop: 60, fontFamily: FONT.medium }}
              // >
              //  {cvLink  ? "Actualizar CV" : "Guardar CV"}
              // </Button>
              <SaveButton
                messageDefault={cvLink ? "Actualizar CV" : "Guardar CV"}
                isSuccess={isSuccess}
                messageSuccess={"CV Actualizado"}
                onPress={handleCVUpload}
              />
            )}

            {isError && (
              <View>
                <Text style={{ textAlign: "center" }}>
                  Ocurrio un error, si el error persiste contacte al soporte de
                  ayuda
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCvUserScreen;

const styles = StyleSheet.create({});
