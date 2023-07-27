import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { TouchableOpacity } from "react-native";
import icons from "@constants/icons";

import { useDispatch, useSelector } from "react-redux";

import { setCompanyLocationForApplicants,cleanCompanyLocationForApplicants } from "@features/user/companySlice";


const CitySelectorApplicantsCompanyScreen = ({
  isCityOpen,
  setPage,
  setIsCityOpen,
  setData,
}) => {
  const companyLocationForApplicants = useSelector(
    (state) => state.company.companyLocationForApplicants
  );
  const dispatch = useDispatch(); 
  return (
    <View


      style={{
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: isCityOpen? 0:20,
        width: 120,
        height: 50,
        elevation: 4,
      }}
    >
      <TouchableOpacity
          onPress={() => setIsCityOpen(!isCityOpen)}

        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          columnGap: 4,
          paddingLeft: 5,
          paddingRight: 10,
        }}
      >
        <Image style={{ width: 20, height: 20 }} source={icons.location} />
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: SIZES.small,
            borderTopRightRadius: 20,
            color: COLORS.gray500,
          }}
        >
          {companyLocationForApplicants ? companyLocationForApplicants : "Ciudad"}
        </Text>
      </TouchableOpacity>
      {isCityOpen && (
        <View
          style={{
            position: "absolute",
            top: 56,
            backgroundColor: COLORS.white,
            elevation:4,
            width:"100%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 5,
            zIndex: 100,
            
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(setCompanyLocationForApplicants("Pasco"));
            }}
            style={{ paddingVertical: 15 }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
              }}
            >
              Pasco
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(setCompanyLocationForApplicants("Oxapampa"));
            }}
            style={{ paddingVertical: 15 }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
              }}
            >
              Oxapampa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(setCompanyLocationForApplicants("Daniel Alcides Carrión"));
            }}
            style={{ paddingVertical: 15 }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
              }}
            >
              Daniel A. Carrión
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={!companyLocationForApplicants ? ()=>setIsCityOpen(false):() => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(cleanCompanyLocationForApplicants());
            }}
            style={{ paddingVertical: 15 }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
              }}
            >
              Todas las ciudades
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CitySelectorApplicantsCompanyScreen;

const styles = StyleSheet.create({});
