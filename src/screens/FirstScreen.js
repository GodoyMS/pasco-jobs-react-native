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

  console.log(user);
  console.log(company);


  const isUser = useSelector((state) => state.user.infoUser);
  const isCompany = useSelector((state) => state.company.infoCompany);

  ///TO CHECK
  useEffect(() => {
    if (isUser) navigation.navigate("User");
    if (isCompany) navigation.navigate("Company");
  }, []);

  return (
    <>
      <Background backgroundImage={firstSreenImage}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop:0,
            

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
                color:COLORS.white
              
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
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginCompanyScreen")}
                style={{ paddingVertical: 20, paddingHorizontal: 50 }}
              >
                <View style={styles.overlay} />
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
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
                </View>

                <Text
                  style={{
                    marginTop: 10,

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
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{ paddingVertical: 25, paddingHorizontal: 35 }}
              >
                <View style={styles.overlay} />
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
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
                    fontFamily: FONT.medium,
                    fontSize: SIZES.medium,
                    textAlign: "center",
                  }}
                >
                  Usuario
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
                  Busco un empleo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Background>
    </>
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
    backgroundColor: "rgba(63, 81, 181, 0.3)", // Adjust the opacity as desired
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0)",
  },
});
