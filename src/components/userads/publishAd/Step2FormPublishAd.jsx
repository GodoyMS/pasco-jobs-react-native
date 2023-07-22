import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React, { useRef } from "react";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import SubtitlePublishAJob from "@components/company/publishAJob/SubtitlePublishAJob";
import { KeyboardAvoidingView } from "react-native";
import { SIZES, FONT, COLORS } from "@constants/theme";
import { Platform } from "react-native";
const handleHead2 = ({ tintColor }) => (
  <Text
    style={{ color: tintColor, fontSize: SIZES.large, fontFamily: FONT.medium }}
  >
    H1
  </Text>
);

const handleHead2true = ({ tintColor }) => (
  <Text
    style={{ color: tintColor, fontSize: SIZES.medium, fontFamily: FONT.medium }}
  >
    H2
  </Text>
);


const Step2FormPublishAd = ({ setDescription, description, richText }) => {
  const {height}=useWindowDimensions()


  return (
    <View >

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      
        <ScrollView nestedScrollEnabled={true} style={{ height: 400}}>
          <RichEditor
            scrollEnabled={false}
            style={{
              maxHeight: 5000,
            }}
            ref={richText}
            initialContentHTML={description.value}
            initialHeight={400}
            showsVerticalScrollIndicator={false}
            onChange={(descriptionText) =>
              setDescription({ value: descriptionText, error: "" })
            }
          />
          <Text
            style={{
              color: COLORS.red700,
              textAlign: "center",
              fontFamily: FONT.medium,
            }}
          >
            {description.error}{" "}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Step2FormPublishAd;
