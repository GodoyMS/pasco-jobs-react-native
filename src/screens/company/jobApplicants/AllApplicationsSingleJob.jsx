import {  ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { COLORS, SIZES, FONT } from "@constants/theme";
import { Icon } from "@rneui/themed";
import ApplicantCardJobCompany from "@components/company/publishedJobs/ApplicantCardJobCompany";

const AllApplicationsSingleJob = ({ jobId, openPDF }) => {

    const[page,setPage]=useState(1);
    const [finalistApplications, setFinalistApplications] = useState([]);
  
    const GET_USERS = gql`
    query GET_APPLICANTS_JOB_COMPANY($jobId: String! ,$page:Int!) {
      Applications(where: { job: { equals: $jobId } } page:$page limit:15) {
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
        totalPages
        totalDocs
        hasNextPage
        hasPrevPage
        page
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { jobId: jobId? jobId :"",page },
    // onCompleted: (data) => {
    //   setFinalistApplications(
    //     data?.Applications?.docs
    //       .filter((obj) => obj.finalist === "yes")
    //       .map((e) => e.id)
    //   );
    // },
    fetchPolicy:  "cache-and-network"
  });
  return (
    <>

    {loading && <View style={{marginTop:50}}><ActivityIndicator color={COLORS.tertiary} size={25}/></View>}
      {!loading &&
        data &&
        data.Applications?.docs &&
        data.Applications?.docs.length > 0 && (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <FlatList
              data={[...data.Applications.docs].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              )}
              contentContainerStyle={{ paddingBottom: 300 }}
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
                    {data?.Applications?.hasPrevPage && (
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
                      Pagina {data?.Applications?.page} de{" "}
                      {data?.Applications?.totalPages}
                    </Text>
                    {data?.Applications?.hasNextPage && (
                      <Icon
                        onPress={() => setPage(page + 1)}
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

          {data &&
            data.Applications?.docs &&
            data.Applications?.docs.length === 0 && (
              <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: "center", fontFamily: FONT.regular,color:COLORS.gray600 }}>
                  Sin postulantes
                </Text>
              </View>
            )}
    </>
  );
};

export default AllApplicationsSingleJob;

const styles = StyleSheet.create({});
