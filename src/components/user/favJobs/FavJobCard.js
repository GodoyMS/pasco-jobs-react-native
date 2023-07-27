import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { Component, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import axios from "axios";
import { backendURL } from "@config/config";
import stylesFavJobs from "./stylesFavJobs";
import { useDispatch } from "react-redux";
import { addFavoriteJob, deleteFavoriteJob } from "@features/user/userSlice";
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
import AgeDateFormat from "@components/dates/AgeDateFormat";

export const FavJobCard = ({ dataFavJob, userId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const navigateToDetails = () => {
    navigation.navigate("JobDetails", { itemId: dataFavJob.job.id });
  };

  const navigation = useNavigation();

  const handleDeleteJob = async () => {
    setIsLoading(true);
    await axios
      .delete(`${backendURL}api/favoriteJobs/${dataFavJob.id}`)
      .then(({ data }) => dispatch(deleteFavoriteJob(data.job.id)))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const handleAddFavoriteJob = async () => {
    await axios
      .post(`${backendURL}api/favoriteJobs`, {
        user: userId,
        job: dataFavJob.id,
      })
      .then(({ data }) => dispatch(addFavoriteJob(data)))
      .then(
        () => setIsAddedToFav(true),
        () => console.log("rejected")
      )
      .catch((e) => console.log(e));
  };

  return (
    <>
    {dataFavJob?.job && (
      <TouchableOpacity  onPress={navigateToDetails} activeOpacity={0.7} style={styles.cardJob}>
      <View style={{ paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    marginVertical: 1,
    elevation:4,
    marginHorizontal: 20,
    backgroundColor: dataFavJob?.job?.expired ==="yes" ?COLORS.gray200 :COLORS.white }}>
        <View style={stylesFavJobs.containerOneCardJob}>
          <View style={stylesFavJobs.containerOneCardJobView2}>
            <Text style={stylesFavJobs.containerOneCardJobView2Text1}>
              {" "}
              {dataFavJob.job?.title}
            </Text>
            <Text style={stylesFavJobs.containerOneCardJobView2Text2}>
              {" "}
              {dataFavJob.job?.province}-{dataFavJob.job?.district}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleDeleteJob}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name="trash"
                  type="evilicon"
                  color={isAddedToFav ? COLORS.red600 : COLORS.secondary}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesFavJobs.containerTwoCardJob}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 4,
              rowGap: 5,
            }}
          >
            {[
              {
                id: 0,
                name: dataFavJob.job?.contract?.name,
                value: dataFavJob.job?.contract?.name,
                icon: 21,
              },
              {
                id: 1,
                name: dataFavJob.job?.workExperience?.name,
                value: dataFavJob.job?.workExperience?.name,
                icon: 21,
              },
              {
                id: 2,
                name: dataFavJob.job?.workShift?.name,
                value: dataFavJob.job?.workShift?.name,
                icon: 21,
              },
              {
                id: 3,
                name: `S/. ${dataFavJob?.job?.salary}`,
                value: dataFavJob?.job?.salary,
                icon: 123,
              },
            ].map((item) => {
              if (!item.value) return;
              return (
                <Text
                  key={item.id}
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    textAlign: "center",
                    paddingHorizontal: 5,
                    paddingVertical: 4,
                    borderRadius: 10,
                    color: COLORS.black,
                    fontSize: SIZES.small,
                    alignItems: "center",
                    fontFamily: FONT.regular,
                  }}
                >
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>

        <View style={stylesFavJobs.containerThreeCardJob}>
          <Text style={stylesFavJobs.containerThreeCardDate}>
            <AgeDateFormat createdAt={dataFavJob?.job?.createdAt} />
          </Text>
          {dataFavJob?.job?.expired==="yes"?<Text style={{fontFamily:FONT.regular,color:COLORS.tertiary }}>Vencido</Text> : <TouchableOpacity
            
            style={stylesFavJobs.containerThreeButtonApply}
          >
            <Text style={stylesFavJobs.containerThreeButtonApplyText}>
              Postular{" "}
            </Text>
          </TouchableOpacity>}
        </View>
      </View>
    </TouchableOpacity>
    )}
    </>
  );
};
export default FavJobCard;
const styles = StyleSheet.create({
  cardJob: {
    width: "100%",
    paddingHorizontal: 0,
    backgroundColor: COLORS.primary,
    height: "auto",
    marginVertical: 5,
  },
});
