import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useState } from "react";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { backendURL } from "@config/config";

const SubmitCommentCompanyProfile = ({
  active,
  setActive,
  idCompany,
  idUser,
}) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    if (newComment === "") {
      setTextError(true);
      return;
    }

    setNewComment("");
    setRating(0);
    setIsLoading(true);
    setIsError(true);
    await axios
      .post(`${backendURL}api/companyComments`, {
        company: idCompany,
        user: idUser,
        stars: rating,
        text: newComment,
      })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <Portal>
      <Modal visible={active} onDismiss={() => setActive(false)}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
            Valorar empresa
          </Text>

          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => {
                  setRating(star);
                  setRatingError(false);
                }}
                style={{ paddingHorizontal: 4 }}
              >
                <Icon
                  name={star <= rating ? "star" : "staro"}
                  size={20}
                  type="antdesign"
                  color={star <= rating ? COLORS.tertiary : COLORS.gray500}
                />
              </TouchableOpacity>
            ))}
          </View>
          {ratingError && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: FONT.regular,
                  color: COLORS.red600,
                  fontSize: SIZES.small,
                }}
              >
                Elige una valorización
              </Text>
            </View>
          )}

          <View style={{ marginTop: 20 }}>
            <TextInput
              label={"Commentario"}
              style={{ backgroundColor: COLORS.white }}
              mode="outlined"
              value={newComment}
              onChangeText={(text) => {
                setNewComment(text);
                setTextError(false);
              }}
              placeholderTextColor={COLORS.indigo700}
              outlineColor={COLORS.indigo700}
              selectionColor={COLORS.indigo700}
              activeOutlineColor={COLORS.indigo800}
              textColor={COLORS.gray800}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          {textError && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: FONT.regular,
                  color: COLORS.red600,
                  fontSize: SIZES.small,
                }}
              >
                Este campo no puede estar vacío
              </Text>
            </View>
          )}

          {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

          <Button
            onPress={isSuccess || isLoading ? () => void null : submitComment}
            mode="contained"
            elevation={10}
            textColor="white"
            icon={isSuccess ? "check" : ""}
            style={{
              backgroundColor: isSuccess ? COLORS.green400 : COLORS.tertiary,
              borderRadius: 10,
              paddingVertical: 0,
              paddingHorizontal: 0,
              marginTop: 20,
            }}
          >
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}>
              {isSuccess ? "Enviado " : "Enviar"}
            </Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default SubmitCommentCompanyProfile;

const styles = StyleSheet.create({});
