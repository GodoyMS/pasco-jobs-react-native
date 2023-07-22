import React,{useState} from "react";
import { View, Text, Image, Modal } from "react-native";
import { StyleSheet,Dimensions  } from "react-native";
import styles from "./company.style";
import icons from "@constants/icons";
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
import { COLORS, FONT, SIZES,SHADOWS } from "@constants/theme";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Company = ({
  companyLogo,
  companyName,
  province,
  district,
  description,
  companyId
}) => {
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigation=useNavigation();
  const userInfo = useSelector((state) => state.company.infoCompany);

  const navigateToDetails = () => {
    navigation.navigate("CompanyProfileCompanyScreen", { itemId: userInfo?.id });
  };

  return (
 

    <TouchableOpacity onPress={navigateToDetails} style={{ marginTop: 100, marginHorizontal: 0,    ...SHADOWS.medium,
      shadowColor: COLORS.white, }}>
      <Text
        style={{
          fontFamily: FONT.medium,
          fontSize: SIZES.large,
          marginBottom: 30,
        }}
      >
        Sobre la empresa
      </Text>
      <View
        style={{
          marginBottom: 20,
          backgroundColor: COLORS.white,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              columnGap: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}>
              {province} / {district}
            </Text>
            <Icon name="location-pin" type="entypo" />
          </View>
        </View>

        <Modal visible={isFullScreen} statusBarTranslucent transparent={true}>
        <TouchableOpacity onPress={()=>setIsFullScreen(!isFullScreen)} style={styles2.modalContainer}>
          <View >
            <Image source={companyLogo
                ? {
                    uri: companyLogo,
                  }
                : companyDefaultProfile} style={{width:   Dimensions.get('window').width,
                  height: 400,
                  
                  resizeMode:"contain",
                  borderRadius: 10,}} />
          </View>
        </TouchableOpacity>
      </Modal>

      
        <View
          style={{ flexDirection: "row", columnGap: 20, paddingHorizontal: 10,marginBottom:20,marginTop:10 }}
        >
          <TouchableOpacity activeOpacity={0.8} l  onPress={() => setIsFullScreen(!isFullScreen)} >
          <Image
            source={
              companyLogo
                ? {
                    uri: companyLogo,
                  }
                : companyDefaultProfile
            }
            style={{
              width:   100,
              height: "auto",
              aspectRatio: "1/1",
              borderRadius: 100,
            }}
          />  
          </TouchableOpacity>
 

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
                {companyName}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  fontFamily: FONT.medium,
                  color: COLORS.gray700,
                  fontSize: SIZES.small,
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                {description}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 10,
              backgroundColor: COLORS.indigo100,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              width:"100%"
            }}
          >
            <Icon color={COLORS.tertiary} name="building" type="font-awesome-5" />
            <Text
              style={{
                fontFamily: FONT.bold,
                color: COLORS.tertiary,
                fontSize: SIZES.small,
              }}
            >
              Conocer empresa
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Company;
const styles2 = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    // Additional container styles
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});