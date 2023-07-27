import { Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity, ImageBackground } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "@constants/theme";

import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";

const ProfessionalCardCompanyScreen = React.memo(({ companyData }) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate("ApplicantProfileCompanyScreen", {
      itemId: companyData?.id,
    });
  };

  console.log(companyData);

  return (
    <>
      <TouchableOpacity
        style={{
          width: "50%",
          paddingHorizontal: 0,
          backgroundColor: COLORS.primary,
          marginVertical: 10,
          zIndex:50
        }}
        onPress={navigateToDetails}
      >
        <View
          style={{
            paddingHorizontal:10,
            paddingVertical: 10,
            borderRadius: 5,
            marginVertical: 1,
            marginHorizontal: 8,
            backgroundColor: COLORS.white,
            elevation: 3,
            flexDirection: "column",
            columnGap: 10,
            rowGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              rowGap: 5,
            }}
          >
  
            <Image
              source={
                companyData?.profile
                  ? {
                      uri: companyData?.profile,
                    }
                  : companyData?.sex==="Hombre"
                  ? man
                  :woman
              }
              style={{
                width: 60,
                height: "auto",
                aspectRatio: "1/1",
                borderRadius: 40,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONT.medium,
                color: COLORS.tertiary,
                flexDirection: "row",
              }}
            >
              {companyData?.name}
            </Text>


          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",

              rowGap: 0,
              flex: 1,
            }}
          >
            

            <View style={{ flexDirection: "column", rowGap: 5, }}>
             
              <Text
              numberOfLines={2}
                style={{
                  fontSize: SIZES.small,
                  fontFamily: FONT.regular,
                  color: COLORS.gray900,
                  flexDirection: "row",
                }}
              >
                {companyData?.position}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  
                }}
              >
                <Icon
                  name="location"
                  color={COLORS.gray600}
                  size={10}
                  type="entypo"
                />
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: FONT.regular,
                    color: COLORS.gray600,
                    flexDirection: "row",
                  }}
                >
                  {companyData?.province} - {companyData?.district}
                </Text>
              </View>
            </View>
          </View>

          {/* 
        <View
          style={{
            flex: 1,
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View> */}
        </View>
      </TouchableOpacity>
    </>
  );
});

export default ProfessionalCardCompanyScreen;
