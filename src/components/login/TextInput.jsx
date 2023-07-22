import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { COLORS } from '@constants/theme'
export default function TextInput({ errorText, description, ...props }) {
    return (
      <View style={styles.container}>
        <Input
          textColor={COLORS.gray800}
          style={styles.input}
          placeholderTextColor={COLORS.gray600}
          outlineColor={COLORS.indigo700}
          selectionColor={COLORS.indigo700}
          activeOutlineColor={COLORS.indigo800}
          
          underlineColor="transparent"
              returnKeyType=''
          mode="outlined"
          {...props}
        />
        {description && !errorText ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      </View>
    )
  }

  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: COLORS.lightWhite,
      borderColor:COLORS.indigo900
    },
    description: {
      fontSize: 13,
      color:COLORS.red500,
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: COLORS.red600,
      paddingTop: 8,
    },
  })