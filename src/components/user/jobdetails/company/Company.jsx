import React,{useState} from "react";
import { View, Text, Image, Modal } from "react-native";
import { StyleSheet,Dimensions  } from "react-native";
import styles from "./company.style";
import icons from "@constants/icons";
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
import { COLORS, FONT, SIZES,SHADOWS } from "@constants/theme";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
const Company = ({
  companyLogo,
  companyName,
  province,
  district,
  description,
}) => {
  console.log(companyLogo);

  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    // <View style={styles.container}>
    //   <View>

    //   </View>
    //   <View style={styles.logoBox}>
    //     <Image
    //       source={ companyLogo ?   {
    //         uri:companyLogo
    //       }:companyDefaultProfile}
    //       style={styles.logoImage}
    //     />
    //   </View>

    //   <View style={styles.jobTitleBox}>
    //     <Text style={styles.jobTitle}>{companyName}</Text>
    //   </View>

    //   <View style={styles.companyInfoBox}>
    //     <Text style={styles.companyName}>{companyName} / </Text>
    //     <View style={styles.locationBox}>
    //       <Image
    //         source={icons.location}
    //         resizeMode='contain'
    //         style={styles.locationImage}
    //       />
    //       <Text style={styles.locationName}>{province} - {district}</Text>
    //     </View>
    //   </View>
    // </View>

    <View style={{ marginTop: 100, marginHorizontal: 0,    ...SHADOWS.medium,
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
          style={{ flexDirection: "row", columnGap: 10, paddingHorizontal: 10 }}
        >
          <TouchableOpacity onPress={() => setIsFullScreen(!isFullScreen)} >
          <Image
            source={
              companyLogo
                ? {
                    uri: companyLogo,
                  }
                : companyDefaultProfile
            }
            style={{
              width:   120,
              height: "auto",
              aspectRatio: "1/1",
              borderRadius: 10,
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 10,
              backgroundColor: COLORS.tertiary,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Icon color={COLORS.white} name="message1" type="antdesign" />
            <Text
              style={{
                fontFamily: FONT.medium,
                color: COLORS.white,
                fontSize: SIZES.small,
              }}
            >
              Enviar mensaje
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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