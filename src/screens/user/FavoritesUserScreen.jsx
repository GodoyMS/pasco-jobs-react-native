     import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, {useState } from "react";

import stylesFavJobs from "@components/user/favJobs/stylesFavJobs";
import { COLORS, SIZES, FONT } from "@constants/theme";
import { FavJobCard } from "@components/user/favJobs/FavJobCard";
import { FlatList } from "react-native";

import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { gql, useQuery } from "@apollo/client";
import { useLayoutEffect } from "react";
import { useCallback } from "react";
import { Icon } from "@rneui/themed";
export const FavoritesUserScreen = () => {
  const [dataFavJobs, setDataFavJobs] = useState(null);
  const [error, setError] = useState(null);
  const user=useSelector((state)=>state.user.infoUser)
  const favJobsIds=useSelector((state)=>state.user.favUserJobs)
  const [page,setPage]=useState(1)
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
  query GET_FAVJOBS_BY_USER($userId: String!,$page:Int!) {
    FavoriteJobs(where:{user:{equals:$userId}} page:$page limit:10) {
      totalDocs
      page
      hasNextPage
      hasPrevPage
      totalPages
      docs{
        job{
          title
          expired
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
  variables: { userId: user?.id ,page},

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
      <StatusBar/>
      <View style={stylesFavJobs.container}>
       

        <View style={stylesFavJobs.cardsContainer}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: SIZES.medium,
              fontFamily: FONT.medium,
              color: COLORS.gray,
              marginBottom: 10,
            }}
          >
            Trabajos favoritos
          </Text>
        </View>
      </View>
      {data?.FavoriteJobs?.docs.length===0 && <View style={{marginVertical:30}}>
        <Text style={{textAlign:"center",fontFamily:FONT.regular,fontSize:SIZES.small,color:COLORS.gray600}}>Aun no tienes trabajos guardados</Text>
        </View>}
      {data && data?.FavoriteJobs?.docs.length>0 && user && (
        <View style={{ flex: 1 }}>
          <FlatList
          contentContainerStyle={{paddingBottom:100}}
            style={{ flex: 1 }}
            data={data?.FavoriteJobs?.docs }
            showsVerticalScrollIndicator={true}
            onEndReachedThreshold={0.6}
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              <FavJobCard userId={user.id} dataFavJob={item} />
            )}

            ListFooterComponent={
              data?.FavoriteJobs?.docs?.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    alignItems: "center",
                  }}
                >
                  {data?.FavoriteJobs?.hasPrevPage && (
                    <Icon
                    onPress={()=>setPage(page-1)}
                  
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
                    Pagina {data?.FavoriteJobs?.page} de {data?.FavoriteJobs?.totalPages}
                  </Text>
                 {data?.FavoriteJobs?.hasNextPage &&  <Icon
                    onPress={()=>setPage(page+1)}
                    size={40}
                    name="chevron-right"
                    type="material"
                    color={COLORS.gray800}
                  />}
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
