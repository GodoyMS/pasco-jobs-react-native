import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '@constants/theme'

const SubtitlePublishAJob = ({message}) => {
  return (
    <Text
    style={{
      fontFamily: FONT.medium,
      color: COLORS.gray800,
      fontSize: SIZES.medium,
      marginBottom:10
    }}
  >{message}
  </Text>
  )
}

export default SubtitlePublishAJob