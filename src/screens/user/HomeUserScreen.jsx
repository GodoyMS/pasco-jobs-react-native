import {
  Text,
  StyleSheet,
  View,
  Platform,
  Image,
  Animated,
} from "react-native";
import React, { Component, useEffect, useRef } from "react";

import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import icons from "@constants/icons";
import JobCard from "@components/user/home/JobCard";
import { useState } from "react";
import { COLORS, SIZES, FONT } from "@constants/theme";
import { TextInput } from "react-native";
import stylesHome from "@components/user/home/stylesHome";
import { Icon } from "@rneui/themed";
import useFetchJobs from "@hooks/user/fetchJobs";
import axios from "axios";
import { FlatList } from "react-native";
import getUserinfo from "@hooks/user/getUserInfo";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  cleanUserFavCategory,
  cleanUserLocation,
  clearUser,
  setUserFavCategory,
  setUserLocation,
} from "@features/user/userSlice";
import { Searchbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Modal } from "react-native";
import { Chip } from "react-native-paper";

export const HomeUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.infoUser);
  const userLocation = useSelector((state) => state.user.userLocation);
  const userFavCategory = useSelector((state) => state.user.userFavCategory);

  const tokenExpTime = useSelector((state) => state.user.exp);

  const [openContract, setOpenContract] = useState(false);
  const [valueContract, setValueContract] = useState(null);
  const [itemsContract, setItemsContract] = useState([
    { label: "Contrato definido", value: "Contrato definido" },
    { label: "Contrato indefinido", value: "Contrato indefinido" },
    {
      label: "Contrato de obra determinada",
      value: "Contrato de obra determinada",
    },
    { label: "Temporal", value: "Temporal" },
    { label: "Prácticas", value: "Practicas" },
  ]);

  const [openWorkShift, setOpenWorkShift] = useState(false);
  const [valueWorkShift, setValueWorkShift] = useState(null);
  const [itemsWorkShift, setItemsWorkShift] = useState([
    { label: "Tiempo completo", value: "Tiempo completo" },
    { label: "Medio tiempo", value: "Medio tiempo" },
  ]);

  const [openExperience, setOpenExperience] = useState(false);
  const [valueExperience, setValueExperience] = useState(null);
  const [itemsExperience, setItemsExperience] = useState([
    { label: "Sin experiencia", value: "Sin experiencia" },
    { label: "0-6 meses", value: "0-6 meses" },
    { label: "3-6 meses", value: "3-6 meses" },
    { label: "6 meses-1 año ", value: "6 meses-1 año" },
    { label: "1-2 años", value: "1-2 años" },
    { label: "2-3 años", value: "2-3 años" },
    { label: "3-5 años", value: "3-5 años" },
    { label: "5-7 años", value: "5-7 años" },
    { label: "7-10 años", value: "7-10 años" },
    { label: "Mayor a 10 años", value: "Mayor a 10 años" },
  ]);

  const [openSalary, setOpenSalary] = useState(false);
  const [valueSalary, setValueSalary] = useState(null);
  const [itemsSalary, setItemsSalary] = useState([
    { label: "Hasta S/.1000", value: "&where[salary][less_than_equal]=1000" },
    { label: "Hasta S/.1500", value: "&where[salary][less_than_equal]=1500" },
    { label: "Hasta S/.2500", value: "&where[salary][less_than_equal]=2500" },
    {
      label: "Mayor a S/.2500",
      value: "&where[salary][greater_than_equal]=2500",
    },
    {
      label: "Mayor a S/.3000",
      value: "&where[salary][greater_than_equal]=3000",
    },
    {
      label: "Mayor a S/.5000",
      value: "&where[salary][greater_than_equal]=5000",
    },
  ]);

  // const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryBackUp, setSearchQueryBackup] = useState("");
  console.log(searchQuery);

  const { isLoading, error, dataApi } = useFetchJobs({
    searchWord: searchWord,
    query: searchQuery,
    category: "",
    page: page,
  });

  const handleSearchWord = (text) => {
    setSearchQuery(`where[title][like]=${text}`);
    setSearchQueryBackup(`where[title][like]=${text}`);
    if (page !== 1) setPage(1);
    setSearchWord(text);
  };

  const handleFilterQuery = () => {
    setModalVisible(false);
    setSearchQuery("");
    if (searchQueryBackUp) setSearchQuery(searchQueryBackUp);
    if (valueWorkShift)
      setSearchQuery(
        (prevSelectedElements) =>
          `${prevSelectedElements}&where[workShift.name][equals]=${valueWorkShift}`
      );
    if (valueContract)
      setSearchQuery(
        (prevSelectedElements) =>
          `${prevSelectedElements}&where[contract.name][equals]=${valueContract}`
      );
    if (valueExperience)
      setSearchQuery(
        (prevSelectedElements) =>
          `${prevSelectedElements}&where[workExperience.name][equals]=${valueExperience}`
      );
    if (valueSalary)
      setSearchQuery(
        (prevSelectedElements) => `${prevSelectedElements}${valueSalary}`
      );
  };

  const handleCleanFilterQuery = () => {
    setSearchQuery("");
    setValueContract(null);
    setValueExperience(null);
    setValueSalary(null);
    setValueWorkShift(null);
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const remainingTimeExpToken = tokenExpTime * 1000 - Date.now();

      if (remainingTimeExpToken <= 0) {
        try {
          dispatch(clearUser());
          navigation.popToTop();
        } catch (error) {
          navigation.popToTop();
        }
      }
    };
    checkTokenExpiration(); // Check the token expiration on component mount
    const interval = setInterval(checkTokenExpiration, 1000); // Check token expiration periodically (e.g., every minute)
    return () => clearInterval(interval); //
  }, [tokenExpTime]);

  const filterActions = [
    {
      id: 1,
      z: 500,
      name: "Contrato",
      open: openContract,
      setOpen: setOpenContract,
      value: valueContract,
      setValue: setValueContract,
      items: itemsContract,
      setItems: setItemsContract,
    },
    {
      id: 2,
      z: 400,

      name: "Experiencia",
      open: openExperience,
      setOpen: setOpenExperience,
      value: valueExperience,
      setValue: setValueExperience,
      items: itemsExperience,
      setItems: setItemsExperience,
    },
    {
      id: 3,
      z: 300,

      name: "Salario",
      open: openSalary,
      setOpen: setOpenSalary,
      value: valueSalary,
      setValue: setValueSalary,
      items: itemsSalary,
      setItems: setItemsSalary,
    },
    {
      id: 4,
      z: 200,

      name: "Horario",
      open: openWorkShift,
      setOpen: setOpenWorkShift,
      value: valueWorkShift,
      setValue: setValueWorkShift,
      items: itemsWorkShift,
      setItems: setItemsWorkShift,
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const nextPage = () => {
    if (dataApi.hasNextPage) {
      setPage((prev) => prev + 1);
      if (!isLoading) {
        flatListRef.current.scrollToIndex({ index: 0 });
      }
    }
  };
  const previousPage = () => {
    if (dataApi.hasPrevPage) {
      setPage((prev) => prev - 1);
      flatListRef.current.scrollToIndex({ index: 0 });
    }
  };

  const categories = [
    {
      id: 0,
      name: "Ingeniería",
      value: "Ingenieria",
      icon: icons.ingenieria,
      color: "",
    },
    {
      id: 1,
      name: "Administrativo",
      value: "Administrativo",
      icon: icons.administrativo,
      color: "",
    },
    {
      id: 2,
      name: "Derecho y Leyes",
      value: "Derecho y Leyes",
      icon: icons.derecho,
      color: "",
    },
    {
      id: 3,
      name: "Minería",
      value: "Mineria",
      icon: icons.mineria,
      color: "",
    },
    {
      id: 4,
      name: "Construcción",
      value: "Construccion",
      icon: icons.construccion,
      color: "",
    },
    {
      id: 5,
      name: "Docencia",
      value: "Docencia",
      icon: icons.docencia,
      color: "",
    },
    { id: 6, name: "Salud", value: "Salud", icon: icons.salud, color: "" },
    {
      id: 7,
      name: "Computación y Software",
      value: "Computacion y Software",
      icon: icons.computacion,
      color: "",
    },
    {
      id: 8,
      name: "Psicología",
      value: "Psicologia",
      icon: icons.psicologia,
      color: "",
    },
    {
      id: 9,
      name: "Agricultura y Ganadería",
      value: "Agricultura y Ganadería",
      icon: icons.agricultura,
      color: "",
    },

    { id: 10, name: "Otros", value: "Otros", icon: icons.otros, color: "" },
  ];
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCityOpen, setIsCityOpen] = useState(false);

  //hidden container

  const scrollY = useRef(new Animated.Value(0)).current;
  const containerHeight = useRef(new Animated.Value(100)).current; // Initial height of the container
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // Adjust the threshold value as needed
        if (offsetY > 50) {
          Animated.timing(containerHeight, {
            toValue: 0,
            duration: 100, // Adjust the duration as desired
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(containerHeight, {
            toValue: 100,
            duration: 200, // Adjust the duration as desired
            useNativeDriver: false,
          }).start();
        }
      },
    }
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 50,
            columnGap: 1,
            zIndex: 999,
          }}
        >
          <Searchbar
            value={searchWord}
            onChangeText={handleSearchWord}
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            inputStyle={{
              color: COLORS.gray400,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
            placeholder="Buscar puestos de trabajo"
            placeholderTextColor={COLORS.gray}
          />
          <View
            style={{
              backgroundColor: COLORS.white,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              width: 120,
              height: 56,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsCityOpen(!isCityOpen)}
              style={{
                display: "flex",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                columnGap: 4,
                paddingLeft: 5,
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.regular,
                  fontSize: SIZES.small,
                  borderTopRightRadius: 20,
                  color: COLORS.gray500,
                }}
              >
                {userLocation ? userLocation : "Ciudad"}
              </Text>
              <Image
                style={{ width: 20, height: 20 }}
                source={icons.location}
              />
            </TouchableOpacity>
            {isCityOpen && (
              <View
                style={{
                  position: "absolute",
                  top: 56,
                  backgroundColor: COLORS.indigo50,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  padding: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsCityOpen(false);
                    dispatch(setUserLocation("Pasco"));
                    setPage(1);
                  }}
                  style={{ paddingVertical: 15 }}
                >
                  <Text
                    style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}
                  >
                    Pasco
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsCityOpen(false);
                    dispatch(setUserLocation("Oxapampa"));
                    setPage(1);
                  }}
                  style={{ paddingVertical: 15 }}
                >
                  <Text
                    style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}
                  >
                    Oxapampa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsCityOpen(false);
                    setPage(1);
                    dispatch(setUserLocation("Daniel A. Carrion"));
                  }}
                  style={{ paddingVertical: 15 }}
                >
                  <Text
                    style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}
                  >
                    Daniel A. Carrión
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsCityOpen(false);
                    dispatch(cleanUserLocation());
                    setPage(1);
                  }}
                  style={{ paddingVertical: 15 }}
                >
                  <Text
                    style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}
                  >
                    Todas las ciudades
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* {Platform.OS === "android" && (
          <TextInput
            value={searchWord}
            onChangeText={handleSearchWord}
            style={stylesHome.inputSearch}
            placeholder="Buscar puestos de trabajo"
            placeholderTextColor={COLORS.gray}
          />
        )}
        {Platform.OS === "ios" && (
          <TextInput
            value={searchWord}
            onChangeText={handleSearchWord}
            style={stylesHome.inputSearch}
            placeholder="Buscar puestos de trabajo"
            placeholderTextColor={COLORS.gray}
          />
        )} */}
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            {filterActions.map((e) => (
              <DropDownPicker
                key={e.id}
                placeholder={e.name}
                containerStyle={{ zIndex: e.z, width: 150 }}
                placeholderStyle={{ fontFamily: FONT.regular }}
                dropDownContainerStyle={{ width: 150, zIndex: 500 }}
                style={{ zIndex: e.z, marginHorizontal: "auto" }}
                badgeStyle={{ height: 10 }}
                listItemContainerStyle={{ zIndex: 400, height: 30 }}
                open={e.open}
                value={e.value}
                items={e.items}
                setOpen={e.setOpen}
                setValue={e.setValue}
                setItems={e.setItems}
                theme="LIGHT"
                multiple={false}
                mode="BADGE"
              />
            ))}
            <View style={{ flexDirection: "row", columnGap: 10 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: COLORS.red700,
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONT.medium,
                    fontSize: SIZES.small,
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleFilterQuery}
                style={{
                  backgroundColor: COLORS.indigo500,
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONT.medium,
                    fontSize: SIZES.small,
                  }}
                >
                  Aplicar filtros
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Animated.View
          style={{
            marginTop: SIZES.xLarge,
            marginBottom: 5,
            zIndex: 600,
            height: containerHeight,
          }}
        >
          <FlatList
            style={{ marginHorizontal: 20, height: 50 }}
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (activeCategory === item.value) {
                    setActiveCategory(null);
                    setPage(1);
                    dispatch(cleanUserFavCategory());
                  } else {
                    setActiveCategory(item.value);
                    setPage(1);
                    dispatch(setUserFavCategory(item.value));
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "black",
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginRight: 10,
                    backgroundColor:
                      userFavCategory === item.value
                        ? COLORS.indigo500
                        : COLORS.white,
                  }}
                >
                  <Image style={{ width: 20, height: 20 }} source={item.icon} />
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      fontSize: SIZES.small,
                      color:
                        userFavCategory === item.value
                          ? COLORS.white
                          : COLORS.black,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* <View style={stylesHome.header}>
              <Text style={stylesHome.headerTitle}>Nearby jobs sdasd</Text>
              <TouchableOpacity>
                <Text style={stylesHome.headerBtn}>Show all</Text>
              </TouchableOpacity>
            </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View>
              <Text
                style={{
                  paddingHorizontal: 0,
                  fontSize: SIZES.small,
                  fontFamily: FONT.medium,
                  color: COLORS.gray,
                  marginBottom: 0,
                }}
              >
                Trabajos recientes
              </Text>
            </View>
            <View style={{ flexDirection: "row", columnGap: 5 }}>
              {(valueContract ||
                valueExperience ||
                valueSalary ||
                valueWorkShift) && (
                <TouchableOpacity onPress={handleCleanFilterQuery}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.white,
                      borderRadius: 20,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONT.medium,
                        fontSize: SIZES.xSmall,
                        color: COLORS.indigo700,
                      }}
                    >
                      {" "}
                      Limpiar filtros
                    </Text>
                    <Icon
                      size={20}
                      name="close"
                      type="material"
                      color={COLORS.gray800}
                    />
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={openModal}>
                <Icon
                  name="filter-menu"
                  type="material-community"
                  color={COLORS.gray600}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {!isLoading && dataApi && user ? (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Animated.FlatList
              ref={flatListRef}
              data={dataApi.docs}
              contentContainerStyle={{ paddingBottom: 900 }}
              horizontal={false}
              showsVerticalScrollIndicator={true}
              onEndReachedThreshold={0.1}
              keyExtractor={(item) => String(item.id)}
              showsHorizontalScrollIndicator={true}
              onScroll={handleScroll}
              renderItem={({ item }) => (
                <JobCard userId={user.id} dataJob={item} />
              )}
              ListFooterComponent={
                dataApi.docs.length > 0 ? (
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
                      onPress={previousPage}
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
                      Pagina {dataApi.page} de {dataApi.totalPages}
                    </Text>
                    <Icon
                      onPress={nextPage}
                      size={40}
                      name="chevron-right"
                      type="material"
                      color={COLORS.gray800}
                    />
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

                // <ActivityIndicator
                //   size="large"
                //   style={styles.spinner}
                //   color="#AEAEAE"
                // />
              }
            />
          </View>
        ) : (
          <View>
            <ActivityIndicator
              style={{ marginTop: 100 }}
              size="large"
              color={COLORS.indigo600}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    rowGap: 20,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});

export default HomeUserScreen;
