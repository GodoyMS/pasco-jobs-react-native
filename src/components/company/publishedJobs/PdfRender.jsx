import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native";
import { COLORS } from "@constants/theme";

const PdfRender = ({url}) => {
  // const [pdfBase64, setPdfBase64] = useState('');
  // console.log(pdfBase64.slice(0,200))
  // useEffect(() => {
  //   const pdfUrl = 'https://san-francisco-bucket-pasco-jobs.sfo3.cdn.digitaloceanspaces.com/2023-07-02T01:24:27.183Z-Applicant12-cv.pdf'; // Replace with your PDF URL

  //   convertPdfToBase64(pdfUrl)
  //     .then((base64Data) => setPdfBase64(base64Data))
  //     .catch((error) => console.error('Error converting PDF to base64:', error));
  // }, []);

  // const convertPdfToBase64 = async (pdfUrl) => {
  //   try {
  //     const fileInfo = await FileSystem.downloadAsync(pdfUrl, FileSystem.documentDirectory + 'file.pdf');
  //     const pdfContent = await FileSystem.readAsStringAsync(fileInfo.uri, { encoding: FileSystem.EncodingType.Base64 });
  //     return pdfContent;
  //   } catch (error) {
  //     console.error('Error converting PDF to base64:', error);
  //     return null;
  //   }
  // }
  // if(!pdfBase64){
  //   return <Text>Loadding...</Text>
  // }
  const injectedJavaScript = `
    const style = document.createElement('style');
    style.innerHTML = 'body, html { max-width: 100%; overflow-x: hidden; } iframe { width: 100%; height: 100%; }';
    document.getElementsByTagName('head')[0].appendChild(style);
  `;

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };
  if(!url)return;

  return (
    <>
      {isLoading && (
        <View style={{paddingVertical:30}}>
          <ActivityIndicator color={COLORS.tertiary} size={"large"} style={{ flex: 1 }} />
        </View>
      )}
      <View style={{ width: "100%", height: "90%",display:isLoading ? "none" : "flex" }}>
        <WebView
          source={{
            uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`,
          }}
          style={{ flex: 1 }}
          injectedJavaScript={injectedJavaScript}
          scalesPageToFit={false}

          onLoadEnd={handleLoadEnd}
        />
      </View>
    </>
  );
};

export default PdfRender;
