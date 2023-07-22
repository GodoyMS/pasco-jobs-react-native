import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { FONT, COLORS, SIZES } from "@constants/theme";
import Moment from "react-moment";
import "moment/locale/es";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { backendURL } from "@config/config";
import defaultAdUser from "@assets/userads/userdefault.png";
import axios from "axios";
import RenderHTML from "react-native-render-html";
 
const AdCardUserScreen = React.memo(({ data, refetch, dataAds, setDataAds }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteJob = async () => {
    setIsLoading(true);
    await axios
      .delete(`${backendURL}api/ads/${data.id}`)
      .then(() => setDataAds(dataAds.filter((obj) => obj.id !== data.id)))

      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };
  const { width } = useWindowDimensions();

  const maxChars = 150;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeeMore = () => {
    setIsExpanded(true);
  };
  const handleSeeLess = () => {
    setIsExpanded(false);
  };

  const [aspectRatio, setAspectRatio] = useState(1);

  const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  const contentToShow = isExpanded
    ? dataAds?.description
    : dataAds?.description.slice(0, maxChars);

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.gray800 }}>
            ¿Estas seguro de eliminar este anuncio?
          </Text>
          <View style={{ flexDirection: "row", columnGap: 10, marginTop: 10 }}>
            <Button
              mode="contained"
              style={{
                backgroundColor: COLORS.red700,
                borderRadius: 6,
                flex: 1,
              }}
              onPress={deleteJob}
            >
              {isLoading ? (
                <Text> ...</Text>
              ) : (
                <Text style={{ color: COLORS.white }}>Eliminar</Text>
              )}
            </Button>
            <Button
              mode="oulined"
              style={{
                backgroundColor: COLORS.gray600,
                borderRadius: 6,
                flex: 1,
              }}
              onPress={hideModal}
            >
              <Text style={{ color: COLORS.white }}>Cancelar</Text>
            </Button>
          </View>
        </Modal>
      </Portal>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
          height: "auto",
          paddingTop: 40,
          paddingBottom: 20,
          marginVertical: 4,
        }}
      >
        <View
          style={{ flexDirection: "row", columnGap: 10, paddingHorizontal: 20 }}
        >
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={
                dataAds?.author?.profile
                  ? { uri: dataAds?.author?.profile }
                  : defaultAdUser
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: 12,
                color: COLORS.gray900,
              }}
            >
              {dataAds?.author?.name}
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: 9,
                color: COLORS.gray600,
              }}
            >
              <Moment element={Text} fromNow locale="es">
                {dataAds?.createdAt}
              </Moment>
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              <Icon
                name="map-pin"
                color={COLORS.gray700}
                size={9}
                type="feather"
              />
              <Text
                style={{
                  fontFamily: FONT.regular,
                  fontSize: 9,
                  color: COLORS.gray600,
                }}
              >
                {dataAds?.province} - {dataAds?.district}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.container}>
            <Text style={{color:COLORS.gray900,fontFamily:FONT.medium,fontSize:SIZES.medium,marginBottom:7}} >{dataAds?.title}</Text>
            <RenderHTML
              tagsStyles={{ div: { textAlign: "justify",fontSize:SIZES.small,fontFamily:FONT.regular},p:{ textAlign: "justify",fontSize:SIZES.small,fontFamily:FONT.regular,color:COLORS.gray700} }}
              contentWidth={width}
              
            
              source={{ html: contentToShow }}
            />
            {!isExpanded && dataAds?.description.length > maxChars && (
              <TouchableOpacity onPress={handleSeeMore}>
                <Text style={styles.seeMore}>Ver mas </Text>
              </TouchableOpacity>
            )}
            {isExpanded && (
              <TouchableOpacity onPress={handleSeeLess}>
                <Text style={styles.seeMore}>Ver menos</Text>
              </TouchableOpacity>
            )}

            {dataAds && dataAds?.image && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 0,
                }}
              >
                <View>
                <Image
                  borderRadius={10}
                  resizeMode="cover"
                  source={{
                    uri: dataAds?.image,
                  }}
                  style={{
                    width: "100%",
                    aspectRatio,
                    maxHeight: 300,
                  }}
                  onLoad={handleImageLoad}
                />
                </View>
                
              </View>
            )}
          </View>
        </View>

        {dataAds && (dataAds?.author?.whatsapp || dataAds?.author?.phone) && (
          <>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 10,
                marginHorizontal: 10,
                borderBottomColor: COLORS.gray300,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                columnGap: 20,
              }}
            >
              {dataAds?.author?.phone && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`tel:${dataAds?.author?.phone}`).catch(
                      (e) => console.log(e)
                    )
                  }
                  activeOpacity={0.7}
                  style={{ flexDirection: "column" }}
                >
                  <Icon
                    name="phone"
                    color={COLORS.gray600}
                    size={20}
                    type="antdesign"
                  />
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      color: COLORS.gray600,
                      fontSize: SIZES.xSmall,
                    }}
                  >
                    Llamar
                  </Text>
                </TouchableOpacity>
              )}

              {dataAds?.author?.whatsapp && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://api.whatsapp.com/send?phone=${dataAds?.author?.whatsapp}`
                    ).catch((e) => console.log(e))
                  }
                  activeOpacity={0.7}
                  style={{ flexDirection: "column" }}
                >
                  <Icon
                    name="whatsapp"
                    color={COLORS.gray600}
                    size={20}
                    type="font-awesome"
                  />
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      color: COLORS.gray600,
                      fontSize: SIZES.xSmall,
                    }}
                  >
                    Mensaje
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </PaperProvider>
  );
});

export default AdCardUserScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  seeMore: {
    color: COLORS.gray600,
    marginTop: 5,
    fontFamily: FONT.regular,
  },
});
