import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    RefreshControl,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native";
  import { FlatList } from "react-native";
  import { COLORS, FONT, SIZES } from "@constants/theme";
  import { gql, useQuery } from "@apollo/client";
  import { useDispatch, useSelector } from "react-redux";
  import { useState } from "react";
  import { ActivityIndicator } from "react-native";
  import { useEffect } from "react";
  import AdCardUserScreen from "@components/user/ads/AdCardUserScreen";
  import ScreenLoader from "@components/loaders/ScreenLoader";
  import { Searchbar } from "react-native-paper";
  
  import CitySelectorUserAds from "@components/user/ads/CitySelectorUserAds";
import CitySelectorUserAdsUserAdsScreen from "@components/userads/Ads/CitySelectorUserAdsUserAdsScreen";
  
  export const AllAdsUserAdsScreen = ({ navigation }) => {
    // const infoUser = useSelector((state) => state.user.infoUser);
    const userLocationForAds = useSelector(
      (state) => state.userads.userAdsLocationForAds
    );
    const [data, setData] = useState([]); // Array to store the fetched data
    const [page, setPage] = useState(1); // Current page number
    const [isLoading, setIsLoading] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [isCityOpen, setIsCityOpen] = useState(false);
  
    const GET_ALL_ADS_BY_USER = gql`
      query GET_ALL_ADS_USER_SCREEN(
        $searchWord: String!
        $page: Int!
        $province: String!
      ) {
        Ads(
          where: { title: { like: $searchWord }, province: { like: $province } }
          page: $page
          limit: 10
          sort: "-createdAt"
        ) {
          totalDocs
  
          hasPrevPage
          hasNextPage
          page
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
    const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setData([]);
      setPage(1)
      refetch({ page, searchWord, province: userLocationForAds ? userLocationForAds : "" });
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    const handleChangeSearchWord = (text) => {
      setData([]);
      setPage(1)    
      setSearchWord(text);
    };
  
    const {
      loading,
      error,
      data: dataAds,
      refetch,
    } = useQuery(GET_ALL_ADS_BY_USER, {
      variables: {
        searchWord,
        page,
        province: userLocationForAds ? userLocationForAds : "",
      },
      fetchPolicy: "network-only",
    });
  
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
      return ( isLoading && !refreshing) ? <ActivityIndicator /> : null;
    };
  
    useEffect(() => {
      if (!loading) {
        setIsLoading(false);
      }
    }, [loading]);
  
    // if (loading && page === 1) {
    //   return <ScreenLoader loading={loading} />;
    // }
  
    if (error) {
      return (
        <View>
          <Text> Error loading data </Text>
        </View>
      );
    }
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <View style={{ marginTop: 30 }}>
          {/* <View style={{ marginTop: SIZES.medium, gap: SIZES.small }}>
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
          </View> */}
        </View>
        <View style={{ flexDirection: "row", zIndex: 999,backgroundColor:COLORS.white,width:"100%" }}>
          <Searchbar
            elevation={4}
            value={searchWord}
            onChangeText={handleChangeSearchWord}
            placeholderTextColor={COLORS.gray700}
            inputStyle={{ fontFamily: FONT.regular, fontSize: SIZES.small }}
            placeholder="Buscar anuncios"
            mode="bar"
            style={{  backgroundColor: COLORS.white,
              flex: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              height: 50,
              alignItems: "center",}}
          />
          <CitySelectorUserAdsUserAdsScreen
            refetch={refetch}
            setPage={setPage}
            setIsCityOpen={setIsCityOpen}
            isCityOpen={isCityOpen}
            setData={setData}
          />
        </View>
  
        <View style={{ flex: 1 }}>
          {loading && !refreshing && page === 1 && <ScreenLoader loading={loading} />}
          {!loading && !refreshing && data.length===0 && (<Text  style={{marginTop:50,textAlign:"center",fontFamily:FONT.regular}}>No se encontraron resultados</Text>)}
          <FlatList
  
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ flex: 1 }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <AdCardUserScreen dataAds={item} />}
            onEndReached={fetchData} // Trigger fetching more data when reaching the end
            onEndReachedThreshold={0.6} // Adjust the threshold as needed
            ListFooterComponent={renderFooter}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({});
  
  export default AllAdsUserAdsScreen;
  