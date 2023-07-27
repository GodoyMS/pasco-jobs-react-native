import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";


import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";
import PdfRender from "@components/company/publishedJobs/PdfRender";
import ApplicantFabCompanyApplications from "@components/fab/ApplicantFabCompanyApplications";
import { StatusBar } from "expo-status-bar";
const ApplicantProfileCompanyScreen = (props) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [cvVisible, setCvVisible] = useState(false);
  const {
    navigation,
    route: { params },
  } = props;

  const GET_COMPANY = gql`
    query GET_APPLICANT_COMPANY_SCREEN_BY_ID($applicant: String!) {
      Applicant(id: $applicant) {
        description
        district
        province
        position
        sex
        age
        showCv
        cv
        id
        name
        profile
        whatsapp
        phone
      }
    }
  `;
  const { error, data } = useQuery(GET_COMPANY, {
    variables: { applicant: params?.itemId ? params?.itemId : "" },

    fetchPolicy: "cache-and-network",
  });

  const openPDF = () => {
    setCvVisible(true);
  };

  if (!data)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          size={40}
          color={COLORS.tertiary}
          style={{ marginTop: 50 }}
        />
      </View>
    );
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar/>
        <Portal>
          <Modal
            style={{ backgroundColor: COLORS.black }}
            visible={profileVisible}
            onDismiss={() => setProfileVisible(false)}
          >
            <TouchableOpacity onPress={() => setProfileVisible(false)}>
              <Image
                resizeMode="cover"
                style={{
                  width: Dimensions.get("window").width,
                  height: "auto",
                  aspectRatio: "1/1",

                  resizeMode: "cover",
                  borderRadius: 0,
                }}
                source={
                  data.Applicant?.profile
                    ? {
                        uri: data.Applicant?.profile,
                      }
                    : data.Applicant?.sex === "Hombre"
                    ? man
                    : woman
                }
              />
            </TouchableOpacity>
          </Modal>
        </Portal>

        {data && data?.Applicant?.cv && (
          <Portal>
            <Dialog visible={cvVisible} onDismiss={() => setCvVisible(false)}>
              <Dialog.Content
                style={{ paddingHorizontal: 5, paddingVertical: 0 }}
              >
                <PdfRender url={data?.Applicant?.cv} />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  mode="outlined"
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => setCvVisible(false)}
                >
                  Cerrar
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}

        {error ? (
          <Text
            style={{
              marginTop: 60,
              fontFamily: FONT.medium,
              textAlign: "center",
            }}
          >
            Este Usuario no esta disponible{" "}
          </Text>
        ) : (
          <ScrollView style={{ marginHorizontal: 0, marginTop: 30,marginBottom:100 }}>
            <View style={{ flexDirection: "column", marginTop: 60 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity onPress={() => setProfileVisible(true)}>
                  <Image
                    resizeMode="cover"
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    source={
                      data.Applicant?.profile
                        ? {
                            uri: data.Applicant?.profile,
                          }
                        : data.Applicant?.sex === "Hombre"
                        ? man
                        : woman
                    }
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: COLORS.gray900,
                    fontSize: SIZES.large,
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  {data?.Applicant?.name} ,
                  <Text
                    style={{ fontSize: SIZES.medium, color: COLORS.gray700 }}
                  >
                    {" "}
                    {data?.Applicant?.age}
                  </Text>
                </Text>

                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: COLORS.gray700,
                    fontSize: SIZES.small,
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  {data?.Applicant?.position}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
                width: "100%",
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.medium,
                  color: COLORS.gray900,
                  fontSize: SIZES.medium,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Acerca de
              </Text>
              <Text
                style={{
                  fontFamily: FONT.regular,
                  color: COLORS.gray700,
                  fontSize: SIZES.small,
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                {data?.Applicant?.description}{" "}
              </Text>

              <Text
                style={{
                  fontFamily: FONT.medium,
                  color: COLORS.gray900,
                  fontSize: SIZES.medium,
                  textAlign: "left",
                  width: "100%",
                  marginTop: 30,
                }}
              >
                Ubicación
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <Icon size={20} name="location" type="evilicon" />
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: COLORS.gray600,
                    fontSize: SIZES.xSmall,
                    textAlign: "center",
                  }}
                >
                  {data?.Applicant?.province}-{data?.Applicant?.district}
                </Text>
              </View>
             
              

              {/* {data?.Applicant?.cv && (<PdfRender url={data?.Applicant?.cv }/>)}  */}
            </View>

            {(data?.Applicant?.phone ||
              data?.Applicant?.whatsapp ||
              data?.Applicant?.contactEmail) && (
              <ApplicantFabCompanyApplications applicantInfo={data?.Applicant} />
            )}

            {/* <CommentsSectionCompanyProfile/> */}
          </ScrollView>
        )}

        {data?.Applicant?.cv && data?.Applicant?.showCv==="yes" && (
          <View
          style={{
            position: "absolute",

           
            zIndex: 500,
            width: "100%",
            left: 0,
            bottom: 0,
            right: 0,
            height: 70,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openPDF}
            style={{
              backgroundColor: COLORS.primary,
              borderColor: COLORS.indigo300,
              marginLeft:20,
              marginRight:150,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              flexDirection: "row",
              columnGap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
              alignContent: "center",
            }}
            mode="contained"
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                color: COLORS.tertiary,
                textAlign: "center",
                fontSize: SIZES.small,
              }}
            >
              Ver Curriculum Vitae
            </Text>
            <Icon
              name="dock-window"
              style={{ alignSelf: "center" }}
              color={COLORS.tertiary}
              type="material-community"
            />
          </TouchableOpacity>
        </View>

        )}
        
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ApplicantProfileCompanyScreen;

const styles = StyleSheet.create({
  shadowContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 8, // Adjust the height for the desired shadow size
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Increase the height value for a more pronounced effect
    },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Increase the radius value for a more spread-out shadow
    elevation: 4, // Android only
    width: "100%",
  },
});
