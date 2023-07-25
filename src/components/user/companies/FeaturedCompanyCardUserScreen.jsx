import { ImageBackground, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "@constants/theme";

import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";

const FeaturedCompanyCardUserScreen = React.memo(({ companyData,screen }) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate(screen, {
      itemId: companyData?.id,
    });
  };

  console.log(companyData);

  return (
    <>
      <TouchableOpacity
        style={{
          width: 150,
          height:"100%",
          borderRadius:10,
          flex:1,
          paddingHorizontal: 0,
          marginHorizontal:5
        }}
        onPress={navigateToDetails}
      >
        <View
            style={{
             position:"absolute",
             bottom:5,
            paddingHorizontal:5,
             zIndex:100,
             width:"100%",
           
            }}
          >
            <View style={{  backgroundColor:"rgba(0,0,0,0.6)",paddingVertical:2,borderRadius:5}}>
            <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.medium,
                  color: COLORS.white,
                  flexDirection: "row",
                  textAlign:"center"
                }}
              >
                {companyData?.name}
              </Text>
              

            </View>
            
          </View>
        <Image
          resizeMode="cover"
          style={{ borderRadius:10,
            width:"100%",
            height:"100%"
          }}
          resizeMethod="resize"
          source={
            companyData?.profile
              ? {
                  uri: companyData?.profile,
                }
              : companyDefaultProfile
          }
        />
          
      </TouchableOpacity>
    </>
  );
});

export default FeaturedCompanyCardUserScreen;
