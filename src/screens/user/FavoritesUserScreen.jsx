     import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { Component, useEffect,useState } from "react";
import { TouchableOpacity } from "react-native";
import stylesFavJobs from "@components/user/favJobs/stylesFavJobs";
import { COLORS, SIZES, FONT } from "@constants/theme";
import { FavJobCard } from "@components/user/favJobs/FavJobCard";
import { FlatList } from "react-native";
import axios from "axios";
import { backendURL } from "@config/config";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { gql, useQuery } from "@apollo/client";
import { useLayoutEffect } from "react";
import { useCallback } from "react";
export const FavoritesUserScreen = () => {
  const [dataFavJobs, setDataFavJobs] = useState(null);
  const [error, setError] = useState(null);
  const user=useSelector((state)=>state.user.infoUser)
  const favJobsIds=useSelector((state)=>state.user.favUserJobs)

  // const fetchData = async () => {
  //   try {
      
  //     const response = await axios.get(`${backendURL}api/favoriteJobs?where[user][equals]=${user.id}`);
  //     setDataFavJobs(response.data.docs);
  //     console.log(response)
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };

  const GET_COMPANY = gql`
  query GET_FAVJOBS_BY_USER($userId: String!) {
    FavoriteJobs(where:{user:{equals:$userId}}) {
      totalDocs
      docs{
        job{
          title
          id
          createdAt
          contract{
            name
            id
          }
          workShift{
            name
            id
          }
          workExperience{
            name
            id
          }
          salary
          province
          district
          id           
        }
        id    
      }
    }
  }
`;
const { error:errorGQL,loading, refetch,data } = useQuery(GET_COMPANY, {
  variables: { userId: user?.id ? user?.id : ""},

  fetchPolicy: "network-only",
});

useLayoutEffect(
  useCallback(() => {
    refetch();
  }, [])
);




  // useEffect(() => {
  //   fetchData();
  // }, [favJobsIds]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.indigo600} />
      </View>
    );
  }
  if (errorGQL) {
    return (
      <View style={styles.container}>
        <Text>Ocurrio un error</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={stylesFavJobs.container}>
       

        <View style={stylesFavJobs.cardsContainer}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: SIZES.large,
              fontFamily: FONT.medium,
              color: COLORS.gray,
              marginBottom: 10,
            }}
          >
            Trabajos favoritos
          </Text>
        </View>
      </View>
      {data && user && (
        <View style={{ flex: 1 }}>
          <FlatList
          contentContainerStyle={{paddingBottom:100}}
            style={{ flex: 1 }}
            data={data?.FavoriteJobs?.docs ?data?.FavoriteJobs?.docs :[] }
            showsVerticalScrollIndicator={true}
            onEndReachedThreshold={0.6}
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              <FavJobCard userId={user.id} dataFavJob={item} />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesUserScreen;
