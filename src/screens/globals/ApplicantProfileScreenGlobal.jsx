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
import whatsapp from "@assets/icons/whatsapp2.png";
import gmail from "@assets/icons/gmail.png";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { gql, useQuery } from "@apollo/client";
import {

  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";

import CompanyScreenProfileContactFab from "@components/fab/CompanyScreenProfileContactFab";

import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";

const ApplicantProfileScreenGlobal = (props) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [tab, setTab] = useState("company");
  const {
    navigation,
    route: { params },
  } = props;

  const GET_APPLICANT_PROFILE = gql`
    query GET_APPLICANT_PROFILE($applicantId: String!) {
      Applicant(id: $applicantId) {
        description
        district
        province
        position
        sex
        age
        cv
        id
        name
        profile
        whatsapp
        phone
      }
    }
  `;
  const { error, data } = useQuery(GET_APPLICANT_PROFILE, {
    variables: { applicantId: params?.itemId ? params?.itemId : "" },

    fetchPolicy: "cache-and-network",
  });

  // const openWhatsApp = () => {
  //   const url = `whatsapp://send?phone=${phoneNumber}`;

  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (supported) {
  //         return Linking.openURL(url);
  //       } else {
  //         console.log("WhatsApp is not installed");
  //       }
  //     })
  //     .catch((error) => console.log("An error occurred", error));
  // };

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
        <Portal>
          <Modal
            style={{ backgroundColor: COLORS.black }}
            visible={profileVisible}
            onDismiss={() => setProfileVisible(false)}
          >
            <Image
              source={
                data.Applicant?.profile
                ? {
                    uri: data.Applicant?.profile,
                  }
                : data.Applicant?.sex === "Hombre"
                ? man
                : woman
              }
              style={{
                width: Dimensions.get("window").width,
                height: "auto",
                aspectRatio: "1/1",

                resizeMode: "cover",
                borderRadius: 0,
              }}
            />
          </Modal>
        </Portal>
        {error ? (
          <Text
            style={{
              marginTop: 60,
              fontFamily: FONT.medium,
              textAlign: "center",
            }}
          >
            Este usuario no se encuentra disponible{" "}
          </Text>
        ) : (
          <View style={{ marginHorizontal: 0, flex: 1, marginTop: 30 }}>
            <View
              style={{ flexDirection: "column", marginTop: 60, rowGap: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity onPress={() => setProfileVisible(true)}>
                  <Image
                    source={
                      data.Applicant?.profile
                      ? {
                          uri: data.Applicant?.profile,
                        }
                      : data.Applicant?.sex === "Hombre"
                      ? man
                      : woman
                    }
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "cover",
                      borderRadius: 50,
                    }}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 5,
                    paddingLeft: 20,
                  }}
                >
                  {/* <Icon size={20} name="location" type="evilicon" /> */}
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      color: COLORS.gray600,
                      fontSize: SIZES.small,
                      textAlign: "center",
                    }}
                  >
                    {data?.Applicant?.position}
                  </Text>
                  {/* <Text
                    style={{
                      fontFamily: FONT.medium,
                      color: COLORS.gray600,
                      fontSize: SIZES.small,
                      textAlign: "center",
                    }}
                  >
                    {data?.Applicant?.province}-{data?.Applicant?.district}
                  </Text> */}
                </View>
              </View>
            </View>

            <ScrollView
              style={{ marginHorizontal: 20 }}
              showsVerticalScrollIndicator
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 40,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: COLORS.gray900,
                    fontSize: SIZES.large,
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  Acerca de {data?.Applicant?.name.split(" ")[0]}
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
              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 40,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: COLORS.gray900,
                    fontSize: SIZES.medium,
                    marginBottom: 10,
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  Ubicación
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    rowGap: 10,
                    width: "100%",
                  }}
                >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        columnGap: 5,
                      }}
                    >
                      <Icon size={20} name="location" type="evilicon" />
                      <Text
                        style={{
                          fontFamily: FONT.regular,
                          fontSize: SIZES.small,
                        }}
                      >
                        {data?.Applicant?.province}-{data?.Applicant?.district}
                      </Text>
                    </View>
              
                </View>
              </View>

              {(data?.Applicant?.phone ||
                data?.Applicant?.whatsapp ||
                data?.Applicant?.contactEmail) && (
                <>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 40,
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONT.medium,
                        color: COLORS.gray900,
                        fontSize: SIZES.medium,
                        marginBottom: 10,
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      Contacto
                    </Text>
                    <View
                      style={{
                        flexDirection: "column",
                        rowGap: 10,
                        width: "100%",
                      }}
                    >
                      {data?.Applicant?.phone && (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            columnGap: 5,
                          }}
                        >
                          <Icon size={15} name="phone" type="material" />
                          <Text
                            style={{
                              fontFamily: FONT.regular,
                              fontSize: SIZES.small,
                            }}
                          >
                            {" "}
                            {data?.Applicant?.phone}
                          </Text>
                        </View>
                      )}

                      {data?.Applicant?.whatsapp && (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            columnGap: 5,
                          }}
                        >
                          <Image
                            source={whatsapp}
                            style={{ width: 15, height: 15 }}
                          />
                          <Text
                            style={{
                              fontFamily: FONT.regular,
                              fontSize: SIZES.small,
                            }}
                          >
                            {" "}
                            {data?.Applicant?.whatsapp}
                          </Text>
                        </View>
                      )}

                      {data?.Applicant?.contactEmail && (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            columnGap: 5,
                          }}
                        >
                          <Image
                            source={gmail}
                            style={{ width: 15, height: 15 }}
                          />
                          <Text
                            style={{
                              fontFamily: FONT.regular,
                              fontSize: SIZES.small,
                            }}
                          >
                            {" "}
                            {data?.Applicant?.contactEmail}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}
              {data?.Applicant?.address && (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 40,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      color: COLORS.gray900,
                      fontSize: SIZES.medium,
                      marginBottom: 10,
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    Dirección
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      rowGap: 10,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        columnGap: 5,
                      }}
                    >
                      <Icon size={15} name="location" type="entypo" />
                      <Text
                        style={{
                          fontFamily: FONT.regular,
                          fontSize: SIZES.small,
                        }}
                      >
                        {" "}
                        {data?.Applicant?.address}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {data?.Applicant?.website && (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 40,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      color: COLORS.gray900,
                      fontSize: SIZES.medium,
                      marginBottom: 10,
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    Página web
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      rowGap: 10,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        columnGap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONT.regular,
                          fontSize: SIZES.small,
                        }}
                      >
                        {" "}
                        {data?.Applicant?.website}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>

            {(data?.Applicant?.phone ||
              data?.Applicant?.whatsapp ||
              data?.Applicant?.contactEmail) && (
              <CompanyScreenProfileContactFab infoCompany={data?.Applicant} />
            )}

            {/* <CommentsSectionCompanyProfile/> */}
          </View>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ApplicantProfileScreenGlobal;

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
