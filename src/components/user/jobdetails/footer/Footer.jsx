import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import styles from "./footer.style";
import icons from "@constants/icons";
import { TouchableWithoutFeedback } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { Icon } from "@rneui/themed";
import { gql, useQuery } from "@apollo/client";
import { ScrollView } from "react-native";

const Footer = ({
  handleAddFavorite,
  isSavingLoading,
  isAddedToFav,
  showMessage,
  idApplicant,
  expired,
  dataApplicants,
  setCurrentApplicants,
  idJob,
  jobAuthor,
}) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApplyButtonMounted, setIsApplyButtonMounted] = useState(true);
  const [isApplyingLoading, setIsApplyingLoading] = useState(false);
  const GET_APPLICANTS = gql`
    query GET__USER($jobId: String!, $applicantId: String!) {
      Applications(
        where: { applicant: { equals: $applicantId }, job: { equals: $jobId } }
      ) {
        totalDocs
      }
    }
  `;
  const applicationsTerms = [
    {
      id: 1,
      text: "Los candidatos aceptan que Pasco Jobs compartirá su información con el empleador correspondiente para fines de evaluación y selección.",
    },
    {
      id: 2,
      text: "Los candidatos reconocen que cualquier contrato o acuerdo de empleo se realiza directamente entre ellos y el empleador, y la plataforma de empleo no se involucra en las negociaciones contractuales.",
    },
    {
      id: 3,
      text: "Los candidatos aceptan que la plataforma de empleo puede recopilar y procesar sus datos personales de acuerdo con la política de privacidad de la plataforma.",
    },
  ];

  const { data } = useQuery(GET_APPLICANTS, {
    variables: { jobId: idJob, applicantId: idApplicant },
    onCompleted: (data) => {
      if (data.Applications.totalDocs === 0) {
        setIsApplied(false);
      } else {
        setIsApplied(true);
      }
      setIsApplyButtonMounted(true);
    },
    fetchPolicy: "cache-and-network",
  });
  const [isAboutToApply, setIsAboutToApply] = useState(false);

  const applyJob = async () => {
    setIsApplyingLoading(true);
    await axios
      .post(`${backendURL}api/applications`, {
        applicant: idApplicant,
        author: jobAuthor,
        job: idJob,
      })
      .then(() => setIsApplied(true))
      .then(() => setIsApplyingLoading(false))
      .then(() => setIsAboutToApply(false))
      .catch((e) => console.log(e))
      .then(() => setIsAboutToApply(false))
      .catch(() => setIsApplyingLoading(false));
  };

  return (
    <>
      {isAboutToApply && (
        <View
          style={{
            position: "absolute",

            padding: SIZES.small,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            flexDirection: "column",
            zIndex: 500,
            width: "100%",
            left: 0,
            right: 0,
            height: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: "#FFF",
            }}
          >
            <Text style={{ fontFamily: FONT.bold, color: COLORS.gray800 }}>
              Al postular a un trabajo aceptas lo siguiente:
            </Text>

            <View>
              {applicationsTerms.map((e) => (
                <View
                  key={e.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: 10,
                    columnGap: 10,
                    paddingRight: 5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.gray700,
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                    }}
                  ></View>
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      color: COLORS.gray800,
                      fontSize: SIZES.small,
                      textAlign: "justify",
                    }}
                  >
                    {e.text}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => setIsAboutToApply(false)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: COLORS.gray200,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.gray800,
                    fontFamily: FONT.bold,
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={applyJob}
                activeOpacity={0.7}
                style={{
                  backgroundColor: COLORS.tertiary,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                {isApplyingLoading ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: COLORS.white,
                      fontFamily: FONT.bold,
                    }}
                  >
                    ¡De acuerdo!
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={styles.container}>
        {isAddedToFav ? (
          <View
            style={{
              width: 55,
              height: 55,
              borderWidth: 1,
              borderColor: COLORS.red100,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.red50,
            }}
          >
            <Icon
              name="heart"
              type="antdesign"
              size={25}
              color={COLORS.red500}
            />
            {/* <Image
              source={icons.heart}
              resizeMode="contain"
              style={{ width: "50%", height: "50%", tintColor: COLORS.white }}
            /> */}
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleAddFavorite}
            style={{
              width: 55,
              height: 55,

              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.indigo100,
            }}
          >
            {isSavingLoading ? <ActivityIndicator color={COLORS.tertiary}/> : <Icon
              name="hearto"
              type="antdesign"
              color={COLORS.tertiary}
              size={25}
            /> }
           

            {/* <Image
              source={icons.heartOutline}
              resizeMode="contain"
              style={styles.likeBtnImage}
            /> */}
          </TouchableOpacity>
        )}

        {isApplyButtonMounted && expired==="no" && (
          <>
            {isApplied ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  flexDirection: "row",
                  backgroundColor: COLORS.green400,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 10,
                  marginLeft: SIZES.medium,
                  borderRadius: SIZES.medium,
                }}
              >
                <Text style={{ fontFamily: FONT.bold, color: COLORS.white }}>
                  Postulado
                </Text>
                <Icon
                  name="checkcircle"
                  type="antdesign"
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.applyBtn}
                onPress={() => setIsAboutToApply(true)}
              >
                <Text style={styles.applyBtnText}>Postular</Text>
              </TouchableOpacity>
            )}
          </>
        )}

               {expired ==="yes" && <View style={{ flex: 1,
                  paddingVertical: 10,
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 10,
                  marginLeft: SIZES.medium,
                  borderRadius: SIZES.medium,}}><Text style={{fontFamily:FONT.medium,color:COLORS.tertiary,fontSize:SIZES.medium}}>Vencido</Text></View>}
      </View>
    </>
  );
};

export default Footer;
