import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AgeDateFormat from '@components/dates/AgeDateFormat'
import { Icon } from '@rneui/themed'
import { COLORS,FONT,SIZES } from '@constants/theme'


const JobCompanyProfileCard =React.memo( ({item,navigateToDetails}) => {
  return (

    <TouchableOpacity
    onPress={()=>navigateToDetails(item.id)}
    style={{
      backgroundColor: COLORS.white,
      paddingHorizontal: 10,
      marginVertical: 5,
      borderRadius: 5,
      elevation: 2,
    }}
  >
    <View style={{ flexDirection: "row", columnGap: 10, marginTop: 10 }}>
    
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{ flex: 1, fontFamily: FONT.medium, color: COLORS.indigo900,fontSize:SIZES.medium}}
        >
          {item?.title}
        </Text>


        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",columnGap:5,marginTop:5}}>
          <Icon size={15} color={COLORS.gray600} name="location" type="evilicon"/>
          <Text
          style={{
            flex: 1,
            fontFamily: FONT.regular,
            color: COLORS.gray600,
            fontSize: SIZES.xSmall,
          }}
        >
          {item?.province}-{item?.district}
        </Text>

        </View>

      
      </View>
    </View>
    
    <View
      style={{
        paddingBottom: 10,
        marginTop:10
      }}
    >
    
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
  </TouchableOpacity>
    
  )
}
)

export default JobCompanyProfileCard

