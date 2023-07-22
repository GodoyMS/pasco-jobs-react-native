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
import CompanyCardUserScreenjsx from "@components/user/companies/CompanyCardUserScreen";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

export const AllCompaniesUserScreen = ({ navigation }) => {
  const infoUser = useSelector((state) => state.user.infoUser);
  const [data, setData] = useState([]); // Array to store the fetched data
  const [page, setPage] = useState(1); // Current page number
  const [isLoading, setIsLoading] = useState(false); 

  const GET_ALL_COMPANIES_USER_SCREEN = gql`
    query GET_ALL_COMPANIES_USER_SCREEN($page: Int!) {
      Employers(page: $page limit:4 sort:"createdAt") {
        totalDocs
        totalDocs
        hasPrevPage
        hasNextPage
        page
        docs {
          name
          province
          profile
          district
          description
          id
        }
      }
    }
  `;
  const { loading, error, data: dataCompanies, refetch } = useQuery(
    GET_ALL_COMPANIES_USER_SCREEN,
    { variables: { page }, fetchPolicy: 'network-only' }
  );
  
  useEffect(() => {
    if (!loading && dataCompanies) {
      setData((prevData) => [...prevData, ...dataCompanies?.Employers?.docs]);
    }
  }, [loading, dataCompanies]);

  const fetchData = () => {
    if (!isLoading && dataCompanies?.Employers?.hasNextPage) {
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

  if (loading && page === 1) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <View><Text> Error loading data </Text></View>;
  }

  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ marginTop: 20 }}>
        <View style={{ marginTop: SIZES.medium, gap: SIZES.small }}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: SIZES.medium,
              fontFamily: FONT.medium,
              color: COLORS.gray800,
              marginBottom: 10,
            }}
          >
            Empresas
          </Text>
        </View>
      </View>
     
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 100 }}
              style={{ flex: 1 }}
              data={data}
              showsVerticalScrollIndicator={true}
              keyExtractor={(item,index) => item.id.toString()}
              showsHorizontalScrollIndicator={true}
              renderItem={({ item }) => (
                <CompanyCardUserScreenjsx companyData={item} />
              )}
              onEndReached={fetchData} // Trigger fetching more data when reaching the end
              onEndReachedThreshold={0.6} // Adjust the threshold as needed
              ListFooterComponent={renderFooter} 
             

            />
          </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AllCompaniesUserScreen;
