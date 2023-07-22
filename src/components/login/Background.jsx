import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { COLORS } from '@constants/theme'
// require('../assets/background_dot.png')
export default function Background({ children,backgroundImage }) {
    return (

      <ImageBackground
        source={backgroundImage}
  
        style={styles.background}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>

    )
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: COLORS.lightWhite,
      
      
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })