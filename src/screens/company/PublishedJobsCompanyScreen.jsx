import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useCallback } from "react";
import { useState } from "react";

import { ActivityIndicator } from "react-native";
import JobCardCompany from "@components/company/publishedJobs/JobCardCompany";
import { Icon } from "@rneui/themed";

import { Image } from "react-native";
import emptyjobsImage from "@assets/images/jobs/emptyjobs-min.png";
import { useFocusEffect } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";

const PublishedJobsCompanyScreen = () => {
  const company = useSelector((state) => state.company.infoCompany);
  const [jobs, setJobs] = useState([]);
  const[page,setPage]=useState(1)

  const GET_JOBS = gql`
  query JOBS_COMPANY ($authorId:String! , $page :Int!) {
    Jobs(where:{author:{equals :$authorId}} page:$page limit:10)  {
      docs {
        title
        createdAt
        author{
          name
          id
        }
        id
        expired
      }
      hasPrevPage
      hasNextPage
      page
      totalPages
      totalDocs
    }
  }
  `;


  const { loading, error, data, refetch } = useQuery(GET_JOBS, {
    variables: { authorId: company? company.id : "",page },
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
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary,          justifyContent: "space-between",
 }}>
  <StatusBar/>
      <View style={{ marginTop: 50, marginHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.medium,
            marginBottom: 10,
          }}
        >
          Ofertas de trabajo publicadas
        </Text>

        {loading &&<View style={{marginVertical:50}}><ActivityIndicator/></View>}
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
                jobs?.length > 0 && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      alignItems: "center",
                    }}
                  >
                    {data?.Jobs?.hasPrevPage && (
                      <Icon
                        onPress={() => setPage(page - 1)}
                        size={40}
                        name="chevron-left"
                        type="material"
                        color={COLORS.gray800}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: FONT.medium,
                        fontSize: SIZES.small,
                        color: COLORS.gray600,
                      }}
                    >
                      Pagina {data?.Jobs?.page} de {data?.Jobs?.totalPages}
                    </Text>
                    {data?.Jobs?.hasNextPage && (
                      <Icon
                        onPress={() => setPage(page + 1)}
                        size={40}
                        name="chevron-right"
                        type="material"
                        color={COLORS.gray800}
                      />
                    )}
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
        {!loading&& company && jobs.length === 0 && (
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
              Aun no tienes ninguna oferta de trabajo publicado
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
    </>

  );
};

export default PublishedJobsCompanyScreen;

const styles = StyleSheet.create({});
