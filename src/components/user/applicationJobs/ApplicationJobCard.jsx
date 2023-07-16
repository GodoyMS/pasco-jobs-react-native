import { Text, TouchableWithoutFeedback, View } from "react-native";
import React, { Component, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "@constants/theme";
import axios from "axios";
import { backendURL } from "@config/config";
import { useDispatch } from "react-redux";
import { addFavoriteJob, deleteFavoriteJob } from "@features/user/userSlice";
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
import AgeDateFormat from "@components/dates/AgeDateFormat";
const ApplicationJobCard = ({
  dataJob,
  userId,
  dataApplicationsLocal,
  setDataApplicationsLocal,
}) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate("JobDetails", { itemId: dataJob?.job.id });
  };

  const handleDeleteJob = async () => {
    await axios
      .delete(`${backendURL}api/applications/${dataJob.id}`)
      .then(() =>
        setDataApplicationsLocal(
          dataApplicationsLocal.filter((obj) => obj.id !== dataJob.id)
        )
      )

      .catch((e) => console.log(e));
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingHorizontal: 0,
        backgroundColor: COLORS.primary,
        marginVertical: 10,
      }}
      onPress={navigateToDetails}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 5,
          marginVertical: 1,
          marginHorizontal: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 5,
            marginVertical: 1,
            marginHorizontal: 0,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Image
              source={
                dataJob.author?.profile
                  ? {
                      uri: dataJob.author?.profile,
                    }
                  : companyDefaultProfile
              }
              style={{
                width: 40,
                height: "auto",
                aspectRatio: "1/1",
                borderRadius: 25,
              }}
            />
            <View style={{ flexDirection: "column", rowGap: 0 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.medium,
                  color: COLORS.gray900,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {dataJob.author?.name}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: FONT.regular,
                  color: COLORS.gray700,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <AgeDateFormat createdAt={dataJob.job.createdAt} />
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: FONT.medium,
              color: COLORS.gray800,
              flex: 1,
              flexDirection: "row",
            }}
          >
            {dataJob.job.title}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            flex: 1,
            columnGap: 10,
            alignItems: "center",
            marginTop: 0,
          }}
        >
           <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 4,
              rowGap: 5,
            }}
          >
            {[
              {
                id: 0,
                name: dataJob.job?.contract?.name,
                value: dataJob.job?.contract?.name,
                icon: 21,
              },
              {
                id: 1,
                name: dataJob.job?.workExperience?.name,
                value: dataJob.job?.workExperience?.name,
                icon: 21,
              },
              {
                id: 2,
                name: dataJob.job?.workShift?.name,
                value: dataJob.job?.workShift?.name,
                icon: 21,
              },
              {
                id: 3,
                name: `S/. ${dataJob?.job?.salary}`,
                value: dataJob?.job?.salary,
                icon: 123,
              },
             
            ].map((item) => {
              if (!item.value) return;
              return (
                <Text
                  key={item.id}
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    textAlign: "center",
                    paddingHorizontal: 5,
                    paddingVertical: 4,
                    borderRadius: 10,
                    color: COLORS.black,
                    fontSize: SIZES.small,
                    alignItems: "center",
                    fontFamily: FONT.regular,
                  }}
                >
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>

        <Text
          style={{
            fontSize: SIZES.small,
            fontFamily: FONT.regular,
            color: COLORS.gray700,
            flex: 1,
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          {dataJob.job?.province} - {dataJob.job?.district}
        </Text>

        <View
          style={{
            flex: 1,
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          {dataJob.job.expired === "no" ? (
            dataJob.finalist === "no" ? (
                <View style={{backgroundColor:COLORS.blue50,paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                  <Text style={{fontFamily:FONT.medium,fontSize:SIZES.small,color:COLORS.blue800}} >En curso</Text>

                </View>

            ) : (
                <View style={{backgroundColor:COLORS.green50,paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                <Text style={{fontFamily:FONT.medium,fontSize:SIZES.small,color:COLORS.green800}} >Finalista</Text>

              </View>
            )
          ) : dataJob.finalist === "no" ? (
            <View style={{backgroundColor:COLORS.gray100,paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                <Text style={{fontFamily:FONT.medium,fontSize:SIZES.small,color:COLORS.gray800}} >No seleccionado</Text>

              </View>
          ) : (
            <View style={{backgroundColor:COLORS.green50,paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                <Text style={{fontFamily:FONT.medium,fontSize:SIZES.small,color:COLORS.green800}} >Finalista</Text>

              </View>
          )}
          <Text></Text>

          <TouchableOpacity
            onPress={handleDeleteJob}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 15,

              borderWidth: 2,
              borderColor: COLORS.tertiary,

              color: "white",
            }}
          >
            <Text
              style={{
                color: COLORS.tertiary,
                fontFamily: FONT.bold,
                fontSize: SIZES.small,
              }}
            >
              Eliminar postulación
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ApplicationJobCard;
