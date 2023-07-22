import React from "react";
import {
  View,
  Text,

  Image,
} from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";
import { Icon } from "@rneui/themed";
import AgeDateFormat from "@components/dates/AgeDateFormat";
const CommentCompanyCard = ({item}) => {
  return (
    <View
      style={{
        paddingHorizontal: 0,
        marginBottom: 20,
        
      }}
    >
      <View style={{ flexDirection: "row", columnGap: 10, marginTop: 10 }}>
        {item?.user?.profile && (
          <Image
            resizeMode="cover"
            style={{ width: 30, height: 30, borderRadius: 500 }}
            source={{
              uri: item?.user?.profile,
            }}
          />
        )}

        {!item?.user?.profile && (
          <Image
            resizeMode="cover"
            style={{ width: 30, height: 30, borderRadius: 10 }}
            source={userInfo?.sex === "Hombre" ? man : woman}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{ flex: 1, fontFamily: FONT.medium, color: COLORS.gray800 }}
          >
            {item?.user?.name}
          </Text>
          <Text
            style={{
              flex: 1,
              fontFamily: FONT.regular,
              color: COLORS.gray600,
              fontSize: SIZES.xSmall,
            }}
          >
            {item?.user?.position}
          </Text>
        </View>
      </View>
      <Text
        style={{ marginTop: 20, marginBottom: 10, fontFamily: FONT.regular ,fontSize:SIZES.small}}
      >
        {item.text}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 2 }}
        >
          {Array.from({ length: item?.stars ? item.stars : 0 }, (_, index) => (
            <Icon
              name="star"
              key={index}
              size={10}
              type="antdesign"
              color={COLORS.indigo700}
            />
          ))}
        </View>
        <Text
          style={{
            fontSize: 10,
            fontFamily: FONT.regular,
            color: COLORS.gray700,
           
          
          }}
        >
          <AgeDateFormat createdAt={item?.createdAt} />
        </Text>
      </View>
    </View>
    
  )
}

export default CommentCompanyCard

