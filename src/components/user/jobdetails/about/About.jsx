import { View, Text } from "react-native";

import styles from "./about.style";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const About = ({ info }) => {
  const { width } = useWindowDimensions();
  console.log(info)
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Sobre el trabajo:</Text>

      <View style={styles.contentBox}>
      <RenderHtml
      contentWidth={width}
      source={{html:info}}
    />
      </View>
    </View>
  );
};

export default About;
