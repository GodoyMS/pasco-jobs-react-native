import React, { useState, useCallback } from "react";
import {
  View,
  Button,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useEffect } from "react";
import { backendURL } from "@config/config";
import axios from "axios";
import man from "@assets/images/manwoman/man.jpg";
import woman from "@assets/images/manwoman/woman.webp";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";

export default function Step3Form({
  sex,
  name,
  description,
  position,
  profileImageBase64,
  setProfileImageBase64,
  cvDocumentBase64,
  setCvDocumentBase64,
  profileImageLink,
  setProfileImageLink,
  cvDocumentLink,
  setCvDocumentLink,
}) {
  const [cvName, setCvName] = useState("");

  //SELECT IMAGE
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


  //SELECT PDF


  const handleCVUpload = async () => {
    await axios
      .post(`${backendURL}api/cvuploads/upload`, {
        base64: `${cvDocumentBase64}`,
        name: `${name.value}-cv`,
      })
      .then(({ data }) => setCvDocumentLink(data.url))
      .catch((e) => console.log(e));
  };


  const handleFileSelection = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
      });

      if (file.type === "success") {
        setCvName(file.name);
        await convertToBase64(file.uri).then((e) => setCvDocumentBase64(e));

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
      console.log("Error while converting to base64:", error);
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
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          columnGap: 20,
        }}
      >
        {sex && !profileImageBase64 && (
          <Image
            borderRadius={50}
            resizeMode="cover"
            source={sex.value === "Hombre" ? man : woman}
            style={{ width: 150, height: 200 }}
          />
        )}
        {profileImageBase64 && (
          <Image
            borderRadius={150}
            source={{ uri: `data:image/jpeg;base64,${profileImageBase64}` }}
            style={{ width: 150, height: 150 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "column", flex: 1, rowGap: 0 }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.xLarge,
                color: COLORS.indigo900,
              }}
            >
              {name.value}
            </Text>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.medium,
                color: COLORS.gray800,
              }}
            >
              {position.value}
            </Text>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.medium,
                color: COLORS.gray700,
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.indigo800 }}>"</Text>
              {description.value}
              <Text style={{ fontSize: 20, color: COLORS.indigo800 }}>"</Text>
            </Text>
          </View>
        </View>
      </View>

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
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              borderRadius: 15,
              width: 150,
              backgroundColor: COLORS.indigo700,
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "center",
              columnGap: 10,
              alignItems: "center",
            }}
            onPress={profileImageBase64 ? handleImageUpload : handleImagePicker}
          >
            <Text
              style={{
                textAlign: "center",
                width: "auto",
                color: COLORS.white,
                fontFamily: FONT.medium,
              }}
            >
              {profileImageBase64 ? "Guardar" : "Subir Imagen"}
            </Text>
            <Icon
              name={profileImageBase64 ? "save" : "upload"}
              type="feather"
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
        {profileImageLink && (
          <View
            style={{
              paddingVertical: 20,
              borderRadius: 15,
              width: 150,
              backgroundColor: COLORS.green300,
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
            <Icon name={"checkcircle"} type="antdesign" color={COLORS.white} />
          </View>
        )}

        {!profileImageBase64 && (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.large,
                color: COLORS.gray800,
              }}
            >
              Imagen de perfil
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.medium,
                color: COLORS.gray700,
                marginTop: 10,
              }}
            >
              Una imágen de perfil presentable incrementa las oportunidades de
              empleo
            </Text>
          </View>
        )}
      </View>

      

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          columnGap: 20,
          marginTop: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >

     {cvDocumentLink && (
          <View
            style={{
              paddingVertical: 20,
              borderRadius: 15,
              width: 150,
              backgroundColor: COLORS.green300,
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "center",
              columnGap: 10,
              alignItems: "center",
            }}
            onPress={handleFileSelection}
          >
            <Text
              style={{
                textAlign: "center",
                width: "auto",
                color: COLORS.white,
                fontFamily: FONT.medium,
              }}
            >
              CV guardado
            </Text>
            <Icon name={"checkcircle"} type="antdesign" color={COLORS.white} />

          </View>
        )}
        {!cvDocumentLink && (
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              borderRadius: 15,
              width: 150,
              backgroundColor: COLORS.indigo700,
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "center",
              columnGap: 10,
              alignItems: "center",
            }}
            onPress={cvDocumentBase64 ? handleCVUpload : handleFileSelection}          >
            <Text
              style={{
                textAlign: "center",
                width: "auto",
                color: COLORS.white,
                fontFamily: FONT.medium,
              }}
            >
              {cvDocumentBase64 ? "Guardar" : "Subir CV"}
            </Text>
            <Icon
              name={cvDocumentBase64 ? "save" : "upload"}
              type="feather"
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
        

        {!cvDocumentBase64 && (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.large,
                color: COLORS.gray800,
              }}
            >
              Curriculum vitae
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: SIZES.medium,
                  color: COLORS.gray800,
                }}
              >
                (opcional)
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.medium,
                color: COLORS.gray700,
                marginTop: 10,
              }}
            >
              Con un cv digital te ayuderemos a postular facilmente a las
              ofertas de trabajo
            </Text>
          </View>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{textAlign:"center"}} >{cvName}</Text>
      </View>
      {/* <Button title="Upload Image" onPress={handleImageUpload} /> */}
    </View>
  );
}
