import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { TouchableOpacity } from "react-native";
import icons from "@constants/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserLocationForCompanies,
  setUserLocationForCompanies,
} from "@features/user/userSlice";

import { cleanUserLocation, setUserLocation } from "@features/user/userSlice";

const CitySelectorHomeJobs = ({ isCityOpen, setPage, setIsCityOpen }) => {
  const userLocation = useSelector((state) => state.user.userLocation);

  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => setIsCityOpen(!isCityOpen)}
      activeOpacity={0.7}
      style={{
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: isCityOpen ? 0 : 20,
        width: 120,
        height: 50,
        elevation: 4,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          columnGap: 10,
          flexWrap: "wrap",
          height: "auto",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: SIZES.small,
            borderTopRightRadius: 20,
            color: COLORS.gray500,
          }}
        >
          {userLocation ? userLocation : "Ciudad"}
        </Text>
        <Image style={{ width: 20, height: 20 }} source={icons.location} />
      </View>
      {isCityOpen && (
        <View
          style={{
            position: "absolute",
            top: 56,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            padding: 5,
            width: "100%",
            elevation: 4,
          }}
        >
          <TouchableOpacity
            onPress={
              userLocation === "Pasco"
                ? () => setIsCityOpen(false)
                : () => {
                    setIsCityOpen(false);
                    setPage(1);
                    dispatch(setUserLocation("Pasco"));
                  }
            }
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
            onPress={
              userLocation === "Oxapampa"
                ? () => setIsCityOpen(false)
                : () => {
                    setIsCityOpen(false);
                    setPage(1);
                    dispatch(setUserLocation("Oxapampa"));
                  }
            }
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
            onPress={
              userLocation === "Daniel Alcides Carrión"
                ? () => setIsCityOpen(false)
                : () => {
                    setIsCityOpen(false);
                    setPage(1);
                    dispatch(setUserLocation("Daniel Alcides Carrión"));
                  }
            }
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
            onPress={
              !userLocation
                ? () => setIsCityOpen(false)
                : () => {
                    setIsCityOpen(false);
                    dispatch(cleanUserLocation());
                    setPage(1);
                  }
            }
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
    </TouchableOpacity>
  );
};

export default CitySelectorHomeJobs;

const styles = StyleSheet.create({});
