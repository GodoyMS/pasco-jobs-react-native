import { Text, StyleSheet, View, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useState } from "react";

import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import ScreenLoader from "@components/loaders/ScreenLoader";
import { Searchbar } from "react-native-paper";

import ProfessionalCardCompanyScreen from "@components/company/professionals/ProfessionalCardCompanyScreen";
import CitySelectorApplicantsCompanyScreen from "@components/company/professionals/CitySelectorApplicantsCompanyScreen";
import { StatusBar } from "expo-status-bar";

export const AllApplicantsCompanyScreen = ({ navigation }) => {
  const companyLocationForApplicants = useSelector(
    (state) => state.company.companyLocationForApplicants
  );
  const [data, setData] = useState([]); // Array to store the fetched data
  const [page, setPage] = useState(1); // Current page number
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const handleChangeSearchWord = (text) => {
    setData([]);
    setPage(1);
    setSearchWord(text);
  };

  //HIDE FEATURED COMPANIES
  const scrollY = useRef(new Animated.Value(0)).current;
  const containerHeight = useRef(new Animated.Value(220)).current; // Initial height of the container
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // Adjust the threshold value as needed
        if (offsetY > 100) {
          Animated.timing(containerHeight, {
            toValue: 0,
            duration: 100, // Adjust the duration as desired
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(containerHeight, {
            toValue: 220,
            duration: 100, // Adjust the duration as desired
            useNativeDriver: false,
          }).start();
        }
      },
    }
  );

  const GET_ALL_APPLICANTS_COMPANY_SCREEN = gql`
    query GET_ALL_APPLICANTS_COMPANY_SCREEN(
      $searchWord: String!
      $page: Int!
      $province: String!
    ) {
      Applicants(
        where: {
          OR: [
            { name: { like: $searchWord } }
            { description: { like: $searchWord } }
            { position: { like: $searchWord } }
          ]
          AND: [{ province: { like: $province } }]
        }

        page: $page
        limit: 20
        sort: "createdAt"
      ) {
        totalDocs
        totalDocs
        hasPrevPage
        hasNextPage
        page
        docs {
          name
          province
          profile
          sex
          position
          district
          description
          id
        }
      }
    }
  `;

  // const GET_ALL_FEATURED_COMPANIES_USER_SCREEN = gql`
  //   query GET_ALL_FEATURED_COMPANIES_USER_SCREEN {
  //     Employers(
  //       where:  { featured: { equals: "yes" } }
  //       limit: 10
  //       sort: "createdAt"
  //     ) {
  //       totalDocs
  //       totalDocs
  //       hasPrevPage
  //       hasNextPage
  //       page
  //       docs {
  //         name
  //         province
  //         heading
  //         profile
  //         district
  //         description
  //         id
  //       }
  //     }
  //   }
  // `;
  // const { loading: loadingFeatured, data: dataFeaturedCompanies } = useQuery(
  //   GET_ALL_FEATURED_COMPANIES_USER_SCREEN,
  //   { fetchPolicy: "cache-and-network" }
  // );

  const {
    loading,
    error,
    data: dataCompanies,
    refetch,
  } = useQuery(GET_ALL_APPLICANTS_COMPANY_SCREEN, {
    variables: {
      page,
      searchWord,
      province: companyLocationForApplicants
        ? companyLocationForApplicants
        : "",
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && dataCompanies) {
      setData((prevData) => [...prevData, ...dataCompanies?.Applicants?.docs]);
    }
  }, [loading, dataCompanies]);

  const fetchData = () => {
    if (!isLoading && dataCompanies?.Applicants?.hasNextPage) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return isLoading ? <ActivityIndicator /> : null;
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (error) {
    return (
      <View>
        <Text> Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar/>
      <View style={{ marginHorizontal: 20, zIndex: 999,marginTop:50 }}>
        <Text style={{ fontFamily: FONT.medium, textAlign: "center",marginBottom:5,color:COLORS.tertiary }}>
          Profesionales
        </Text>
        <View
          style={{
            flexDirection: "row",
            zIndex: 999,
            width: "100%",
          }}
        >
          <Searchbar
            elevation={4}
            value={searchWord}
            onChangeText={handleChangeSearchWord}
            placeholderTextColor={COLORS.gray700}
            inputStyle={{ fontFamily: FONT.regular, fontSize: SIZES.small }}
            placeholder="Buscar profesionales"
            mode="bar"
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              height: 50,
              alignItems: "center",
            }}
          />
          <CitySelectorApplicantsCompanyScreen
            refetch={refetch}
            setPage={setPage}
            setIsCityOpen={setIsCityOpen}
            isCityOpen={isCityOpen}
            setData={setData}
          />
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "column", marginTop: 10 }}>
        {/* {!loadingFeatured && (

            <Animated.View style={{ height: containerHeight, backgroundColor: COLORS.white }}>            
              <FlatList
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginVertical: 5,
                }}
                contentContainerStyle={{ height: 200 }}
                data={dataFeaturedCompanies?.Employers?.docs}
                horizontal={true}
                keyExtractor={(item, index) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <FeaturedCompanyCardUserScreen companyData={item} />
                )}
              />           
            </Animated.View>            
        )} */}

        <View style={{ flex: 1 }}>
          {loading && page === 1 && <ScreenLoader loading={loading} />}
          {!loading && data.length === 0 && (
            <Text
              style={{
                marginTop: 50,
                textAlign: "center",
                fontFamily: FONT.regular,
              }}
            >
              No se encontraron resultados
            </Text>
          )}

          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ flex: 1 }}
            data={data}
            showsVerticalScrollIndicator={true}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              <ProfessionalCardCompanyScreen companyData={item} />
            )}
            onEndReached={fetchData} // Trigger fetching more data when reaching the end
            onEndReachedThreshold={0.6} // Adjust the threshold as needed
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AllApplicantsCompanyScreen;
