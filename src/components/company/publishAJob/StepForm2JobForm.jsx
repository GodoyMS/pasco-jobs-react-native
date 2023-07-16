import { View, Text, ScrollView } from "react-native";
import React, { useRef } from "react";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import SubtitlePublishAJob from "./SubtitlePublishAJob";
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

const StepForm2JobForm = ({ setDescription,description }) => {
  const richText = useRef();

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ marginTop: 30 }}
      >
        <SubtitlePublishAJob message={"Descripción (*)"} />
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.indent,
            actions.outdent,
            actions.alignFull,
            actions.alignCenter,
            actions.alignLeft,
            actions.alignRight,
          ]}
          iconMap={{ [actions.heading1]: handleHead2 }}
        />
        <ScrollView nestedScrollEnabled={true} style={{ height: 300}}>
          <RichEditor
            scrollEnabled={false}
            style={{
              width: "100%",
              marginBottom: 10,
              maxHeight: 5000,
            }}
            ref={richText}
            
            initialContentHTML={description.value}
            initialHeight={200}
            showsVerticalScrollIndicator={false}

            onChange={(descriptionText) =>
              setDescription({ value: descriptionText, error: "" })
            }
          />
                  <Text style={{color:COLORS.red700,textAlign:"center",fontFamily:FONT.medium}}>{description.error}  </Text>

        </ScrollView>


      
      </KeyboardAvoidingView>
    
    </View>
  );
};

export default StepForm2JobForm;
