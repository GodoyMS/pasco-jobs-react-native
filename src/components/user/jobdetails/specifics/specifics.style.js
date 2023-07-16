import { StyleSheet } from "react-native";

import { COLORS,FONT,SIZES } from "@constants/theme";
const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: 7,
    padding: SIZES.medium,
    
    
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontFamily: FONT.bold,
  },
  pointsContainer: {
    marginVertical: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray600,
    marginTop: 6,
  },
  pointText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
});

export default styles;
