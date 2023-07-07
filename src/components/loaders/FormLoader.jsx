import { COLORS } from '@constants/theme';
import React, {useState, useEffect} from 'react';
import { StyleSheet,Text } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

const FormLoader = ({isLoading,message}) => {

  
    return (
      <AnimatedLoader
        visible={isLoading}
        animationType={"none"}
        overlayColor="rgba(0,0,0,0.75)"
        animationStyle={styles.lottie}
        speed={1}>
        <Text style={{color:COLORS.white}}>{message}</Text>
      </AnimatedLoader>
    );
};

export default FormLoader;

const styles = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100,
    },
  });