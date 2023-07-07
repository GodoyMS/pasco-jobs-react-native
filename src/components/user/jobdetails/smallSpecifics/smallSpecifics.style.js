import { StyleSheet } from "react-native";
import { COLORS,FONT,SIZES } from "@constants/theme";


const stylesSmallSpecifics = StyleSheet.create({
    containerTwoCardJob: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flex: 1,
        columnGap: 10,
        alignItems: "center",
        marginTop: 20,
      },



      containerTwoCardJobText: {
        backgroundColor: COLORS.forth,
        textAlign: "center",
        paddingHorizontal: 5,
        paddingVertical: 4,
        fontFamily: FONT.medium,
        borderRadius: 10,
        color: COLORS.black,
        fontSize: SIZES.small,
        alignItems: "center",
        fontFamily:FONT.regular,
      },
});

export default stylesSmallSpecifics;

