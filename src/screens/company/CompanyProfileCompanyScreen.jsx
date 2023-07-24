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
import { Tab, TabView } from "@rneui/themed";

import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { gql, useQuery } from "@apollo/client";
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { Linking } from "react-native";
import CommentsSectionCompanyProfile from "@components/user/companyProfile/CommentsSectionCompanyProfile";
import SubmitCommentCompanyProfile from "@components/user/companyProfile/SubmitCommentCompanyProfile";
import { useSelector } from "react-redux";
import JobsSectionCompanyProfile from "@components/user/companyProfile/JobsSectionCompanyProfile";
import CompanyScreenProfileContactFab from "@components/fab/CompanyScreenProfileContactFab";
import ScreenLoader from "@components/loaders/ScreenLoader";

const CompanyProfileCompanyScreen = (props) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [tab, setTab] = useState("company");
  const [isCommentActive, setIsCommentActive] = useState(false);
  const {
    navigation,
    route: { params },
  } = props;

  const GET_COMPANY = gql`
    query GET_APPLICATIONS_BY_USER($employerId: String!) {
      Employer(id: $employerId) {
        description
        district
        province
        contactEmail
        address
        id
        verified
        website
        name
        profile
        whatsapp
        phone
      }
    }
  `;
  const { error, data,loading } = useQuery(GET_COMPANY, {
    variables: { employerId: params?.itemId ? params?.itemId : "" },

    fetchPolicy: "cache-and-network",
  });

  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("WhatsApp is not installed");
        }
      })
      .catch((error) => console.log("An error occurred", error));
  };

  if (loading)
    return <ScreenLoader loading={loading}/>
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
                data?.Employer?.profile
                  ? {
                      uri: data.Employer.profile,
                    }
                  : companyDefaultProfile
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
            Esta empresa no se encuentra disponible{" "}
          </Text>
        ) : (
          <View style={{ flex: 1, marginTop: 70 }}>
         

            <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => setProfileVisible(true)}>
                  <Image
                    source={
                      data?.Employer?.profile
                        ? {
                            uri: data.Employer.profile,
                          }
                        : companyDefaultProfile
                    }
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
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
                  }}
                >
                  {data?.Employer?.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    paddingLeft: 20,
                  }}
                >
                  <Icon size={20} name="location" type="evilicon" />
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      color: COLORS.gray600,
                      fontSize: SIZES.small,
                      textAlign: "center",
                    }}
                  >
                    {data?.Employer?.province}-{data?.Employer?.district}
                  </Text>
                </View>
              </View>
            </View>

            <Tab
              style={{ marginTop: 10}}
              value={tab}
              onChange={(e) => setTab(e)}
              iconPosition="left"
              
              indicatorStyle={{
                backgroundColor: COLORS.tertiary,
                height: 3,
              }}
            >
              <Tab.Item
              style={{paddingHorizontal:20 }}
                title="La empresa"
                titleStyle={(active) => {
                  return {
                    fontSize: 12,
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    fontFamily: FONT.medium,
                  };
                }}
                icon={(active) => {
                  return {
                    name: active ? "building": "building-o",
                    type: "font-awesome",
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    size: 20,
                  };
                }}
              />
              <Tab.Item
                title="Comentarios"
                titleStyle={(active) => {
                  return {
                    fontSize: 12,
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    fontFamily: FONT.medium,
                  };
                }}
                icon={(active) => {
                  return {
                    name: active ? "comments" :"comments-o",
                    type: "font-awesome",
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    size: 20,
                  };
                }}
              />
             
            </Tab>

            <TabView value={tab} onChange={setTab} animationType="spring">
              <TabView.Item style={{ width: "100%" }}>
                <View style={{ marginHorizontal: 15 }}>
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
                      Acerca de la empresa
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
                      {data?.Employer?.description}{" "}
                    </Text>
                  </View>

                  {(data?.Employer?.phone ||
                    data?.Employer?.whatsapp ||
                    data?.Employer?.contactEmail) && (
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
                              {data?.Employer?.phone}
                            </Text>
                          </View>

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
                              {data?.Employer?.whatsapp}
                            </Text>
                          </View>
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
                              {data?.Employer?.contactEmail}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </>
                  )}
                  {data?.Employer?.address && (
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
                            {data?.Employer?.address}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {data?.Employer?.website && (
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
                            {data?.Employer?.website}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </TabView.Item>
              <TabView.Item style={{ width: "100%" }}>
                <CommentsSectionCompanyProfile idCompany={params.itemId} />
              </TabView.Item>
            
            </TabView>

            {(data?.Employer?.phone ||
              data?.Employer?.whatsapp ||
              data?.Employer?.contactEmail) && (
              <CompanyScreenProfileContactFab infoCompany={data?.Employer} />
            )}
            {/* <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={openWhatsApp}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius:10,
                  backgroundColor:"#25D366"                  
                }}
              >
                <Text style={{fontFamily:FONT.bold,color:COLORS.white,fontSize:SIZES.medium}}>Contactar por Whatsapp</Text>
                <Icon name="whatsapp" type="font-awesome" color={COLORS.white}/>
              </TouchableOpacity>
            </View> */}
            {/* <CommentsSectionCompanyProfile/> */}
          </View>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default CompanyProfileCompanyScreen;

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
