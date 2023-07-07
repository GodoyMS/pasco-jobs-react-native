import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const PublishedJobsCompanyScreen = () => {

  const company = useSelector((state)=>state.company.infoUser)
  return (
    <View>
      {company && (
      <Text>HELLO THERE</Text>

      )}
    </View>
  )
}

export default PublishedJobsCompanyScreen

const styles = StyleSheet.create({})