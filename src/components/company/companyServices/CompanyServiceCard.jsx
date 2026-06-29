import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '@constants/theme'

const CompanyServiceCard = ({info}) => {
  return (
    <View>
        <View style={{flexDirection:"row",columnGap:10}}>
            <Image style={{width:150,height:150,borderRadius:15}} source={info.image}/>
            <View style={{flex:1,flexDirection:"column",rowGap:10}}>
                <Text style={{fontFamily:FONT.regular,color:COLORS.tertiary}}>{info.title} </Text>
                <Text style={{fontFamily:FONT.regular,color:COLORS.gray700,fontSize:SIZES.small,textAlign:"justify"}}>{info.content} </Text>

            </View>

        </View>
      <Text>

      </Text>
    </View>
  )
}

export default CompanyServiceCard

const styles = StyleSheet.create({})