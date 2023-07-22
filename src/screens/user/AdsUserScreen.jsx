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
import AdCardUserAds from "@components/userads/publishedAds/AdCardUserAds";
import AdCardUserScreen from "@components/user/ads/AdCardUserScreen";

export const AdsUserScreen = ({ navigation }) => {
  const infoUser = useSelector((state) => state.user.infoUser);
  const [data, setData] = useState([]); // Array to store the fetched data
  const [page, setPage] = useState(1); // Current page number
  const [isLoading, setIsLoading] = useState(false); 

  const GET_ALL_ADS_BY_USER = gql`
    query GET_ALL_ADS_USER_SCREEN($page: Int!) {
      Ads(page: $page limit:4 sort:"-createdAt") {
        totalDocs
        
        hasPrevPage
        hasNextPage
        page
        docs {
          title
          author{
            name
            profile
            whatsapp
            phone
          }
          image

          createdAt
          province          
          district
          description
          id
        }
      }
    }
  `;
  const { loading, error, data: dataAds, refetch } = useQuery(
    GET_ALL_ADS_BY_USER,
    { variables: { page }, fetchPolicy: 'network-only' }
  );
  
  useEffect(() => {
    if (!loading && dataAds) {
      setData((prevData) => [...prevData, ...dataAds?.Ads?.docs]);
    }
  }, [loading, dataAds]);

  const fetchData = () => {
    if (!isLoading && dataAds?.Ads?.hasNextPage) {
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
            Anuncios
          </Text>
        </View>
      </View>
     
          <View style={{ flex: 1 }}>
            <FlatList

              contentContainerStyle={{ paddingBottom: 100 }}
              style={{ flex: 1 }}
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item,index) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <AdCardUserScreen dataAds={item} />
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

export default AdsUserScreen;
