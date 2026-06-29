import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import PostCardAccount from "@components/cards/PostCardAccount";
import post1 from "@assets/images/information/apply.png";
import post2 from "@assets/images/information/report_ps.png";
import post4 from "@assets/images/information/privacy.png";

import post3 from "@assets/images/company/defaultprofilecompany-min.png";
import post5 from "@assets/images/information/goal.png";
import mobile from "@assets/company/mobileapp.png";
import webapp from "@assets/company/webapp.png";
import crm from "@assets/company/crm.png";
import landingpage from "@assets/company/landingpage.png";
import whatsapp from "@assets/icons/whatsapp2.png";
import github from "@assets/icons/github.png";
import phone from "@assets/icons/phone.png";
import gmail from "@assets/icons/gmail.png";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { StatusBar } from "expo-status-bar";
import CompanyServiceCard from "@components/company/companyServices/CompanyServiceCard";
const ServiceForCompaniesCompanyScreen = () => {
  const services = [
    {
      id: 1,
      title: "Aplicaciones Móviles",
      content:
        "Creamos aplicaciones móviles innovadoras para tu empresa. Desde una app de entrega de comida hasta un sistema de gestión de tareas para equipos,",
      image: mobile,
    },
    {
      id: 2,
      title: "Aplicaciones Web",
      content:
        "Impulsa tu empresa con aplicaciones web personalizadas. Desde una plataforma de gestión de proyectos hasta un sistema de reservas en línea para tu restaurante, nuestras soluciones web escalables mejoran la eficiencia y facilitan la interacción con tus clientes",
      image: webapp,
    },
    {
      id: 3,
      title: "Aplicaciones CRM",
      content:
        "Optimiza tus relaciones con clientes gracias a nuestras aplicaciones CRM a medida. Centraliza información, automatiza seguimientos y mejora la satisfacción del cliente. Ya sea una herramienta para una agencia inmobiliaria o un CRM para una clínica, ayudamos a fortalecer tu enfoque en el cliente.",
      image: crm,
    },
    {
      id: 4,
      title: "Landing Page",
      content:
        "Digitaliza tu empresa con una landing page. Ya sea una página para promocionar un evento, un lanzamiento de producto o una campaña de registro. Creamos páginas optimizadas para alcanzar tus objetivos de conversión. ",
      image: landingpage,
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10, flex: 1 }}
      >
        <Text
          style={{
            color: COLORS.indigo800,
            fontFamily: FONT.bold,
            fontSize: SIZES.medium,
            marginTop: 100,
            marginBottom: 20,
            marginHorizontal: 10,
          }}
        >
          Soluciones de software para empresas
        </Text>
        {services.map((e) => (
          <CompanyServiceCard info={e} key={e.id} />
        ))}

        <View style={{ flexDirection: "column", marginTop: 20, rowGap: 10 }}>
          <Text style={{ color: COLORS.gray700, fontFamily: FONT.regular }}>
            Si tienes una idea de negocio emocionante, en Pasco Jobs podemos
            hacerla realidad. Contácta a Pasco Jobs y juntos desarrollaremos un
            software a tu medida.
          </Text>
        </View>
        <View style={{ flexDirection: "column", marginTop: 20, rowGap: 10,width:"100%"}}>
          <TouchableOpacity style={{flexDirection:"column",rowGap:10}}>

          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", marginVertical: 20 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLORS.gray900,
                  fontSize: SIZES.small,
                  textAlign: "left",
                }}
              >
                Canales de contacto 
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceForCompaniesCompanyScreen;

const styles = StyleSheet.create({});
