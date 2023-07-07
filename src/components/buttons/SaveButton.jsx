import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'
import { COLORS,FONT,SIZES } from '@constants/theme'
const SaveButton = ({onPress,isSuccess,messageDefault,messageSuccess}) => {
  return (
    <TouchableOpacity
    onPress={isSuccess ?  void(null) : onPress}
    activeOpacity={isSuccess ? 1:0.7}
    style={{
      marginTop: 60,
      fontFamily: FONT.medium,
      backgroundColor: isSuccess ? COLORS.green400 :COLORS.tertiary,
      flexDirection: "row",
      justifyContent:"center",
      display:"flex",
      columnGap:20,
      paddingHorizontal:10,
      paddingVertical:20,
      borderRadius:10
    }}
  >
    <Text style={{color:COLORS.white,fontFamily:FONT.bold,fontSize:SIZES.medium}}> {isSuccess ? messageSuccess : messageDefault}</Text>
   {isSuccess && ( <Icon
      name="checkcircle"
      type="antdesign"
      color={COLORS.white}
      size={20}
    />)}
  </TouchableOpacity>
  )
}

export default SaveButton