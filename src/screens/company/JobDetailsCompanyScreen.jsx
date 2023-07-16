import { ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { COLORS, SIZES, FONT } from "@constants/theme";
import stylesSmallSpecifics from "@components/user/jobdetails/smallSpecifics/smallSpecifics.style";
import Company from "@components/user/jobdetails/company/Company";
import Tabs from "@components/user/jobdetails/tabs/Tabs";
import About from "@components/user/jobdetails/about/About";
import Specifics from "@components/user/jobdetails/specifics/Specifics";
import Footer from "@components/user/jobdetails/footer/Footer";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native";
import icons from "@constants/icons";

const JobDetailsCompanyScreen = (props) => {
  const {
    navigation,
    route: { params },
  } = props;

  const tabs = ["Descripción", "Requisitos", "Responsabilidades", "Beneficios"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [data, setData] = useState();
  const fetchData = () => {
    axios
      .get(`${backendURL}api/jobs/${params.itemId}`)
      .then(({ data }) => setData(data))
      .then((e) => console.log(e))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [params.itemId]);

  const [tabsToRender, setTabsToRender] = useState(["Descripción"]);
  useEffect(() => {
    if (data) {
      if (data.requirements && data.requirements.length > 0) {
        setTabsToRender((prevState) => {
          // Create a copy of the previous state array
          const updatedTabs = [...prevState];

          // Conditionally add more elements based on your condition
          updatedTabs.push("Requisitos");

          return updatedTabs;
        });
        
      }
      if (data.responsabilites && data.responsabilites.length > 0) {
        setTabsToRender((prevState) => {
          // Create a copy of the previous state array
          const updatedTabs = [...prevState];

          // Conditionally add more elements based on your condition
          updatedTabs.push("Responsabilidades");

          return updatedTabs;
        });
        
      }
      if (data.benefits && data.benefits.length > 0) {
        setTabsToRender((prevState) => {
          // Create a copy of the previous state array
          const updatedTabs = [...prevState];

          // Conditionally add more elements based on your condition
          updatedTabs.push("Beneficios");

          return updatedTabs;
        });
        
      }
    }
  }, [data]);

  console.log(tabsToRender);
  const displayTabContent = () => {
    switch (activeTab) {
      case "Descripción":
        if (data) {
          return (
            <About info={data?.description ?? ["N/A"]} />
          );
        }

      case "Requisitos":
        if (data) {
          return (
            <Specifics
              title="Requisitos"
              points={data.requirements ?? ["N/A"]}
            />
          );
        }

      case "Responsabilidades":
        if (data) {
          return (
            <Specifics
              title="Responsabilidades"
              points={data?.responsabilities ?? ["N/A"]}
            />
          );
        }
        case "Beneficios":
            if (data) {
              return (
                <Specifics
                  title="Beneficios"
                  points={data?.benefits ?? ["N/A"]}
                />
              );
            }

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        style={{ marginTop: 40 }}
        showsVerticalScrollIndicator={true}
      >
        {!data ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            <View style={{ padding: SIZES.medium, paddingBottom: 20 }}>

              <View style={{marginHorizontal:10}}>
                <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xxLarge,color:COLORS.gray900}}>{data.title}</Text>
                <Text style={{fontFamily:FONT.regular,fontSize:SIZES.medium,color:COLORS.gray800}}>{data.author.name}</Text>


              </View>
           
              <View
                style={{
                  marginHorizontal: 10,
                  flex: 1,
                  flexDirection: "row",
                  columnGap: 15,
                  marginTop:50
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.gray50,
                    flexDirection: "column",
                    rowGap: 5,
                    justifyContent: "center",
                    width: 120,
                    paddingVertical: 15,
                    paddingHorizontal: 5,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      marginHorizontal: "auto",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        marginHorizontal: "auto",
                      }}
                      source={icons.locationMap}
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: FONT.regular,
                      fontSize: 10,
                      color: COLORS.gray500,
                    }}
                  >
                    Ubicación
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: FONT.bold,
                      fontSize: 13,
                      color: COLORS.gray700,
                    }}
                  >
                    {data.province}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: FONT.medium,
                      fontSize: 11,
                      color: COLORS.gray600,
                    }}
                  >
                    {data.district}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "column", rowGap: 10 }}>
                  <View
                    style={{
                      flexDirection: "column",
                      backgroundColor: COLORS.gray50,
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        fontFamily: FONT.regular,
                        fontSize: 10,
                        color: COLORS.gray500,
                      }}
                    >
                      Experiencia
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",
                        fontFamily: FONT.bold,
                        fontSize: 13,
                        color: COLORS.gray700,
                      }}
                    >
                      {" "}
                      {data.workExperience.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: "100%",
                      columnGap: 15,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                        backgroundColor: COLORS.gray50,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: FONT.regular,
                          fontSize: 10,
                          color: COLORS.gray500,
                        }}
                      >
                        Horario
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: FONT.bold,
                          fontSize: 13,
                          color: COLORS.gray700,
                        }}
                      >
                        {" "}
                        {data.workShift.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                        backgroundColor: COLORS.gray50,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: FONT.regular,
                          fontSize: 10,
                          color: COLORS.gray500,
                        }}
                      >
                        Salario
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: FONT.bold,
                          fontSize: 13,
                          color: COLORS.gray700,
                        }}
                      >
                        {" "}
                        {data.salary ? `S/. ${data.salary}` : "Sin especificar"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 40 }}>
                <Tabs
                  tabs={tabsToRender}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </View>

              {displayTabContent()}
              <View style={stylesSmallSpecifics.containerTwoCardJob}>
                {/* <FlatList
                    data={[
                      { id: 0, name: data.contract.name, icon: 21 },
                      { id: 1, name: data.workExperience.name, icon: 21 },
                      { id: 2, name: data.workShift.name, icon: 21 },
                      { id: 3, name: "S/. " + data.salary, icon: 123 },
                    ]}
                    horizontal
                    keyExtractor={(item) => String(item.id)}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) => (
                      <Text style={stylesSmallSpecifics.containerTwoCardJobText} >
                        {item.name}
                      </Text>
                    )}
                    contentContainerStyle={{ columnGap: SIZES.small / 2 }}
                  /> */}
              </View>
              <Company
                description={data.author?.description}
                companyLogo={data.author?.profile}
                jobTitle={data.title}
                companyName={data.author.name}
                province={data.author?.province}
                district={data.author?.district}

              />
              
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailsCompanyScreen;

const styles = StyleSheet.create({});
