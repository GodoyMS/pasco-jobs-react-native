import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { COLORS, SIZES, FONT } from "@constants/theme";
  import TextInput from "@components/login/TextInput";
  import { useState } from "react";
  import { useEffect } from "react";
  import axios from "axios";
  import { backendURL } from "@config/config";
  import FormLoader from "@components/loaders/FormLoader";
  import { Icon } from "@rneui/themed";
  import SaveButton from "@components/buttons/SaveButton";
import { setOnlyCompanyInfo } from "@features/user/companySlice";
  
  const EditCompanyProfileScreen = () => {
    const userInfo = useSelector((state) => state.company.infoCompany);
  
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      if (userInfo.name) setName(userInfo.name);
      if (userInfo.description) setDescription(userInfo.description);
    }, [userInfo]);
  
    const dispatchRedux = useDispatch();
  
    const handleUpdateProfile = async (e) => {
      setIsLoading(true)
      e.preventDefault();
      try {
        // Make the PATCH request
        const response = await axios.patch(
          `${backendURL}api/employers/${userInfo.id}`,
          { name,  description }// Use true instead of "include"
        );
  
        // Update the user information in the Redux store
        dispatchRedux(setOnlyCompanyInfo({ user: response.data.doc }));
  
        // Perform any navigation logic here
        // For example:
        // navigation.navigate('NextScreen');
  
        // Set the success state or perform any other actions
        setIsSuccess(true);
      } catch (error) {
        // Handle any errors and set the error state
        setIsError(true);
      } finally {
        // Set the loading state to false
        setIsLoading(false);
      }
    };
  
    return (
      <SafeAreaView
        style={{
          backgroundColor: COLORS.primary,
          flex: 1,
          paddingBottom: 90,
          justifyContent: "space-between",
        }}
      >
        <ScrollView style={{ marginTop: 90 }}>
          {userInfo && (
            <View style={{ marginHorizontal: 30 }}>
              <View>
                <Text
                  style={{
                    color: COLORS.gray800,
                    fontFamily: FONT.bold,
                    fontSize: SIZES.xLarge,
                    marginVertical: 30,
                  }}
                >
                  Editar Perfil
                </Text>
              </View>
              <TextInput
                label="Nombre de empresa"
                returnKeyType="next"
                value={name}
                onChangeText={(text) => setName(text)}
              /> 
              
  
              <TextInput
                label="Descripcion breve"
                multiline={true}
                numberOfLines={5}
                placeholderTextColor={COLORS.gray600}
                returnKeyType="next"
                placeholder="Realiza una descripcion de tu empresa"
                value={description}
                onChangeText={(text) => setDescription(text)}
                autoCapitalize="none"
                keyboardType="default"
              />
             
              <FormLoader isLoading={isLoading} />
  
               <SaveButton onPress={handleUpdateProfile} isSuccess={isSuccess} messageDefault={"Actualizar perfil"} messageSuccess={"Actualizado"}/>
  
              {isError && (
                <View>
                  <Text style={{ textAlign: "center" }}>
                    Ocurrio un error, si el error persiste contacte al soporte de
                    ayuda
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default EditCompanyProfileScreen;
  
  const styles = StyleSheet.create({});
  