import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import logo from "@assets/icon.png";
import dev from "@assets/dev.jpeg";
import whatsapp from "@assets/icons/whatsapp2.png";
import github from "@assets/icons/github.png";
import phone from "@assets/icons/phone.png";
import gmail from "@assets/icons/gmail.png";

import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Linking } from "react-native";

const ContactPascoJobsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 80 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: 20,
          }}
        >
          <Image
            source={logo}
            style={{ borderRadius: 100, width: 100, height: 100 }}
          />

          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xLarge }}>
                Pasco Jobs
              </Text>
              <Icon
                color={COLORS.green400}
                name="check-decagram"
                type="material-community"
              />
            </View>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`https://pascojobsperu.com`).catch((e) =>
                  console.log(e)
                )
              }
            >
              <Text
                style={{
                  fontFamily: FONT.regular,
                  color: COLORS.indigo600,
                  fontSize: SIZES.small,
                }}
              >
                <Text style={{ color: COLORS.gray600 }}>Conóce mas en </Text>{" "}
                https://www.pascojobsperu.com{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
                textAlign: "justify",
                padding: 8,
              }}
            >
              Pasco Jobs es la aplicación ideal para conectar de manera sencilla
              a empresas con talentos.{"\n"}Con una interfaz intuitiva,
              brindamos un proceso de postulación sin complicaciones para los
              candidatos y un reclutamiento fácil para las empresas
              contratantes. Oficialmente le decimos adiós a los anuncios de
              empleo en papel, brindando una alternativa digital, innovadora y
              benéfica para toda la región.
              {"\n \n"}
              Asimismo, se ha desarollado un sistema donde las personas
              podran publicar sus anuncios de manera muy sencilla.
              {"\n \n"}
              <Text style={{ fontFamily: FONT.bold,fontSize:SIZES.medium,color:COLORS.tertiary }}>
                {" "}
                ¡Gracias por ser parte de la era del empleo digital y
                sostenible!
              </Text>
            </Text>
          </View>

          <View style={{ width: "100%" }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.gray900,
                  fontSize: SIZES.small,
                  textAlign: "left",
                }}
              >
                Canales de soporte de ayuda al usuario
              </Text>
              <Text
                style={{
                  fontFamily: FONT.regular,
                  color: COLORS.gray700,
                  fontSize: SIZES.small,
                  textAlign: "justify",
                }}
              >
                ¿Tuviste una mala experiencia? Cuentanos que sucedió en la
                sección de reporte o contactanos directamente.
              </Text>

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 10,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  rowGap: 5,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `https://api.whatsapp.com/send?phone=961442547`
                    ).catch((e) => console.log(e))
                  }
                >
                  <Image source={whatsapp} style={{ width: 15, height: 15 }} />
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: COLORS.green800,
                    }}
                  >
                    961442547
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `mailto:desarrollador.pascojobs@gmail.com`
                    ).catch((e) => console.log(e))
                  }
                >
                  <Image source={gmail} style={{ width: 15, height: 15 }} />
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: COLORS.gray900,
                    }}
                  >
                    desarrollador.pascojobs@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.gray900,
                  fontSize: SIZES.small,
                  textAlign: "left",
                }}
              >
                Canales de contacto para empresas y anunciantes
              </Text>

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 10,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  rowGap: 5,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `https://api.whatsapp.com/send?phone=961442547`
                    ).catch((e) => console.log(e))
                  }
                >
                  <Image source={whatsapp} style={{ width: 15, height: 15 }} />
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: COLORS.green800,
                    }}
                  >
                    961442547
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                  onPress={() =>
                    Linking.openURL(`mailto:pascojobsperu@gmail.com`).catch(
                      (e) => console.log(e)
                    )
                  }
                >
                  <Image source={gmail} style={{ width: 15, height: 15 }} />
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: COLORS.gray900,
                    }}
                  >
                    pascojobsperu@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View>
            <Text>Alcance de la aplicación</Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon />
                <Text></Text>
              </View>
            </View>
          </View> */}
          <View
            style={{
              width: "100%",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 4,
                padding: 10,
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 20,

                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.regular,
                  fontSize: SIZES.small,
                  color: COLORS.gray700,
                  marginBottom: 10,
                  paddingLeft: 7,
                }}
              >
                Desarrollador
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-start",
                  columnGap: 20,
                }}
              >
                <Image
                  source={dev}
                  style={{ borderRadius: 40, width: 40, height: 40 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      fontSize: SIZES.medium,
                      color: COLORS.gray800,
                    }}
                  >
                    Godoy Muñoz Solorzano
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: SIZES.small,
                      color: COLORS.gray700,
                    }}
                  >
                    Desarrollador de software
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "center",
                  columnGap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://api.whatsapp.com/send?phone=913464041`
                    ).catch((e) => console.log(e))
                  }
                >
                  <Image source={whatsapp} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `mailto:desarrollador.pascojobs@gmail.com`
                    ).catch((e) => console.log(e))
                  }
                >
                  <Image source={gmail} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`tel:913464041`).catch((e) =>
                      console.log(e)
                    )
                  }
                >
                  <Image source={phone} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`https://github.com/GodoyMS`).catch((e) =>
                      console.log(e)
                    )
                  }
                >
                  <Image source={github} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactPascoJobsScreen;

const styles = StyleSheet.create({});
