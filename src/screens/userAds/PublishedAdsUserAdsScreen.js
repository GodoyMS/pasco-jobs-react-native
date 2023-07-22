import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { COLORS, FONT, SIZES } from "@constants/theme";
import AdCardUserAds from "@components/userads/publishedAds/AdCardUserAds";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const PublishedAdsUserAdsScreen = () => {
  const userAds = useSelector((state) => state.userads.infoUserAds);
const[dataAds,setDataAds]=useState([])
  const GET_USERS = gql`
    query GET_ADS_BY_USER_AD($useradsId: String!) {
      Ads(where: { author: { equals: $useradsId } }) {
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

  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { useradsId: userAds ? userAds?.id : "" },onCompleted:(data)=>{setDataAds(data.Ads.docs)},

    fetchPolicy: "network-only",
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  

  if(loading){
    return (
      <View style={{flex:1}}>
        <View style={{flexDirection:"column",justifyContent:"center",height:"100%"}}>
        <ActivityIndicator color={COLORS.tertiary} size={40}/>

        </View>

      </View>
    )
  }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 50, marginHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.xLarge,
            marginBottom: 10,
          }}
        >
          Anuncios publicados
        </Text>

        {userAds && dataAds && dataAds.length > 0 && !loading && (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <FlatList
            
              data={dataAds}
              contentContainerStyle={{ paddingBottom: 200 }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              keyExtractor={(item) => String(item.id)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <AdCardUserAds dataAds={item} />
              )}
              ListFooterComponent={
                data?.Ads?.docs.length > 10 && (
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
                      Pagina {data?.Ads?.page} de {data?.Ads?.totalPages}
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



    </View>
    </SafeAreaView>
  );
};

export default PublishedAdsUserAdsScreen;

const styles = StyleSheet.create({});
