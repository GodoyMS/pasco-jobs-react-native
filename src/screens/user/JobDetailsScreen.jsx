import { Text, StyleSheet, View } from "react-native";
import React, { Component, useState } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { addFavoriteJob } from "@features/user/userSlice";
import stylesSmallSpecifics from "@components/user/jobdetails/smallSpecifics/smallSpecifics.style";
import Company from "@components/user/jobdetails/company/Company";
import Tabs from "@components/user/jobdetails/tabs/Tabs";
import About from "@components/user/jobdetails/about/About";
import Specifics from "@components/user/jobdetails/specifics/Specifics";
import Footer from "@components/user/jobdetails/footer/Footer";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useDispatch } from "react-redux";
import { backendURL } from "@config/config";
import icons from "@constants/icons";
import { gql, useQuery } from "@apollo/client";
export const JobDetailsUserScreen = (props) => {
  const tabs = ["Descripción", "Requisitos", "Responsabilidades"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const favJobsRedux = useSelector((state) => state.user.favUserJobs);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const userId = useSelector((state) => state.user.infoUser.id);
  const [showMessage, setShowMessage] = useState(false);

  const {
    navigation,
    route: { params },
  } = props;
  const [dataJob, setDataJob] = useState();
  const [currentApplicants, setCurrentApplicants] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (favJobsRedux.includes(params.itemId)) {
      setIsAddedToFav(true);
    } else {
      setIsAddedToFav(false);
    }
  }, [favJobsRedux, params]);

  const handleAddFavoriteJob = async () => {
    await axios
      .post(
        `${backendURL}api/favoriteJobs`,
        { user: userId, job: params.itemId }
      )
      .then(({ data }) => dispatch(addFavoriteJob(data.doc)))

      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      })
      .catch((e) => console.log(e));
  };
  const fetchData = () => {
    axios
      .get(`${backendURL}api/jobs/${params.itemId}`)
      .then(({ data }) => setDataJob(data))

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [params.itemId]);

  const GET_APPLICANTS = gql`
    query GET__USER($jobId: String!) {
      Applications(where: { job: { equals: $jobId } }) {
        docs {
          applicant {
            id
          }
        }

        totalDocs
        hasNextPage
        hasPrevPage
        page
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_APPLICANTS, {
    variables: { jobId: params.itemId },
    onCompleted: (data) => {
      setCurrentApplicants(data.Applications.docs);
    },
  });

  const [tabsToRender, setTabsToRender] = useState(["Descripción"]);
  useEffect(() => {
    if (dataJob) {
      if (dataJob.requirements && dataJob.requirements.length > 0) {
        setTabsToRender((prevState) => {
          // Create a copy of the previous state array
          const updatedTabs = [...prevState];

          // Conditionally add more elements based on your condition
          updatedTabs.push("Requisitos");

          return updatedTabs;
        });
      }
      if (dataJob.responsabilites && dataJob.responsabilites.length > 0) {
        setTabsToRender((prevState) => {
          // Create a copy of the previous state array
          const updatedTabs = [...prevState];

          // Conditionally add more elements based on your condition
          updatedTabs.push("Responsabilidades");

          return updatedTabs;
        });
      }
      if (dataJob.benefits && dataJob.benefits.length > 0) {
        setTabsToRender((prevState) => {
          // Create a copy of the previous state array
          const updatedTabs = [...prevState];

          // Conditionally add more elements based on your condition
          updatedTabs.push("Beneficios");

          return updatedTabs;
        });
      }
    }
  }, [dataJob]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Descripción":
        if (dataJob) {
          return <About info={dataJob?.description ?? ["N/A"]} />;
        }

      case "Requisitos":
        if (dataJob) {
          return (
            <Specifics
              title="Requisitos"
              points={dataJob.requirements ?? ["N/A"]}
            />
          );
        }

      case "Responsabilidades":
        if (dataJob) {
          return (
            <Specifics
              title="Responsabilidades"
              points={dataJob?.responsabilities ?? ["N/A"]}
            />
          );
        }
      case "Beneficios":
        if (dataJob) {
          return (
            <Specifics
              title="Beneficios"
              points={dataJob?.benefits ?? ["N/A"]}
            />
          );
        }

      default:
        return null;
    }
  };

  if (dataJob) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <>
          <ScrollView
            style={{ marginTop: 40 }}
            showsVerticalScrollIndicator={true}
          >
            {!dataJob ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                <View style={{ padding: SIZES.medium, paddingBottom: 20,marginTop:30}}>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text
                      style={{
                        fontFamily: FONT.bold,
                        fontSize: SIZES.xxLarge,
                        color: COLORS.gray900,
                      }}
                    >
                      {dataJob.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: SIZES.medium,
                        color: COLORS.gray800,
                      }}
                    >
                      {dataJob.author.name}
                    </Text>
                    {data && data?.Applications && (

                      <View>
                        <Text
                        style={{
                          fontFamily: FONT.medium,
                          fontSize: SIZES.small,
                          color: COLORS.blue800,
                        }}
                      >
                        {data?.Applications?.totalDocs} Postulante(s) {data?.Applications?.totalDocs === 0 && <Text style={{color:COLORS.gray600}}>- Sé el primero en postularte </Text>}
                      </Text>
                      </View>
                      
                    )}
                  </View>

                  <View
                    style={{
                      marginHorizontal: 10,
                      flex: 1,
                      flexDirection: "row",
                      columnGap: 15,
                      marginTop: 50,
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
                        {dataJob.province}
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          fontFamily: FONT.medium,
                          fontSize: 11,
                          color: COLORS.gray600,
                        }}
                      >
                        {dataJob.district}
                      </Text>
                    </View>
                    <View
                      style={{ flex: 1, flexDirection: "column", rowGap: 10 }}
                    >
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
                          {dataJob.workExperience.name}
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
                            {dataJob.workShift.name}
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
                            {dataJob.salary
                              ? `S/. ${dataJob.salary}`
                              : "Sin especificar"}
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
                  <View style={{ marginBottom: 50 }}>
                    <Company
                      description={dataJob.author?.description}
                      companyLogo={dataJob.author?.profile}
                      jobTitle={dataJob.title}
                      companyName={dataJob.author.name}
                      province={dataJob.author?.province}
                      district={dataJob.author?.district}
                    />
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          {
            <Footer
              jobAuthor={dataJob.author.id}
              idJob={params.itemId}
              idApplicant={userId}
              dataApplicants={currentApplicants}
              setCurrentApplicants={setCurrentApplicants}
              handleAddFavorite={handleAddFavoriteJob}
              isAddedToFav={isAddedToFav}
              showMessage={showMessage}
            />
          }
        </>
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default JobDetailsUserScreen;
