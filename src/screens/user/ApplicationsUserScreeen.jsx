import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import ApplicationJobCard from "@components/user/applicationJobs/ApplicationJobCard";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { PaperProvider } from "react-native-paper";
import ScreenLoader from "@components/loaders/ScreenLoader";

export const ApplicationsUserScreen = ({ navigation }) => {
  const infoUser = useSelector((state) => state.user.infoUser);

  const GET_APPLICATIONS_BY_USER = gql`
    query GET_APPLICATIONS_BY_USER($applicantId: String!) {
      Applications(where: { applicant: { equals: $applicantId } }) {
        docs {
          id
          job {
            title
            createdAt
            id
            contract {
              name
            }
            category {
              name
            }
            workShift {
              name
            }
            workExperience {
              name
            }
            salary
            province
            district
            expired
          }
          finalist
          
          author {
            profile
            name
          }
        }
        totalDocs
        hasPrevPage
        hasNextPage
        page
      }
    }
  `;
    
  const [data, setData] = useState(null);
  const [dataApplicationsLocal, setDataApplicationsLocal] = useState([]);
  const {
    loading,
    error,
    data: dataApplications,
    refetch,
  } = useQuery(GET_APPLICATIONS_BY_USER, {
    variables: { applicantId: infoUser?.id  ? infoUser?.id : "" },
    onCompleted: (data) => {

      setData(data.Applications);
      setDataApplicationsLocal(data.Applications.docs);
    },
    fetchPolicy:"network-only",
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  if(loading){
    return <ScreenLoader loading={loading}/>
  }
  return (
    <PaperProvider>

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ marginTop: 50 }}>

        <View style={{ marginTop: SIZES.medium, gap: SIZES.small }}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: SIZES.large,
              fontFamily: FONT.medium,
              color: COLORS.gray,
              marginBottom: 10,
            }}
          >
            Trabajos postulados
          </Text>
        </View>
      </View>
      {data && dataApplicationsLocal.length > 0 && infoUser && (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ flex: 1 }}
            data={dataApplicationsLocal}
            showsVerticalScrollIndicator={true}
            onEndReachedThreshold={0.6}
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              <ApplicationJobCard
                dataApplicationsLocal={dataApplicationsLocal}
                setDataApplicationsLocal={setDataApplicationsLocal}
                userId={infoUser.id}
                dataJob={item}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
    </PaperProvider>

  );
};

const styles = StyleSheet.create({});

export default ApplicationsUserScreen;
