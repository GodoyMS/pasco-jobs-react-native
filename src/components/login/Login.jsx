import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
const Login = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Login</Text>
        <Input />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
