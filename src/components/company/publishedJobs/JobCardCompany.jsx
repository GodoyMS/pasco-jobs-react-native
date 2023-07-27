import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch
} from "react-native";
import React, { useEffect, useState } from "react";
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


  const [isEnabled, setIsEnabled] = useState(true);

 useEffect(()=>{
  if(dataJob?.expired)setIsEnabled(dataJob?.expired==="no")
  
 },[])
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigation = useNavigation();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const[isSwitchLoading,setIsSwitchLoading]=useState(false)
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

  const changeAvailable=async()=>{
    setIsSwitchLoading(true)
    setIsEnabled(previousState => !previousState)
    await axios.patch(`${backendURL}api/jobs/${dataJob?.id}`,{expired:isEnabled ? "yes" : "no"})
    .then(()=>setIsSwitchLoading(false))
      .catch(()=>console("Error"))
      .finally(()=>setIsSwitchLoading(false))
      
  }

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
    setIsDeleteLoading(true);
    await axios
      .delete(`${backendURL}api/jobs/${dataJob.id}`)
      .then(() => setJobs(jobs.filter((obj) => obj.id !== dataJob.id)))
      .then(() => setIsDeleteLoading(false))
      .catch((e) => console.log(e))
      .finally(() => setIsDeleteLoading(false));
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
              <TouchableOpacity
                mode="contained"
                disabled={isDeleteLoading}
                style={{
                  backgroundColor: COLORS.red700,
                  borderRadius: 6,
                  flexDirection:"row",
                  justifyContent:"center",
                  alignItems:"center",
                  paddingVertical:10,
                  flex: 1,
                }}
                onPress={deleteJob}
              >
                {isDeleteLoading ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text style={{ color: COLORS.white,fontFamily:FONT.regular }}>Eliminar</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                mode="oulined"
                style={{
                  backgroundColor: COLORS.gray600,
                  borderRadius: 6,
                  flexDirection:"row",
                  paddingVertical:10,

                  justifyContent:"center",
                  alignItems:"center",
                  flex: 1,
                }}
                onPress={hideModal}
              >
                <Text style={{ color: COLORS.white }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            backgroundColor: isEnabled ? COLORS.white : COLORS.gray200,
            height: "auto",
            paddingTop: 40,
            paddingBottom: 20,
            borderRadius: 5,
            marginVertical: 10,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONT.medium, fontSize:15 }}>
                {dataJob.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  columnGap: 2,
                }}
              >
                <Text
                  style={{
                    color: COLORS.gray600,
                    fontFamily: FONT.medium,
                    fontSize: SIZES.small,
                  }}
                >
                  Publicado el
                </Text>
                <Moment
                  style={{
                    color: COLORS.gray600,
                    fontFamily: FONT.medium,
                    fontSize: SIZES.small,
                  }}
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
                borderRadius: 5,
                padding: 10,
                flex: 1,
                borderWidth:1,
                borderColor:COLORS.gray400
              }}
              mode="contained"
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.gray800,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                Vista Previa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToApplicants}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                padding: 10,
                flex: 1,
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
                justifyContent: "center",
                borderWidth:1,
                borderColor:COLORS.indigo300,
                
              }}
              mode="contained"
            >
              <Icon
                name="users"
                size={15}
                color={COLORS.tertiary}
                type="font-awesome"
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.tertiary,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                Postulantes
              </Text>
            </TouchableOpacity>            
          </View>

          {data && (
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent:"flex-start",
              }}
            >
              {data.Applications.totalDocs > 0 ? (
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: COLORS.primary,
                    borderRadius: 5,
                   
                    elevation:4  
                  }}
                >
                  <Text
                    style={{ fontFamily: FONT.medium, color: COLORS.tertiary }}
                  >
                    {data.Applications.totalDocs} postulantes
                  </Text>
                </View>
              ) : (
                <Text
                  style={{ fontFamily: FONT.regular, color: COLORS.gray600,fontSize:12 }}
                >
                  Aun sin postulantes
                </Text>
              )}
            </View>
            
          )}
          {data &&   


        <View style={{flexDirection:"row",columnGap:5,alignItems:"center",justifyContent:"flex-end"}}>
          <Text style={{fontFamily:FONT.regular,color:isEnabled?COLORS.tertiary:COLORS.gray700}}>
            {isEnabled ? "Activo":"Vencido"}
          </Text>
          <Switch
          disabled={isSwitchLoading}
                    trackColor={{false: '#767577', true: COLORS.tertiary}}
                    thumbColor={isEnabled ? COLORS.gray300 : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={changeAvailable}
                    value={isEnabled}
                  />


        </View>
                  }
        
        </View>
      </PaperProvider>
    </>
  );
};

export default JobCardCompany;

const styles = StyleSheet.create({});
