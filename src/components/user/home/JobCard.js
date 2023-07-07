import { Text, TouchableWithoutFeedback, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native";
import stylesHome from "./stylesHome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import axios from "axios";
import { backendURL } from "@config/config";
import { addFavoriteJob } from "@features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import icons from "@constants/icons";
import "moment/locale/es"; // Import the Spanish locale

export const JobCard = ({ dataJob, userId }) => {
  const favJobsRedux = useSelector((state) => state.user.favUserJobs);

  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (favJobsRedux.includes(dataJob.id)) {
      setIsAddedToFav(true);
    } else {
      setIsAddedToFav(false);
    }
  }, [favJobsRedux]);

  const navigateToDetails = () => {
    navigation.navigate("JobDetails", { itemId: dataJob.id });
  };

  const handleAddFavoriteJob = async () => {
    await axios
      .post(
        `${backendURL}api/favoriteJobs`,
        { user: userId, job: dataJob.id },
        { withCredentials: "include" }
      )
      .then(({ data }) => dispatch(addFavoriteJob(data.doc)))

      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View activeOpacity={0.7} style={styles.cardJob} onPress={navigateToDetails}>
      <View style={stylesHome.cardJob}>
        <View style={stylesHome.containerOneCardJob}>
          {showMessage && (
            <Text style={styles.message}>Añadido a favoritos</Text>
          )}

          <Image
            source={{
              uri: `${dataJob.author.profile.url}`,
              method:"GET"
            }}
              
            style={stylesHome.containerOneCardJobView1}
          />

          <View style={{flexDirection:"row",columnGap:10}}>
            <TouchableOpacity >
                <Icon
                  name="flag"
                  type="ionicons"
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            {isAddedToFav ? (
              <View>
                <Icon name="favorite" type="material" color={COLORS.red600} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleAddFavoriteJob}>
                <Icon
                  name="favorite"
                  type="material"
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Text style={{fontFamily:FONT.regular,color:COLORS.gray700,fontSize:SIZES.small}}>{dataJob.author.name}</Text>
        </View>
        <View>
          <View style={stylesHome.containerOneCardJobView2}>
            <Text style={stylesHome.containerOneCardJobView2Text1}>
              {dataJob.title}
            </Text>

          </View>
        </View>
        <View style={stylesHome.containerTwoCardJob}>
          <FlatList
            data={[
              { id: 0, name: dataJob.contract.name, icon: 21 },
              { id: 1, name: dataJob.workExperience.name, icon: 21 },
              { id: 2, name: dataJob.workShift.name, icon: 21 },
              { id: 3, name: "S/ " + dataJob.salary, icon: 123 },
            ]}
            horizontal
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Text style={stylesHome.containerTwoCardJobText}>
                {item.name}
              </Text>
            )}
            contentContainerStyle={{ columnGap: SIZES.small / 2 }}
          />
        </View>
        <View style={{flexDirection:"row",columnGap:10,marginTop:30}}>
          <Image source={icons.location} style={{width:15,height:15}}/>
          <Text style={stylesHome.containerOneCardJobView2Text2}>
              {dataJob.provincia}
           </Text>

        </View>

        <View style={stylesHome.containerThreeCardJob}>
          <Text style={stylesHome.containerThreeCardDate}>
            {Math.floor(new Date().getTime() / 1000) -
              Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
              3600 && moment(dataJob.createdAt).locale("es").startOf("minutes").fromNow()}
            {Math.floor(new Date().getTime() / 1000) -
              Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
              7200 &&
              3600 <=
                Math.floor(new Date().getTime() / 1000) -
                  Math.floor(new Date(dataJob.createdAt).getTime() / 1000) &&
              moment(dataJob.createdAt).startOf("hour").locale("es").fromNow()}
            {Math.floor(new Date().getTime() / 1000) -
              Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
              86400 &&
              7200 <=
                Math.floor(new Date().getTime() / 1000) -
                  Math.floor(new Date(dataJob.createdAt).getTime() / 1000) &&
              moment(dataJob.createdAt).startOf("hours").locale("es").fromNow()}
            {Math.floor(new Date().getTime() / 1000) -
              Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
              172800 &&
              86400 <=
                Math.floor(new Date().getTime() / 1000) -
                  Math.floor(new Date(dataJob.createdAt).getTime() / 1000) &&
              moment(dataJob.createdAt).startOf("day").locale("es").fromNow()}
            {Math.floor(new Date().getTime() / 1000) -
              Math.floor(new Date(dataJob.createdAt).getTime() / 1000) >=
              172800 && moment(dataJob.createdAt).locale("es").startOf("days").fromNow()}
          </Text>
          <TouchableOpacity
            onPress={navigateToDetails}
            style={stylesHome.containerThreeButtonApply}
          >
            <Text style={stylesHome.containerThreeButtonApplyText}>
              Postular
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default JobCard;
const styles = StyleSheet.create({
  cardJob: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    height: "auto",
    marginVertical: 5,
  },
  message: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
    backgroundColor: "#333333",
    color: "#FFFFFF",
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
