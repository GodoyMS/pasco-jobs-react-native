import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ApplicantFinalistCardJobCompany from "@components/company/publishedJobs/ApplicantFinalistCardJobCompany";
import { gql, useQuery } from "@apollo/client";
import { COLORS, SIZES, FONT } from "@constants/theme";
import { Icon } from "@rneui/themed";

const FinalistApplications = ({ jobId, openPDF }) => {
  const [pageFinalist, setPageFinalist] = useState(1);

  const GET_APPLICATIONS_FINALISTS = gql`
    query GET_APPLICANTS_JOB_COMPANY($jobId: String!, $page: Int!) {
      Applications(
        where: { job: { equals: $jobId }, finalist: { equals: "yes" } }
        page: $page
        limit: 10
      ) {
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
            id
          }
          createdAt
          id
          finalist
        }
        totalPages
        totalDocs
        hasNextPage
        hasPrevPage
        page
      }
    }
  `;

  const [finalistApplicationsArray, setFinalistApplicationsArray] = useState(
    []
  );
  const { loading: loadingFinalist, data: dataFinalistApplicationsGQL,refetch } =
    useQuery(GET_APPLICATIONS_FINALISTS, {
      variables: { jobId: jobId ? jobId : "", page: pageFinalist },
      onCompleted: (data) => {
        setFinalistApplicationsArray(data?.Applications?.docs);
      },
      fetchPolicy:  "cache-and-network",
    });

  return (
    <>
        {loadingFinalist && <View style={{marginTop:50}}><ActivityIndicator color={COLORS.tertiary} size={25}/></View>}

        {!loadingFinalist && finalistApplicationsArray.length===0 && <View style={{marginTop:50}}><Text style={{textAlign:"center",fontFamily:FONT.regular,color:COLORS.gray600}}>Ningun finalista</Text></View>}
      {!loadingFinalist &&
        finalistApplicationsArray &&
        finalistApplicationsArray.length > 0 && (
          <View style={{ display: "flex", flexDirection: "column" }}>

            <FlatList
              data={finalistApplicationsArray}
              contentContainerStyle={{ paddingBottom: 300 }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              keyExtractor={(item) => String(item.id)}
              showsHorizontalScrollIndicator={true}
              renderItem={({ item }) => (
                <ApplicantFinalistCardJobCompany
                refetch={refetch}
                  finalistApplicationsArray={finalistApplicationsArray}
                  setFinalistApplicationsArray={setFinalistApplicationsArray}
                  key={item.id}
                  openPDF={openPDF}
                  dataApplication={item}
                />
              )}
              ListFooterComponent={
                dataFinalistApplicationsGQL.Applications.docs.length > 0 ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      alignItems: "center",
                    }}
                  >
                    {dataFinalistApplicationsGQL?.Applications?.hasPrevPage && (
                      <Icon
                        onPress={() => setPageFinalist(pageFinalist - 1)}
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
                      Pagina {dataFinalistApplicationsGQL?.Applications?.page}{" "}
                      de {dataFinalistApplicationsGQL?.Applications?.totalPages}
                    </Text>
                    {dataFinalistApplicationsGQL?.Applications?.hasNextPage && (
                      <Icon
                        onPress={() => setPageFinalist(pageFinalist + 1)}
                        size={40}
                        name="chevron-right"
                        type="material"
                        color={COLORS.gray800}
                      />
                    )}
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
              }
            />

          </View>
          
        )}
    </>
  );
};

export default FinalistApplications;

const styles = StyleSheet.create({});
