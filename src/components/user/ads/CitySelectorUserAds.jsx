import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { TouchableOpacity } from "react-native";
import icons from "@constants/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserLocationForAds,
  setUserLocationForAds,
} from "@features/user/userSlice";
const CitySelectorUserAds = ({
  isCityOpen,
  setPage,
  setIsCityOpen,
  refetch,
  setData,
}) => {
  const userLocationForAds = useSelector(
    (state) => state.user.userLocationForAds
  );
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: isCityOpen ? 0 : 20,
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
          {userLocationForAds ? userLocationForAds : "Ciudad"}
        </Text>
      </TouchableOpacity>
      {isCityOpen && (
        <View
          style={{
            position: "absolute",
            top: 56,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 5,
            zIndex: 100,
            width:"100%",
          elevation:9
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(setUserLocationForAds("Pasco"));
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
              dispatch(setUserLocationForAds("Oxapampa"));
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
            onPress={!userLocationForAds ?()=>void(null) :  () => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(setUserLocationForAds("Daniel Alcides Carrión"));
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
            onPress={!userLocationForAds ? ()=>setIsCityOpen(false) : () => {
              setIsCityOpen(false);
              setData([]);
              setPage(1);
              dispatch(cleanUserLocationForAds());
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

export default CitySelectorUserAds;

const styles = StyleSheet.create({});
