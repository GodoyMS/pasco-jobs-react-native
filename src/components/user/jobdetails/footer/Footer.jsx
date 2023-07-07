import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import styles from "./footer.style";
import icons from "@constants/icons";
import { TouchableWithoutFeedback } from "react-native";



const Footer = ({handleAddFavorite,isAddedToFav,showMessage}) => {

  return (
    <View style={styles.container}>
      {isAddedToFav ? (
        <View style={styles.likeBtn}>
          <Image
          source={icons.heart}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />

        </View>

      ):(<TouchableOpacity onPress={handleAddFavorite} style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
)}
      
      
      <TouchableOpacity
      activeOpacity={0.9}
        style={styles.applyBtn}
        onPress={()=>console.log("pressed")}
      >
        <Text style={styles.applyBtnText}>Postular</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
