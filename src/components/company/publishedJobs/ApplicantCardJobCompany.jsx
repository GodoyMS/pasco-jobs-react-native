import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  PermissionsAndroid,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import WebView from "react-native-webview";
import Moment from "react-moment";
import "moment/locale/es";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { backendURL } from "@config/config";
import { useNavigation } from "@react-navigation/native";
import { Buffer } from "buffer";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";

const ApplicantCardJobCompany = ({ dataApplication, openPDF, finalistApplications,setFinalistApplications,applications,setApplications}) => {
  const [isLoadingMark, setIsLoadingMark] = useState(false);
  const [isFinalist, setIsFinalist] = useState(false);

  useEffect(() => {
    if (finalistApplications && finalistApplications.length>0 && dataApplication) setIsFinalist(finalistApplications.includes(dataApplication.id));
  }, [finalistApplications]);

  const [isPdfDownloaded, setIsPdfDownloaded] = useState(false);
  const navigation = useNavigation();

  const [permissionStatusPhone, setPermissionStatusPhone] =
    useState("undetermined");


  const navigateToDetails = () => {
    navigation.navigate("ApplicantProfileCompanyScreen", { itemId: dataApplication?.applicant?.id });
  };

  const markAsFinalist = async () => {
    setIsLoadingMark(true);
    await axios
      .patch(
        `${backendURL}api/applications/${dataApplication.id}`,
        {
          finalist: "yes",
        }
      )
      .then(({ data }) => setIsFinalist(true))
      .then(()=>setFinalistApplications([...finalistApplications,dataApplication.id]))

  };

  const dismarkAsFinalist = async () => {
    setIsLoadingMark(true);
    await axios
      .patch(
        `${backendURL}api/applications/${dataApplication.id}`,
        {
          finalist: "no",
        }
      )
      .then(({ data }) => setIsFinalist(false))
      .then(()=>setFinalistApplications(finalistApplications.filter(obj=>obj !==dataApplication.id )))


  };

  console.log("CARD"+finalistApplications)

  const downloadPdf = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    if (permissionStatusPhone === "denied") {
      console.log("Permission denied.");
      return;
    }

    const base64Data = await convertToBase64DownloadPDF(
      dataApplication?.applicant?.cv
    );

    try {
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        `${dataApplication?.applicant?.name}-cv.pdf`,
        "application/pdf"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .then(() => setIsPdfDownloaded(true))
        .then(() => setTimeout(() => setIsPdfDownloaded(false), 2000))
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
      const fileUri = FileSystem.cacheDirectory + "sample.pdf";
      await FileSystem.downloadAsync(pdfUrl, fileUri);
      // Read the downloaded file as Base64
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return base64;
    } catch (error) {
      console.error("Error converting to Base64:", error);
    }
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
          height: "auto",
          paddingBottom: 40,
          paddingTop: 10,
          borderRadius: 10,
          marginVertical: 10,
          shadowColor: COLORS.black,
        }}
      >
        <View></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: COLORS.gray600,
                fontFamily: FONT.medium,
                fontSize: SIZES.xSmall,
              }}
            >
              {dataApplication.applicant?.province}-
              {dataApplication.applicant?.district}
            </Text>

            <Icon size={20} name="location" type="evilicon" />
          </View>
        </View>

        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <Image
            resizeMode="cover"
            style={{ width: 100, height: 100, borderRadius: 15 }}
            source={
              dataApplication.applicant?.profile
                ? {
                    uri: dataApplication.applicant?.profile,
                  }
                : dataApplication.applicant?.sex === "Hombre"
                ? man
                : woman
            }
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <View style={{ flexDirection: "column", gap: 4 }}>
              <Text
                style={{
                  color: COLORS.gray800,
                  fontFamily: FONT.bold,
                  fontSize: 20,
                }}
              >
                {dataApplication.applicant?.name}
              </Text>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontFamily: FONT.medium,
                  fontSize: 14,
                }}
              >
                {dataApplication.applicant?.position}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: COLORS.gray600,
                  fontFamily: FONT.medium,
                  fontSize: SIZES.small,
                  textAlign: "justify",
                }}
                ellipsizeMode="tail"
                numberOfLines={3}
              >
                {dataApplication.applicant?.description}
              </Text>
            </View>
          </View>

          {/* <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}>
                {dataJob.title}
              </Text>
              <Moment
                style={{ color: COLORS.gray600 }}
                element={Text}
                locale="es"
                format="HH:mm a MMMM, YYYY"
              >
              </Moment>
            </View> */}
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            columnGap: 10,
            flexWrap: "wrap",
          }}
        >
          <View style={{ flex: 1, flexDirection: "column", rowGap: 5 }}>
            {(!isFinalist) ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={markAsFinalist}
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: "row",
                  columnGap: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                mode="contained"
              >
                <Icon
                  name="long-arrow-alt-up"
                  color={COLORS.indigo800}
                  type="font-awesome-5"
                />
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    color: COLORS.indigo800,
                    textAlign: "center",
                    fontSize: SIZES.small,
                  }}
                >
                  Marcar como finalista
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={dismarkAsFinalist}
                style={{
                  backgroundColor: COLORS.green50,
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                mode="contained"
              >
                <Icon
                  name="checkcircle"
                  size={20}
                  color={COLORS.green800}
                  type="antdesign"
                />
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    color: COLORS.green700,
                    textAlign: "center",
                    fontSize: SIZES.small,
                  }}
                >
                  Finalista
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToDetails}
              style={{
                backgroundColor: COLORS.gray100,
                borderRadius: 10,
                padding: 10,
                flexDirection: "row",
                columnGap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              mode="contained"
            >
              <Icon name="user" color={COLORS.gray700} type="font-awesome-5" />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.gray700,
                  textAlign: "center",
                  fontSize: SIZES.small,
                }}
              >
                {" "}
                Ver perfil
              </Text>
            </TouchableOpacity>
          </View>
          {dataApplication?.applicant?.cv && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => openPDF(dataApplication?.applicant?.cv)}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                padding: 10,
                flex: 1,
                flexDirection: "column",
                rowGap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                alignContent: "center",
              }}
              mode="contained"
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.tertiary,
                  textAlign: "center",
                  fontSize: SIZES.small,
                }}
              >
                Ver Curriculum Vitae
              </Text>
              <Icon
                name="dock-window"
                style={{ alignSelf: "center" }}
                color={COLORS.tertiary}
                type="material-community"
              />
            </TouchableOpacity>
          )}
        </View>

        {dataApplication?.applicant?.cv && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                borderRadius: 10,
                backgroundColor: COLORS.indigo50,
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                columnGap: 10,
                flexDirection: "row",
                paddingVertical: 10,
              }}
              dark={false}
              onPress={downloadPdf}
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: SIZES.small,
                  color: COLORS.indigo800,
                }}
              >
                Descargar CV
              </Text>
              <Icon
                name="download"
                size={20}
                color={COLORS.indigo800}
                type="antdesign"
              />
            </TouchableOpacity>
          </View>
        )}
        {isPdfDownloaded && (
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "center",
              columnGap: 20,
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: COLORS.green400,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.medium,
                color: COLORS.white,
              }}
            >
              Descargado
            </Text>
            <Icon
              name="checkcircle"
              size={20}
              color={COLORS.white}
              type="antdesign"
            />
          </View>
        )}

        <View></View>
      </View>
    </>
  );
};

export default ApplicantCardJobCompany;
