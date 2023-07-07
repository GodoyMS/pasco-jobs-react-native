import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as PaperButton  } from "react-native-paper";
import { COLORS,FONT,SIZES } from "@constants/theme";

const ButtonFirstScreen = ({ mode, style,textStyle, ...props  }) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined",
        style,
      ]}
      labelStyle={textStyle}
      mode={mode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
   
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    

  },
});

export default ButtonFirstScreen
