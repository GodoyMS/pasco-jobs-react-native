import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UpdateProfilePhoto = () => {


    const handleImagePicker = async () => {
        try {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission denied to access media library");
            return;
          }
    
          await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            aspect: [4, 4],
            allowsEditing: true,
          }).then((e) => setProfileImageBase64(e.assets[0].base64));
          // .then(
          //    () =>
          //      axios
          //       .post(`${backendURL}api/profilesupload/upload`, {
          //         base64: `data:image/png;base64,${profileImageBase64}`,
          //         name: `perfil`,
          //       })
          //       .then((a) => setProfileImageLink(a.data.url))
          // );
        } catch (error) {
          console.log("Error selecting image:", error);
          // Handle the error if needed
        }
      };
      const handleImageUpload = async () => {
        await axios
          .post(`${backendURL}api/profilesupload/upload`, {
            base64: `data:image/png;base64,${profileImageBase64}`,
            name: name.value,
          })
          .then(({ data }) => setProfileImageLink(data.url))
          .catch((e) => console.log(e));
      };

      
  return (
    <View>
      <Text>UpdateProfilePhoto</Text>
    </View>
  )
}

export default UpdateProfilePhoto

const styles = StyleSheet.create({})