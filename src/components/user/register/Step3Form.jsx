import React, { useState, useCallback } from "react";
import {
  View,
  Button,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useEffect } from "react";
import { backendURL } from "@config/config";
import axios from "axios";
import man from "@assets/images/manwoman/man.jpg";
import woman from "@assets/images/manwoman/woman.webp";
import manworker from "@assets/user/manworker.png";
import womanworker from "@assets/user/womanworker.png";
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
  isCvError,
  isImageError,
  setIsCvError,
  setIsImageError,
  isLoading
}) {
  const [cvName, setCvName] = useState("");
  const [isCvUploading, setIsCvUploading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);


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
    setIsImageUploading(true);
    await axios
      .post(`${backendURL}api/profilesupload/upload`, {
        base64: `data:image/png;base64,${profileImageBase64}`,
        name: name.value,
      })
      .then(({ data }) => setProfileImageLink(data.url))
      .then(() => setIsImageUploading(false))
      .catch((e) => console.log(e))
      .finally(() => setIsImageUploading(false));
  };

  //SELECT PDF

  const handleCVUpload = async () => {
    setIsCvUploading(true);
    await axios
      .post(`${backendURL}api/cvuploads/upload`, {
        base64: `${cvDocumentBase64}`,
        name: `${name.value}-cv`,
      })
      .then(({ data }) => setCvDocumentLink(data.url))
      .then(() => setIsCvUploading(false))
      
      .catch((e) => console.log(e))
      .finally(() => setIsCvUploading(false));
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
    <View style={{ width: "100%" }}>
      <Text
        style={{
          marginBottom: 20,
          fontFamily: FONT.medium,
          fontSize: SIZES.medium,
        }}
      >
        Imágen de perfil{" "}
        <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}>
          (opcional)
        </Text>
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          columnGap: 20,
        }}
      >
        {sex && !profileImageBase64 && (
          <Image
            borderRadius={1000}
            resizeMode="cover"
            source={sex.value === "Hombre" ? manworker : womanworker}
            style={{ width: 150, height: 150 }}
          />
        )}
        {profileImageBase64 && (
          <Image
            borderRadius={1000}
            source={{ uri: `data:image/jpeg;base64,${profileImageBase64}` }}
            style={{ width: 150, height: 150 }}
          />
        )}
        {/* <View style={{ flex: 1 }}>
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
        </View> */}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
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
              paddingVertical: 12,
              borderRadius: 8,
              width: "100%",
              backgroundColor: COLORS.indigo700,
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "center",
              columnGap: 10,
              alignItems: "center",
            }}
            onPress={profileImageBase64 ? handleImageUpload : handleImagePicker}
          >
            {isImageUploading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
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
              </>
            )}
          </TouchableOpacity>
        )}
        {profileImageLink && (
          <View
            style={{
              paddingVertical: 20,
              borderRadius: 15,
              width: 150,
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
                color: COLORS.green400,
                fontFamily: FONT.regular,
              }}
            >
              Perfil guardado
            </Text>
            <Icon
              name={"checkcircle"}
              type="antdesign"
              color={COLORS.green300}
            />
          </View>
        )}

        {!profileImageBase64 && (
          <View>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
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

      <View style={{ marginTop: 60 }}>
        <Text
          style={{
            marginBottom: 20,
            fontFamily: FONT.medium,
            fontSize: SIZES.medium,
            color: COLORS.gray800,
          }}
        >
          Curriculum vitae{" "}
          <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}>
            {" "}
            (opcional)
          </Text>
        </Text>
      </View>

      {cvDocumentBase64 && (
        <View
          style={{
            marginTop: 10,
            width: "100%",
            borderRadius: 5,
            backgroundColor: COLORS.gray50,
            paddingVertical: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>{cvName}</Text>
        </View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          columnGap: 20,
          marginTop: 5,
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
                color: COLORS.green400,
                fontFamily: FONT.regular,
              }}
            >
              CV guardado
            </Text>
            <Icon name={"checkcircle"} type="antdesign" color={COLORS.green400} />
          </View>
        )}
        {!cvDocumentLink && (
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              borderRadius: 8,
              width: "100%",
              backgroundColor: COLORS.indigo700,
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "center",
              columnGap: 10,
              alignItems: "center",
            }}
            onPress={cvDocumentBase64 ? handleCVUpload : handleFileSelection}
          >
            {isCvUploading ? (
              <ActivityIndicator />
            ) : (
              <>
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
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* <Button title="Upload Image" onPress={handleImageUpload} /> */}
    </View>
  );
}
