import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ButtonFirstScreen from "@components/firstScreen/ButtonFirstScreen";
import companyBuilding from "@assets/images/firstScreenCompressed.png";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { SafeAreaView } from "react-native";
import { Image, Dimensions } from "react-native";
import { color } from "@rneui/themed/dist/config";
import { Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import Background from "@components/login/Background";
import firstSreenImage from "@assets/images/firstScreenBgMobile.png";
import { TouchableOpacity } from "react-native";

const FirstScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);

  const isUser = useSelector((state) => state.user.infoUser);
  const isCompany = useSelector((state) => state.company.infoCompany);
  const isUserAds = useSelector((state) => state.userads.infoUserAds);

  ///TO CHECK
  useEffect(() => {
    if (isUser) navigation.navigate("User");
    if (isCompany) navigation.navigate("Company");
    if (isUserAds) navigation.navigate("UserAds");

  }, []);

  return (
    <Background backgroundImage={firstSreenImage}>
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        marginTop: 0,
        height:"100%",
        justifyContent:"space-between",

        rowGap: 20,
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            marginTop: 0,
            textAlign: "center",

            fontFamily: FONT.bold,
            fontWeight: 900,
            fontSize: 50,
            marginHorizontal: 20,
            color: COLORS.white,
          }}
        >
          Pasco{" "}
          <Text style={{ color: COLORS.indigo100, fontWeight: 900 }}>
            Jobs
          </Text>
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,

            fontFamily: FONT.regular,

            fontSize: 14,
            marginHorizontal: 20,
            color: COLORS.gray300,
          }}
        >
          La plataforma de trabajo mas grande de Pasco{" "}
        </Text>
      </View>

      {/* <Image
      resizeMode="cover"
      style={{
        width: 300,
        height: 300,
        marginHorizontal: "auto",
        overflow: "visible",
      }}
      source={companyBuilding}
    /> */}

      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            marginBottom: 30,
            color: COLORS.white,
          }}
        >
          ¿Quien eres?
        </Text>

        <View
          style={{
            marginBottom: 40,

            flexDirection: "row",
            columnGap: 10,
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "column", gap: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginCompanyScreen")}
              style={{ paddingVertical: 30, paddingHorizontal: 20 }}
            >
              <View style={styles.overlay} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.indigo500,
                    padding: 15,
                    borderRadius: 50,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="building"
                    type="font-awesome"
                    color={COLORS.white}
                  />
                </View>
                <View style={{ flexDirection: "column", gap: 4 }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONT.bold,
                      fontSize: SIZES.medium,
                      textAlign: "center",
                    }}
                  >
                    Empresa
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      color: COLORS.gray500,
                      fontFamily: FONT.medium,
                      fontSize: SIZES.small,
                      textAlign: "center",
                    }}
                  >
                    Busco contratar
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginUserAdsScreen")}
              style={{ paddingVertical: 5, paddingHorizontal: 20 }}
            >
              {/* <View style={{position:"absolute",top:"100%",paddingHorizontal:10,left:0,backgroundColor:"#d97706",zIndex:500,borderRadius:10,paddingVertical:5}}>
                <Text style={{color:COLORS.white,fontFamily:FONT.regular,fontSize:SIZES.small}}>Nuevo</Text>

              </View> */}
              <View style={styles.overlay} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.indigo500,
                    padding: 10,
                    borderRadius: 50,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="campaign"
                    type="material"
                    size={20}
                    color={COLORS.white}
                  />
                </View>
                <View style={{ flexDirection: "column", gap: 4 }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONT.bold,
                      fontSize: SIZES.medium,
                      textAlign: "center",
                    }}
                  >
                    Anunciante
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      color: COLORS.gray500,
                      fontFamily: FONT.medium,
                      fontSize: SIZES.small,
                      textAlign: "center",
                    }}
                  >
                    Publicar un aviso
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

           
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 35,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View style={styles.overlay} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.indigo500,
                  padding: 15,
                  borderRadius: 50,
                  marginBottom: 10,
                }}
              >
                <Icon
                  name="users"
                  type="font-awesome"
                  color={COLORS.white}
                />
              </View>
            </View>

            <Text
              style={{
                marginTop: 10,
                color: COLORS.white,
                fontFamily: FONT.bold,
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Usuario
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: COLORS.gray400,
                fontFamily: FONT.bold,
                fontSize: SIZES.small,
                textAlign: "center",
              }}
            >
              Busco un empleo 
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: COLORS.gray500,
                fontFamily: FONT.bold,
                fontSize: SIZES.small,
                textAlign: "center",
              }}
            >
              o 
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: COLORS.gray500,
                fontFamily: FONT.bold,
                fontSize: SIZES.small,
                textAlign: "center",
              }}
            >
              avisos 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </Background>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(63, 81, 181, 0.5)", // Adjust the opacity as desired
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0)",
  },
});
