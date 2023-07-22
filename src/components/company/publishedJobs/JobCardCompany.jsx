import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";

import Moment from "react-moment";
import "moment/locale/es";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { backendURL } from "@config/config";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const JobCardCompany = ({ dataJob, jobs, setJobs }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigation = useNavigation();

  const NUMBER_APPLICANTS_BY_JOB = gql`
    query JOBS_COMPANY($jobId: String!) {
      Applications(where: { job: { equals: $jobId } }) {
        docs {
          id
        }
        totalDocs
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(NUMBER_APPLICANTS_BY_JOB, {
    variables: { jobId: dataJob.id },
    fetchPolicy: "cache-and-network",
  });

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  };

  const deleteJob = async () => {
    await axios
      .delete(`${backendURL}api/jobs/${dataJob.id}`)
      .then(() => setJobs(jobs.filter((obj) => obj.id !== dataJob.id)))

      .catch((e) => console.log(e));
  };
  const navigateToDetails = () => {
    navigation.navigate("JobDetailsCompany", { itemId: dataJob.id });
  };
  const navigateToApplicants = () => {
    navigation.navigate("JobApplicantsCompany", { itemId: dataJob.id });
  };

  return (
    <>
      <PaperProvider settings={{ rippleEffectEnabled: false }}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text style={{ color: COLORS.gray800 }}>
              ¿Estas seguro de eliminar esta oferta laboral?
            </Text>
            <View
              style={{ flexDirection: "row", columnGap: 10, marginTop: 10 }}
            >
              <Button
                mode="contained"
                style={{
                  backgroundColor: COLORS.red700,
                  borderRadius: 6,
                  flex: 1,
                }}
                onPress={deleteJob}
              >
                <Text style={{ color: COLORS.white }}>Eliminar</Text>
              </Button>
              <Button
                mode="oulined"
                style={{
                  backgroundColor: COLORS.gray600,
                  borderRadius: 6,
                  flex: 1,
                }}
                onPress={hideModal}
              >
                <Text style={{ color: COLORS.white }}>Cancelar</Text>
              </Button>
            </View>
          </Modal>
        </Portal>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            backgroundColor: COLORS.white,
            height: "auto",
            paddingTop: 40,
            paddingBottom: 20,
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}>
                {dataJob.title}
              </Text> 
              <View style={{flexDirection:"row", justifyContent:"flex-start",alignItems:"center",columnGap:2}}>
                <Text style={{ color: COLORS.gray600,fontFamily:FONT.medium}}>
                Publicado el
                </Text>
                <Moment
                style={{ color: COLORS.gray600,fontFamily:FONT.medium }}
                element={Text}
                locale="es"
                format="  DD MMMM, YYYY"
              >
                {dataJob.createdAt}
              </Moment>

              </View>
            
            </View>
            <View>
              <TouchableOpacity onPress={showModal}>
                <Icon name="delete" color={COLORS.red600} type="material" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              columnGap: 10,
              flexWrap: "wrap",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToDetails}
              style={{
                backgroundColor: COLORS.gray200,
                borderRadius: 10,
                padding: 10,
                flex: 1,
              }}
              mode="contained"
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.gray800,
                  textAlign: "center",
                  fontSize: SIZES.medium,
                }}
              >
                {" "}
                Vista Previa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToApplicants}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                padding: 10,
                flex: 1,
                flexDirection: "row",
                columnGap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
              mode="contained"
            >
              <Icon name="users" color={COLORS.tertiary} type="font-awesome" />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.tertiary,
                  textAlign: "center",
                  fontSize: SIZES.medium,
                }}
              >
                Postulantes
              </Text>
            </TouchableOpacity>
          </View>

          {data && (
            <View style={{ marginTop: 20,flexDirection:"row",justifyContent:"flex-start" }}>
              {data.Applications.totalDocs > 0 ? (

                <View style={{paddingHorizontal:10,paddingVertical:5,backgroundColor:COLORS.primary,borderRadius:5}}>
                   <Text style={{ fontFamily: FONT.medium,color:COLORS.tertiary }}>
                  {data.Applications.totalDocs} postulantes
                </Text>
                </View>
               
              ) : (
                <Text style={{ fontFamily: FONT.medium,color:COLORS.gray600}}>Aun sin postulantes</Text>
              )}
            </View>
          )}
        </View>
      </PaperProvider>
    </>
  );
};

export default JobCardCompany;

const styles = StyleSheet.create({});
