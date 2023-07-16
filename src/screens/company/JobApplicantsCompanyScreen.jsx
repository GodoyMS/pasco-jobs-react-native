import { FlatList, ScrollView } from "react-native";
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
import { gql, useQuery } from "@apollo/client";
import ApplicantCardJobCompany from "@components/company/publishedJobs/ApplicantCardJobCompany";

import { Button, Dialog, Portal, Provider } from "react-native-paper";
import PdfRender from "@components/company/publishedJobs/PdfRender";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
const JobApplicantsCompanyScreen = (props) => {
  const hideDialog = () => setVisible(false);
  const {
    navigation,
    route: { params },
  } = props;

  const GET_USERS = gql`
    query GET_APPLICANTS_JOB_COMPANY($jobId: String!) {
      Applications(where: { job: { equals: $jobId } }) {
        docs {
          applicant {
            position
            age
            sex
            cv
            profile
            province
            district
            id
            name
            description
          }
          createdAt
          id
          finalist
        }

        totalDocs
        hasNextPage
        hasPrevPage
        page
      }
    }
  `;
  const [visible, setVisible] = React.useState(false);
  const [currentPDFURL, setCurrentPDFURL] = useState("");
  const [applitionDocs, setApplicationDocs] = useState([]);
  const [isfetched, setIsfetched] = useState(false);
  const [tab, setTab] = useState("all");
  const [finalistApplications, setFinalistApplications] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { jobId: params.itemId },
    onCompleted: (data) => {
      setFinalistApplications(
        data?.Applications?.docs
          .filter((obj) => obj.finalist === "yes")
          .map((e) => e.id)
      );
    },
    fetchPolicy: "cache-and-network",
  });

  const openPDF = (pdfurl) => {
    setVisible(true);
    setCurrentPDFURL(pdfurl);
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content
              style={{ paddingHorizontal: 5, paddingVertical: 0 }}
            >
              <PdfRender url={currentPDFURL} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="outlined"
                style={{ paddingHorizontal: 10 }}
                onPress={hideDialog}
              >
                Cerrar
              </Button>
              <Button
                mode="contained"
                style={{ paddingHorizontal: 10 }}
                onPress={() => console.log("Ok")}
              >
                Descargar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={{ marginTop: 80, marginHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.gray800,
              fontSize: SIZES.xLarge,
              marginBottom: 10,
            }}
          >
            Postulantes
          </Text>
          {
            (data?.Applications?.docs && data?.Applications?.docs.length > 0) &&(
              <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 10,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => setTab("all")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor: tab === "all" ? COLORS.white : COLORS.primary,
                borderBottomColor:
                  tab === "all" ? COLORS.tertiary : COLORS.primary,
                borderBottomWidth: tab === "all" ? 1 : 0,
              }}
            >
              <Icon
                color={tab === "all" ? COLORS.black : COLORS.gray700}
                name="list"
                type="feather"
              />
              <Text
                style={{
                  fontFamily: FONT.medium,
                  color: tab === "all" ? COLORS.black : COLORS.gray700,
                }}
              >
                Todos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTab("finalists")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor:
                  tab === "finalists" ? COLORS.white : COLORS.primary,
                borderBottomColor:
                  tab === "finalists" ? COLORS.tertiary : COLORS.primary,
                borderBottomWidth: tab === "finalists" ? 1 : 0,
              }}
            >
              <Icon
                color={tab === "finalists" ? COLORS.black : COLORS.gray700}
                name="users"
                type="font-awesome-5"
              />
              <Text
                style={{
                  fontFamily: FONT.medium,
                  color: tab === "finalists" ? COLORS.black : COLORS.gray700,
                }}
              >
                Finalistas
              </Text>
            </TouchableOpacity>
          </View>
            )
          }
          {tab === "all" && (
            <>
              {!loading &&
                data &&
                data.Applications?.docs &&
                data.Applications?.docs.length > 0 && (
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <FlatList
                      data={[...data.Applications.docs].sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                      )}
                      contentContainerStyle={{ paddingBottom: 900 }}
                      horizontal={false}
                      showsVerticalScrollIndicator={false}
                      onEndReachedThreshold={0.1}
                      keyExtractor={(item) => String(item.id)}
                      showsHorizontalScrollIndicator={true}
                      renderItem={({ item }) => (
                        <ApplicantCardJobCompany
                          finalistApplications={finalistApplications}
                          setFinalistApplications={setFinalistApplications}
                          key={item.id}
                          openPDF={openPDF}
                          dataApplication={item}
                        />
                      )}
                      ListFooterComponent={
                        data.Applications.docs.length > 0 ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingHorizontal: 20,
                              alignItems: "center",
                            }}
                          >
                      
                          </View>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingHorizontal: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginTop: 50,
                                fontFamily: FONT.medium,
                                fontSize: SIZES.small,
                                color: COLORS.gray600,
                              }}
                            >
                              No se encontraron resultados
                            </Text>
                          </View>
                        )

                        // <ActivityIndicator
                        //   size="large"
                        //   style={styles.spinner}
                        //   color="#AEAEAE"
                        // />
                      }
                    />
                  </View>
                )}
            </>
          )}
          {/***FINALIST */}
          {tab === "finalists" && (
            <>
              {!loading &&
                data &&
                data.Applications?.docs &&
                data.Applications?.docs.length > 0 && (
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <FlatList
                      data={data.Applications.docs.filter((obj) =>
                        finalistApplications.includes(obj.id)
                      )}
                      contentContainerStyle={{ paddingBottom: 900 }}
                      horizontal={false}
                      showsVerticalScrollIndicator={false}
                      onEndReachedThreshold={0.1}
                      keyExtractor={(item) => String(item.id)}
                      showsHorizontalScrollIndicator={true}
                      renderItem={({ item }) => (
                        <ApplicantCardJobCompany
                          finalistApplications={finalistApplications}
                          setFinalistApplications={setFinalistApplications}
                          key={item.id}
                          openPDF={openPDF}
                          dataApplication={item}
                        />
                      )}
                      ListFooterComponent={
                        data.Applications.docs.length > 0 ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingHorizontal: 20,
                              alignItems: "center",
                            }}
                          >
                            {/* <Icon
                      onPress={previousPage}
                      size={40}
                      name="chevron-left"
                      type="material"
                      color={COLORS.gray800}
                    />
                    <Text
                      style={{
                        fontFamily: FONT.medium,
                        fontSize: SIZES.small,
                        color: COLORS.gray600,
                      }}
                    >
                      Pagina {dataApi.page} de {dataApi.totalPages}
                    </Text>
                    <Icon
                      onPress={nextPage}
                      size={40}
                      name="chevron-right"
                      type="material"
                      color={COLORS.gray800}
                    /> */}
                          </View>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingHorizontal: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginTop: 50,
                                fontFamily: FONT.medium,
                                fontSize: SIZES.small,
                                color: COLORS.gray600,
                              }}
                            >
                              No se encontraron resultados
                            </Text>
                          </View>
                        )

                        // <ActivityIndicator
                        //   size="large"
                        //   style={styles.spinner}
                        //   color="#AEAEAE"
                        // />
                      }
                    />
                  </View>
                )}
            </>
          )}
          {data &&
            data.Applications?.docs &&
            data.Applications?.docs.length === 0 && (
              <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: "center", fontFamily: FONT.medium }}>
                  Sin postulantes
                </Text>
              </View>
            )}
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default JobApplicantsCompanyScreen;

const styles = StyleSheet.create({});
