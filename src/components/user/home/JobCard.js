import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import stylesHome from "./stylesHome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@constants/theme";
import axios from "axios";
import { backendURL } from "@config/config";
import { addFavoriteJob } from "@features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import icons from "@constants/icons";
import "moment/locale/es"; // Import the Spanish locale
import companyDefaultProfile from "@assets/images/company/defaultprofilecompany-min.png";
import AgeDateFormat from "@components/dates/AgeDateFormat";

const JobCard = React.memo ( ({ dataJob, userId }) => {
  const favJobsRedux = useSelector((state) => state.user.favUserJobs);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const dispatch = useDispatch();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
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
    setIsSaveLoading(true);
    await axios
      .post(`${backendURL}api/favoriteJobs`, { user: userId, job: dataJob.id })
      .then(({ data }) => dispatch(addFavoriteJob(data.doc)))
      .then(() => setIsSaveLoading(false))

      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsSaveLoading(false));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.cardJob}
      onPress={navigateToDetails}
    >
      <View style={stylesHome.cardJob}>
        <View style={stylesHome.containerOneCardJob}>
          {showMessage && (
            <Text style={styles.message}>Añadido a favoritos</Text>
          )}

          <View style={{ flexDirection: "row", columnGap: 10 }}>
            {/* <TouchableOpacity>
              <Icon name="flag" type="ionicons" color={COLORS.secondary} />
            </TouchableOpacity> */}
            {isAddedToFav ? (
              <View>
                <Icon name="favorite" type="material" color={COLORS.red600} />
              </View>
            ) : (
              <TouchableOpacity
                disabled={isSaveLoading}
                onPress={handleAddFavoriteJob}
              >
                {isSaveLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Icon
                    name="favorite-border"
                    type="material"
                    color={COLORS.secondary}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* */}

        <View
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 5,
            marginVertical: 1,
            marginHorizontal: 0,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Image
              source={
                dataJob.author?.profile
                  ? {
                      uri: dataJob.author?.profile,
                    }
                  : companyDefaultProfile
              }
              style={{
                width: 40,
                height: "auto",
                aspectRatio: "1/1",
                borderRadius: 25,
              }}
            />
            <View style={{ flexDirection: "column", rowGap: 0 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.medium,
                  color: COLORS.gray900,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {dataJob.author?.name}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: FONT.regular,
                  color: COLORS.gray700,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <AgeDateFormat createdAt={dataJob.createdAt} />
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={stylesHome.containerOneCardJobView2}>
            <Text style={stylesHome.containerOneCardJobView2Text1}>
              {dataJob.title}
            </Text>
          </View>
        </View>
        <View style={stylesHome.containerTwoCardJob}>
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
                name: dataJob.contract.name,
                value: dataJob.contract.name,
                icon: 21,
              },
              {
                id: 1,
                name: dataJob.workExperience.name,
                value: dataJob.workExperience.name,
                icon: 21,
              },
              {
                id: 2,
                name: dataJob.workShift.name,
                value: dataJob.workShift.name,
                icon: 21,
              },
              {
                id: 3,
                name: `S/. ${dataJob.salary}`,
                value: dataJob.salary,
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

        <View
          style={{
            width: "100%",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image source={icons.location} style={{ width: 15, height: 15 }} />
            <Text
              style={{
                fontSize: SIZES.small,
                fontFamily: FONT.regular,
                color: COLORS.gray600,
              }}
            >
              {dataJob.province}- {dataJob.district}
            </Text>
          </View>

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
    </TouchableOpacity>
  );
}
);
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
    zIndex: 500,
    backgroundColor: "#333333",
    color: "#FFFFFF",
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
