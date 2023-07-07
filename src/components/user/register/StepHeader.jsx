import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { COLORS,FONT,SIZES } from "@constants/theme";
export default function StepHeader({ stepForm,title,subTitle,currentStep }) {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          columnGap: 4,
        }}
      >
        <Icon
          size={20}
          name={stepForm >= currentStep ? "checkcircle" : "checkcircleo"}
          type="antdesign"
          color={stepForm >= currentStep ? COLORS.tertiary : COLORS.gray700}
        />
        <View
          style={{
            flexDirection: "column",
            rowGap: 2,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: SIZES.medium,
              color: stepForm >= currentStep ? COLORS.tertiary : COLORS.gray700,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
              color: stepForm >= currentStep ? COLORS.tertiary : COLORS.gray700,
            }}
          >
            {subTitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
