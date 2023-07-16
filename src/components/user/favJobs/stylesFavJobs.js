import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {  COLORS, FONT, SIZES } from "@constants/theme";
import { Platform } from "react-native";
const stylesFavJobs = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: 40,
    gap: SIZES.small,
  },

  inputSearch: {
    borderWidth:1,
    borderColor: COLORS.secondary,
    padding: 5,
    borderRadius: 5,
    backgroundColor:COLORS.white,
    

    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    flex: 1,
  },
  cardJob: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    marginVertical: 1,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  containerOneCardJob: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingVertical:10,
    columnGap: 3,
  },
  containerOneCardJobView1: {
    width: 30,
    height: 30,
    borderRadius: 900,
  },
  containerOneCardJobView2: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "flex-start",
  },
  containerOneCardJobView2Text1: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
    flex: 1,
    flexDirection: "row",
  },
  containerOneCardJobView2Text2: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray700,
    flex: 1,
    flexDirection: "row",
  },
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
    backgroundColor: COLORS.lightWhite,
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

  containerThreeCardJob: {
    flex: 1,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerThreeCardDate: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
  containerThreeButtonApply: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,

    borderWidth: 2,
    borderColor: COLORS.tertiary,

    color: "white",
  },
  containerThreeButtonApplyText: {
    color: COLORS.tertiary,
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
  },

  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
    height:400,
    flex:1
    
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});

export default stylesFavJobs;

