import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Sobre el trabajo:</Text>

      <View style={styles.contentBox}>
        {info.map((e)=>(
          <Text style={styles.contextText} key={e.id}>{e.Item}</Text>
        ))}
      </View>
    </View>
  );
};

export default About;
