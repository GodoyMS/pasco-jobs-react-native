import LogoutSection from "@components/user/profile/LogoutSection";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
  ScrollView,
  
} from "react-native";
import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";
import { useSelector } from "react-redux";
import userImage from "@assets/images/user.png";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { setOnlyUserInfo, setUser } from "@features/user/userSlice";
import { backendURL } from "@config/config";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Portal,
  Button as ButtonModal,
  Modal,
  PaperProvider,
  Provider,
} from "react-native-paper";
import FormLoader from "@components/loaders/FormLoader";

export const ProfileUserScreen = ({ navigation }) => {
  const generalRoutes = [
    {
      id: 0,
      name: "Cuenta",
      iconName: "user",
      iconType: "feather",
      onClick: "",
      route:"AccountManagerUser"
    },
    {
      id: 1,
      name: "Informacion",
      iconName: "info",
      iconType: "feather",
      onClick: "",
      route:"InformationUserScreeen"

    },
    {
      id: 2,
      name: "Reportar un problema",
      iconName: "flag",
      iconType: "feather",
      onClick: "",
      route:"ReportAProblem"

    },
    {
      id: 3,
      name: "Pasco Jobs",
      iconName: "building-o",
      iconType: "font-awesome",
      onClick: "",
      route:"ContactPascoJobsScreen"
    },
    // {
    //   id: 4,
    //   name: "Contactar desarrollador",
    //   iconName: "code",
    //   iconType: "entypo",
    //   onClick: "",
    //   route:"ContactDeveloperScreen"

    // },
  ];

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.infoUser);
  const tokenExpTime = useSelector((state) => state.user.exp);

  const navigateToDetails = (name) => {
    navigation.push(name);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [profileBase64, setProfileBase64] = useState("");
  const [visibleModalProfile, setVisibleModalProfile] = useState(false);
  const handleImagePicker = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied to access media library");
        return;
      }

      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        aspect: [4, 4],
        allowsEditing: true,
      })
        .then((e) => setProfileBase64(e.assets[0].base64))
        .then(() => setVisibleModalProfile(true));
      // .then(
      //    () =>
      //      axios
      //       .post(`${backendURL}api/profilesupload/upload`, {
      //         base64: `data:image/png;base64,${profileImageBase64}`,
      //         name: `perfil`,
      //       })
      //       .then((a) => setProfileImageLink(a.data.url))
      // );
    } catch (error) {
      console.log("Error selecting image:", error);
      // Handle the error if needed
    }
  };
  const handleImageUpload = async () => {
    setIsLoading(true);
    await axios
      .post(`${backendURL}api/profilesupload/upload`, {
        base64: `data:image/png;base64,${profileBase64}`,
        name: userInfo.name,
      })
      .then(({ data }) =>
        axios.patch(
          `${backendURL}api/applicants/${userInfo.id}`,
          { profile: data.url }
        )
      )
      .then(({ data }) => dispatch(setOnlyUserInfo({ user: data.doc })))
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
        setVisibleModalProfile(false);
      });
  };

  console.log(userInfo);
  return (
    <Provider>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.primary,
          flex: 1,
          paddingBottom: 0,
          justifyContent: "space-between",
        }}
      >
        <ScrollView >
          {userInfo && (
            <Portal>
              <Modal
                visible={visibleModalProfile}
                onDismiss={() => {
                  setVisibleModalProfile(false);
                }}
                contentContainerStyle={{
                  backgroundColor: COLORS.indigo100,
                  padding: 20,
                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 10,
                    aspectRatio: "1/1",
                  }}
                  source={{ uri: `data:image/jpeg;base64,${profileBase64}` }}
                />
                <View style={{ marginTop: 20 }}>
                  <ButtonModal
                    
                    onPress={handleImageUpload}
                  >
                    <Text style={{color:COLORS.indigo800}}>
                      Guardar foto de perfil
                    </Text>
                  </ButtonModal>
                </View>
              </Modal>
            </Portal>
          )}
          <FormLoader isLoading={isLoading} message={"Actualizando"}/>

          <StatusBar />
          {userInfo && (
            <>
              <View
                style={{
                  
                  
                  position: "relative",
                  height:"auto",
                  width:"100%",
                  aspectRatio:"1/1"
                }}
              >
                <TouchableOpacity
                  onPress={handleImagePicker}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 30,
                    zIndex: 100,
                    backgroundColor: COLORS.white,
                    borderRadius: 50,
                    padding: 8,
                  }}
                >
                  <Icon
                    name="user-edit"
                    type="font-awesome-5"
                    color={COLORS.gray800}
                    size={18}
                  />
                </TouchableOpacity>

                {userInfo.profile && (
                  <Image
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                    source={{
                      uri: userInfo.profile,
                    }}
                  />
                )}

                {!userInfo.profile && (
                  <Image
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={ userInfo?.sex === "Hombre"
                ? man
                : woman}
                  />
                )}
              </View>

              <View>
                <Text
                  style={{
                    color: COLORS.gray800,
                    fontFamily: FONT.bold,
                    fontSize: SIZES.xLarge,
                    marginHorizontal: 25,
                    marginTop: 30,
                  }}
                >
                  Perfil
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigateToDetails("EditUserProfileScreen")}
                activeOpacity={0.6}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  columnGap: 30,
                  alignItems: "center",
                  backgroundColor: COLORS.indigo100,

                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: COLORS.gray800,
                        fontFamily: FONT.medium,
                        fontSize: 18,
                      }}
                    >
                      {userInfo.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray600,
                        fontFamily: FONT.regular,
                        fontSize: SIZES.small,
                      }}
                    >
                      {userInfo.position}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.tertiary,
                        fontFamily: FONT.regular,
                        fontSize: SIZES.small,
                        marginTop: 10,
                      }}
                    >
                      Editar perfil
                    </Text>
                  </View>
                  <View>
                    <Icon
                      name="chevron-with-circle-right"
                      type="entypo"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/**CV */}

              <TouchableOpacity
                onPress={() => navigateToDetails("EditCvUserScreen")}
                activeOpacity={0.6}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  columnGap: 20,
                  alignItems: "center",
                  backgroundColor: COLORS.indigo100,

                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Icon name="pdffile1" type="antdesign" size={30} />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: COLORS.gray800,
                        fontFamily: FONT.bold,
                        fontSize: SIZES.medium,
                      }}
                    >
                      Curriculum Vitae
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray600,
                        fontFamily: FONT.regular,
                        fontSize: SIZES.small,
                      }}
                    >
                      {`${userInfo.name}-cv.pdf`}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.tertiary,
                        fontFamily: FONT.regular,
                        fontSize: SIZES.small,
                        marginTop: 10,
                      }}
                    >
                      Actualizar CV
                    </Text>
                  </View>
                  <View>
                    <Icon
                      name="chevron-with-circle-right"
                      type="entypo"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToDetails("FavoritesUserScreen")}
                activeOpacity={0.6}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  columnGap: 20,
                  alignItems: "center",
                  backgroundColor: COLORS.indigo100,

                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Icon name="hearto" type="antdesign" size={20} />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: COLORS.gray800,
                        fontFamily: FONT.bold,
                        fontSize: SIZES.medium,
                      }}
                    >
                      Trabajos guardados
                    </Text>
                   
                  </View>
                  <View>
                    <Icon
                      name="chevron-with-circle-right"
                      type="entypo"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/**ACCOUNT */}
              <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                <View
                  style={{ backgroundColor: COLORS.gray400, height: 1 }}
                ></View>
              </View>

              <View>
                <Text
                  style={{
                    color: COLORS.gray800,
                    fontFamily: FONT.bold,
                    fontSize: SIZES.xLarge,
                    marginHorizontal: 25,
                    marginTop: 30,
                  }}
                >
                  General
                </Text>
              </View>

              {generalRoutes.map((e) => (
                <TouchableOpacity
                  onPress={()=>navigateToDetails(e.route)}
                  key={e.id}
                  activeOpacity={0.6}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    columnGap: 15,
                    alignItems: "center",

                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <Icon name={e.iconName} type={e.iconType} size={25} />

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: COLORS.gray800,
                          fontFamily: FONT.bold,
                          fontSize: SIZES.medium,
                        }}
                      >
                        {e.name}
                      </Text>

                      {/* <Text
                    style={{
                      color: COLORS.secondary,
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      marginTop: 10,
                    }}
                  >
                    Editar
                  </Text> */}
                    </View>
                    <View>
                      <Icon
                        name={"chevron-with-circle-right"}
                        type="entypo"
                        size={20}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          <LogoutSection />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  opacityLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust the opacity as desired
  },
});

export default ProfileUserScreen;
