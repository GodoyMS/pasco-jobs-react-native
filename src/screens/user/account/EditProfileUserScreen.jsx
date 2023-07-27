import {
  Modal,
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
import { TextInput as TextInputRN } from "react-native";
import TextInput from "@components/login/TextInput";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@components/login/Button";
import axios from "axios";
import { backendURL } from "@config/config";
import { setOnlyUserInfo } from "@features/user/userSlice";
import FormLoader from "@components/loaders/FormLoader";
import { Icon } from "@rneui/themed";
import SaveButton from "@components/buttons/SaveButton";
import Lottie from 'lottie-react-native';
import { StatusBar } from "expo-status-bar";

const EditProfileUserScreen = () => {
  const userInfo = useSelector((state) => state.user.infoUser);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (userInfo.name) setName(userInfo.name);
    if (userInfo.position) setPosition(userInfo.position);
    if (userInfo.age) setAge(userInfo.age.toString());
    if (userInfo.description) setDescription(userInfo.description);
  }, [userInfo]);

  const dispatchRedux = useDispatch();

  const handleUpdateProfile = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      // Make the PATCH request
      const response = await axios.patch(
        `${backendURL}api/applicants/${userInfo.id}`,
        { name, position, description, age }// Use true instead of "include"
      );

      // Update the user information in the Redux store
      dispatchRedux(setOnlyUserInfo({ user: response.data.doc }));

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
      <StatusBar/>
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
              label="Nombre"
              returnKeyType="next"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              label="Puesto"
              returnKeyType="next"
              placeholder="Ej. Odontólogo"
              value={position}
              onChangeText={(text) => setPosition(text)}
              autoCapitalize="none"
              textContentType="jobTitle"
              keyboardType="default"
            />

            <TextInput
              label="Descripcion breve"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={COLORS.gray600}
              returnKeyType="next"
              placeholder="Realiza una descripción breve de ti, sientete libre de expresar tus talentos ..."
              value={description}
              onChangeText={(text) => setDescription(text)}
              autoCapitalize="none"
              keyboardType="default"
            />
            <TextInput
              label="Edad"
              keyboardType="numeric"
              returnKeyType="next"
              placeholder=""
              value={age}
              onChangeText={(text) => setAge(text)}
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

export default EditProfileUserScreen;

const styles = StyleSheet.create({});
