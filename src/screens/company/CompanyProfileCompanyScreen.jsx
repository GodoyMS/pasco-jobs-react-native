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
  import whatsapp from "@assets/icons/whatsapp2.png"
import gmail from "@assets/icons/gmail.png"
  import { useState } from "react";
  import { COLORS, FONT, SIZES } from "@constants/theme";
  import { gql, useQuery } from "@apollo/client";
  import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
  import { Button, FAB, Modal, PaperProvider, Portal, Surface } from "react-native-paper";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { Icon } from "@rneui/themed";
  import { Linking } from "react-native";
  import CommentsSectionCompanyProfile from "@components/user/companyProfile/CommentsSectionCompanyProfile";
  import SubmitCommentCompanyProfile from "@components/user/companyProfile/SubmitCommentCompanyProfile";
  import { useSelector } from "react-redux";
  import JobsSectionCompanyProfile from "@components/user/companyProfile/JobsSectionCompanyProfile";
import CompanyScreenProfileContactFab from "@components/fab/CompanyScreenProfileContactFab";
  
  const CompanyProfileCompanyScreen = (props) => {
    const [profileVisible, setProfileVisible] = useState(false);
    const [tab, setTab] = useState("company");
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
          website
          address
          id
          verified
          name
          profile
          whatsapp
          phone
        }
      }
    `;
    const { error, data } = useQuery(GET_COMPANY, {
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
            <View style={{ marginHorizontal: 0, flex: 1, marginTop: 30 }}>
              
  
            <View style={{flexDirection:"row",marginTop:60}}>
            <View style={{ flexDirection: "row", justifyContent: "center",marginHorizontal:20 }}>
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
                    paddingLeft:20
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
             
  
            
  
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  columnGap: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setTab("company")}
                  style={{
                    borderBottomColor:
                      tab === "company" ? COLORS.tertiary : COLORS.gray500,
                    borderBottomWidth: tab === "company" ? 2 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: tab === "company" ? COLORS.tertiary : COLORS.gray700,
                    }}
                  >
                    La empresa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTab("reviews")}
                  style={{
                    borderBottomColor:
                      tab === "reviews" ? COLORS.tertiary : COLORS.gray500,
                    borderBottomWidth: tab === "reviews" ? 2 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: tab === "reviews" ? COLORS.tertiary : COLORS.gray700,
                    }}
                  >
                    Valorización
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTab("jobs")}
                  style={{
                    borderBottomColor:
                      tab === "jobs" ? COLORS.tertiary : COLORS.gray500,
                    borderBottomWidth: tab === "jobs" ? 2 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: tab === "jobs" ? COLORS.tertiary : COLORS.gray700,
                    }}
                  >
                    Ofertas laborales
                  </Text>
                </TouchableOpacity>
              </View>
  
              {tab === "company" && (
                <ScrollView style={{marginHorizontal:20}} showsVerticalScrollIndicator>
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
                  data?.Employer?.contactEmail 
               ) && (
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
                      <View style={{flexDirection:"column",rowGap:10,width:"100%"}}>

                        {data?.Employer?.phone  && (
                             <View style={{flexDirection:"row",width:"100%",alignItems:"center",columnGap:5}}>
                             <Icon size={15} name="phone" type="material"/>
                               <Text style={{fontFamily:FONT.regular,fontSize:SIZES.small}}> {data?.Employer?.phone}</Text>
                             </View>

                        )}
                        
                       
                          { data?.Employer?.whatsapp && (
                             <View style={{flexDirection:"row",width:"100%",alignItems:"center",columnGap:5}}>
                             <Image source={whatsapp} style={{width:15,height:15}} />
                               <Text style={{fontFamily:FONT.regular,fontSize:SIZES.small}}> {data?.Employer?.whatsapp}</Text>
                             </View>

                          )}
                         
                          {  data?.Employer?.contactEmail && (
                            <View style={{flexDirection:"row",width:"100%",alignItems:"center",columnGap:5}}>
                            <Image source={gmail} style={{width:15,height:15}} />
                              <Text style={{fontFamily:FONT.regular,fontSize:SIZES.small}}> {data?.Employer?.contactEmail}</Text>
                            </View>

                          )}
                          
                      </View>
                    </View>
                  </>
                )}
                {   data?.Employer?.address && (
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
                                      <View style={{flexDirection:"column",rowGap:10,width:"100%"}}>
                                        
                                          <View style={{flexDirection:"row",width:"100%",alignItems:"center",columnGap:5}}>
                                          <Icon size={15} name="location" type="entypo"/>
                                            <Text style={{fontFamily:FONT.regular,fontSize:SIZES.small}}> {data?.Employer?.address}</Text>
                                          </View>
                                      </View>
                                    </View>

                )}

{   data?.Employer?.website && (
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
                                      <View style={{flexDirection:"column",rowGap:10,width:"100%"}}>
                                        
                                          <View style={{flexDirection:"row",width:"100%",alignItems:"center",columnGap:5}}>
                                            <Text style={{fontFamily:FONT.regular,fontSize:SIZES.small}}> {data?.Employer?.website}</Text>
                                          </View>
                                      </View>
                                    </View>

                )}
                </ScrollView>
              )}
              {tab === "reviews" && <CommentsSectionCompanyProfile idCompany={params.itemId} />}
              {tab === "jobs" && <JobsSectionCompanyProfile idCompany={params.itemId} />}


          
            {(data?.Employer?.phone ||
              data?.Employer?.whatsapp ||
              data?.Employer?.contactEmail) && (
              <CompanyScreenProfileContactFab infoCompany={data?.Employer} />
            )}
  

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
  