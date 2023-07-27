import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { COLORS, FONT, SIZES } from "@constants/theme";
import AdCardUserAds from "@components/userads/publishedAds/AdCardUserAds";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";

const PublishedAdsUserAdsScreen = () => {
  const userAds = useSelector((state) => state.userads.infoUserAds);
  const [page, setPage] = useState(1);
  const [dataAds, setDataAds] = useState([]);
  const GET_USERS = gql`
    query GET_ADS_BY_USER_AD($useradsId: String!, $page: Int!) {
      Ads(where: { author: { equals: $useradsId } }, page: $page, limit: 10) {
        totalDocs
        hasPrevPage
        hasNextPage
        page
        totalPages
        docs {
          title
          author {
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
    variables: { useradsId: userAds ? userAds?.id : "", page },
    onCompleted: (data) => {
      setDataAds(data.Ads.docs);
    },

    fetchPolicy: "network-only",
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar/>
      <View style={{ marginTop: 35, marginHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.medium,
            marginBottom: 10,
          }}
        >
          Anuncios publicados
        </Text>
        {loading && (
          <View style={{ flex: 1, marginTop: 200 }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <ActivityIndicator color={COLORS.tertiary} size={40} />
            </View>
          </View>
        )}

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
                <AdCardUserAds dataAds={item} userAds={userAds} page={page} refetch={refetch} />
              )}
              ListFooterComponent={
                data?.Ads?.docs.length > 0 && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      alignItems: "center",
                    }}
                  >
                    {data?.Ads?.hasPrevPage && (
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
                      Pagina {data?.Ads?.page} de {data?.Ads?.totalPages}
                    </Text>
                    {data?.Ads?.hasNextPage && (
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
      </View>
    </SafeAreaView>
  );
};

export default PublishedAdsUserAdsScreen;

const styles = StyleSheet.create({});
