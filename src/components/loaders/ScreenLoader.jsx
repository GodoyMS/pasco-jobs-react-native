import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormLoader from './FormLoader'
const ScreenLoader = ({loading}) => {
  return (
    <View style={{ marginTop: 50 }}>
    <View >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <FormLoader isLoading={loading}/>
        </View>
      </View>
    </View>
  </View>
  )
}

export default ScreenLoader

const styles = StyleSheet.create({})