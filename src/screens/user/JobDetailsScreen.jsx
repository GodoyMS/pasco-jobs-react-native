import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, {  useState } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
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
import { Icon } from "@rneui/themed";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import FormLoader from "@components/loaders/FormLoader";
import ScreenLoader from "@components/loaders/ScreenLoader";

export const JobDetailsUserScreen = (props) => {
  const tabs = ["Descripción", "Requisitos", "Responsabilidades"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const favJobsRedux = useSelector((state) => state.user.favUserJobs);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const userId = useSelector((state) => state.user.infoUser.id);
  const [showMessage, setShowMessage] = useState(false);
  const [isReportActive, setIsReportActive] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isSendingReportLoading, setIsSendindReportLoading] = useState(false);
  const [isReportSucces, setIsReportSuccess] = useState(false);
  const {
    navigation,
    route: { params },
  } = props;
  const [dataJob, setDataJob] = useState();
  const [currentApplicants, setCurrentApplicants] = useState([]);
  const [isSavingLoading, setIsSavingLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (favJobsRedux.includes(params.itemId)) {
      setIsAddedToFav(true);
    } else {
      setIsAddedToFav(false);
    }
  }, [favJobsRedux, params]);

  const handleAddFavoriteJob = async () => {
    setIsSavingLoading(true)
    await axios
      .post(`${backendURL}api/favoriteJobs`, {
        user: userId,
        job: params.itemId,
      })
      .then(({ data }) => dispatch(addFavoriteJob(data.doc)))
      .then(()=>setIsSavingLoading(false))

      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      })
      .catch((e) => console.log(e))
      .finally(()=>setIsSavingLoading(false))
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

  const sendJobReport = async () => {
    setIsSendindReportLoading(true)
    await axios.post(`${backendURL}api/jobReports`, {
      job: params.itemId,
      user: userId,
      reason: reportReason,
    })
    .then(()=>setIsReportSuccess(true))
    .catch(()=>void(null))
    .finally(()=>setIsSendindReportLoading(false))
  };

  if (!dataJob){

   return <ScreenLoader loading={loading}/>
  }
  
  else{
    return (
      <PaperProvider>
        <Portal>
          <Modal
            visible={isReportActive}
            onDismiss={() => setIsReportActive(false)}
          >
            <View style={{backgroundColor:COLORS.white,marginHorizontal:20,paddingHorizontal:20,paddingVertical:40,borderRadius:10}}>
            <Text style={{fontFamily:FONT.bold,fontSize:SIZES.large,color:COLORS.gray800,marginBottom:20}}>¿Porque deseas reportar esta oferta laboral?</Text>
            <SelectList
              setSelected={(val) => setReportReason(val)}
              data={[
                { key: 1, value: "Disciminatorio u ofensivo" },
                {
                  key: 2,
                  value: "Es publicidad o un aviso, no una oferta de empleo",
                },
                { key: 3, value: "Es engañosa o falsa" },
                { key: 4, value: "Solicitan dinero" },
                {
                  key: 5,
                  value: "Repiten la misma oferta laboral",
                  key: 5,
                  value: "Pagan muy mal para el trabajo solicitado",
                },
              ]}
              placeholder="Motivo de denuncia"
              search={false}              
              save="value"
            />
            {isSendingReportLoading && <ActivityIndicator style={{marginTop:20}}/>}
            <Button onPress={(isReportSucces || isSendingReportLoading ) ? ()=>void(null) :sendJobReport } style={{backgroundColor:isReportSucces? COLORS.green300: COLORS.tertiary,marginTop:20,borderRadius:10}} textColor="white" mode="elevated" >
              { isReportSucces ? "Enviado enviado" : "Enviar"}
              </Button>

              {isReportSucces && <Text style={{fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.gray900,textAlign:"center",marginTop:15}}>Gracias por ayudarnos a mejorar la plataforma</Text>}

            </View>
            
          </Modal>
        </Portal>

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <>
            <ScrollView
              style={{ marginTop: 40 }}
              showsVerticalScrollIndicator={true}
            >
              {!dataJob ? (
                <ActivityIndicator size="large" color={COLORS.tertiary} />
              ) : (
                <>
                  <View
                    style={{
                      padding: SIZES.medium,
                      paddingBottom: 20,
                      marginTop: 30,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setIsReportActive(true)}
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        columnGap: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONT.medium,
                          fontSize: SIZES.small,
                          color: COLORS.gray800,
                        }}
                      >
                        Reportar
                      </Text>
                      <Icon
                        name="flag"
                        type="feather"
                        size={15}
                        color={COLORS.gray800}
                      />
                    </TouchableOpacity>
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
                            {data?.Applications?.totalDocs} Postulante(s){" "}
                            {data?.Applications?.totalDocs === 0 && (
                              <Text style={{ color: COLORS.gray600 }}>
                                - Sé el primero en postularte{" "}
                              </Text>
                            )}
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
                        companyId={dataJob.author?.id}
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
                isSavingLoading={isSavingLoading}
                dataApplicants={currentApplicants}
                setCurrentApplicants={setCurrentApplicants}
                handleAddFavorite={handleAddFavoriteJob}
                isAddedToFav={isAddedToFav}
                showMessage={showMessage}
              />
            }
          </>
        </SafeAreaView>
      </PaperProvider>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default JobDetailsUserScreen;
