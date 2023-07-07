import { Text, TouchableWithoutFeedback, View } from "react-native";
import React, { Component, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants/theme";
import axios from "axios";
import { backendURL } from "@config/config";
import stylesFavJobs from "./stylesFavJobs";
import { useDispatch } from "react-redux";
import { addFavoriteJob, deleteFavoriteJob } from "@features/user/userSlice";

export const FavJobCard = ({ dataFavJob, userId }) => {
  const dispatch = useDispatch();

  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const navigateToDetails = () => {
    navigation.navigate("JobDetails", { itemId: dataFavJob.job.id });
  };

  const navigation = useNavigation();

  const handleDeleteJob=async()=>{

    await axios.delete( `${backendURL}api/favoriteJobs/${dataFavJob.id}`, { withCredentials: "include" })
    .then(({data}) =>dispatch(deleteFavoriteJob(data.job.id)))
    .catch((e)=>console.log(e))


  }

  const handleAddFavoriteJob = async () => {
    await axios
      .post(
        `${backendURL}api/favoriteJobs`,
        { user: userId, job: dataFavJob.id },
        { withCredentials: "include" }
      )
      .then(({ data }) => dispatch(addFavoriteJob(data)))
      .then(
        () => setIsAddedToFav(true),
        () => console.log("rejected")
      )
      .catch((e) => console.log(e));
  };

  return (
    <TouchableWithoutFeedback
      style={styles.cardJob}
      onPress={navigateToDetails}
    >
      <View style={stylesFavJobs.cardJob}>
        <View style={stylesFavJobs.containerOneCardJob}>
          <Image
            source={{
              uri: `${dataFavJob.job.author.profile.url}`,
            }}
            style={stylesFavJobs.containerOneCardJobView1}
          />

          <View style={stylesFavJobs.containerOneCardJobView2}>
            <Text style={stylesFavJobs.containerOneCardJobView2Text1}>
              {" "}
              {dataFavJob.job.title}
            </Text>
            <Text style={stylesFavJobs.containerOneCardJobView2Text2}>
              {" "}
              {dataFavJob.job.provincia}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleDeleteJob}>
              <Icon
                name="trash"
                type="evilicon"
                color={isAddedToFav ? COLORS.red600 : COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesFavJobs.containerTwoCardJob}>
          <FlatList
            data={[
              { id: 0, name: dataFavJob.job.contract.name, icon: 21 },
              { id: 1, name: dataFavJob.job.workExperience.name, icon: 21 },
              { id: 2, name: dataFavJob.job.workShift.name, icon: 21 },
              { id: 3, name: "S/. " + dataFavJob.job.salary, icon: 123 },
            ]}
            horizontal
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              <Text style={stylesFavJobs.containerTwoCardJobText}>
                {item.name}
              </Text>
            )}
            contentContainerStyle={{ columnGap: SIZES.small / 2 }}
          />
        </View>

        <View style={stylesFavJobs.containerThreeCardJob}>
          <Text style={stylesFavJobs.containerThreeCardDate}>
            Hace un momoento
          </Text>
          <TouchableOpacity
            onPress={navigateToDetails}
            style={stylesFavJobs.containerThreeButtonApply}
          >
            <Text style={stylesFavJobs.containerThreeButtonApplyText}>
              Postular{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default FavJobCard;
const styles = StyleSheet.create({
  cardJob: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    height: 300,
  },
});
