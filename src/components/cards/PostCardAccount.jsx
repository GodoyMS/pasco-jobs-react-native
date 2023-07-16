import { COLORS, FONT, SIZES } from "@constants/theme";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const PostCardAccount = ({ title, content, backgroundImage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity onPress={toggleModal} style={styles.cardContainer}>
      <ImageBackground source={backgroundImage} style={styles.card}>
        <View style={styles.overlay} />
      </ImageBackground>
      <Text style={styles.cardTitle}>{title}</Text>
      
       
    

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalContent} onPress={toggleModal}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{content}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  card: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardTitle: {
    fontSize: 15,
    color: COLORS.indigo800,
    fontFamily: FONT.bold,
    paddingHorizontal: 2,
    paddingVertical: 10,
    zIndex: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(0,0,0,0.6)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily:FONT.bold
  },
  modalText: {
    fontSize: SIZES.medium,
    lineHeight: 24,
    fontFamily: FONT.regular,
  },
});
export default PostCardAccount;
