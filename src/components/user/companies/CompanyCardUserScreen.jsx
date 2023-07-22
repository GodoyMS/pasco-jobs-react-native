import { Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "@constants/theme";

import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
const CompanyCardUserScreenjsx =React.memo( ({ companyData }) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate("CompanyProfileUserScreen", {
      itemId: companyData?.id,
    });
  };

  console.log(companyData);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingHorizontal: 0,
        backgroundColor: COLORS.primary,
        marginVertical: 10,
      }}
      onPress={navigateToDetails}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 5,
          marginVertical: 1,
          marginHorizontal: 20,
          backgroundColor: COLORS.white,
          elevation: 3,
        }}
      >
        <View
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 5,
            marginVertical: 1,
            marginHorizontal: 0,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Image
              source={
                companyData?.profile
                  ? {
                      uri: companyData?.profile,
                    }
                  : companyDefaultProfile
              }
              style={{
                width: 40,
                height: "auto",
                aspectRatio: "1/1",
                borderRadius: 25,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                rowGap: 0,
                width:"100%"
              
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.medium,
                  color: COLORS.gray900,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {companyData?.name}
              </Text>

              <View style={{ flexDirection: "row",flex:1,width:"100%",columnGap:10 }}>
                <Icon
                  name="location"
                  color={COLORS.gray600}
                  size={10}
                  type="entypo"
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: FONT.regular,
                    color: COLORS.gray700,
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  {companyData?.province} - {companyData?.district}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            marginVertical: 20,
          }}
        >
          <Text
            numberOfLines={3}
            style={{
              fontSize: SIZES.small,
              fontFamily: FONT.regular,
              color: COLORS.gray800,
              textAlign: "justify",
              flex: 1,
              flexDirection: "row",
            }}
          >
            {companyData?.description}
          </Text>
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
  );
}
)

export default CompanyCardUserScreenjsx;
