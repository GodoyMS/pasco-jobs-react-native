import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "@constants/theme";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { ActivityIndicator } from "react-native";
import JobCardCompany from "@components/company/publishedJobs/JobCardCompany";
import { Icon } from "@rneui/themed";
import { PaperProvider } from "react-native-paper";
import PdfRender from "@components/company/publishedJobs/PdfRender";
import { Image } from "react-native";
import emptyjobsImage from "@assets/images/jobs/emptyjobs-min.png";
import { useFocusEffect } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const PublishedJobsCompanyScreen = () => {
  const company = useSelector((state) => state.company.infoCompany);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);


  const GET_JOBS = gql`
  query JOBS_COMPANY ($authorId:String!) {
    Jobs(where:{author:{equals :$authorId}})  {
      docs {
        title
        createdAt
        author{
          name
          id
        }
        id
      }
      hasPrevPage
      hasNextPage
      page
      totalDocs
    }
  }
  `;


  const { loading, error, data, refetch } = useQuery(GET_JOBS, {
    variables: { authorId: company? company.id : "" },
    onCompleted: (data) => {
      setJobs(data.Jobs.docs);
    },
    fetchPolicy: "network-only",
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  // useEffect(() => {
  //   axios.get(`${backendURL}api/jobs?where[author][equals]=${company.id}`)
  //   .then(({data})=>setJobs(data.docs))
  //   .finally(()=>setIsLoading(false)); // Initial fetch on component mount
  // }, []);

  return (
    <PaperProvider>

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ marginTop: 50, marginHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.xLarge,
            marginBottom: 10,
          }}
        >
          Ofertas de trabajo publicadas
        </Text>
        {company && jobs && jobs.length > 0 && !loading && (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <FlatList
            
              data={jobs}
              contentContainerStyle={{ paddingBottom: 200 }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              keyExtractor={(item) => String(item.id)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <JobCardCompany dataJob={item} jobs={jobs} setJobs={setJobs} />
              )}
              ListFooterComponent={
                jobs.length > 10 && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      alignItems: "center",
                    }}
                  >
                    <Icon
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
                      Pagina {jobs.page} de {jobs.totalPages}
                    </Text>
                    <Icon
                      size={40}
                      name="chevron-right"
                      type="material"
                      color={COLORS.gray800}
                    />
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
        {company && jobs.length === 0 && (
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 50,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.medium,
                maxWidth: 300,
                marginBottom: 20,
              }}
            >
              Aun no tienes ninguna oferta de trabajo publicada
            </Text>
            <Image
              resizeMode="cover"
              style={{
                width: 300,
                height: 300,
                aspectRatio: "1/1",
                marginHorizontal: "auto",
              }}
              size="large"
              source={emptyjobsImage}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
    </PaperProvider>

  );
};

export default PublishedJobsCompanyScreen;

const styles = StyleSheet.create({});
