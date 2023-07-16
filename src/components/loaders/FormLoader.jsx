import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const FormLoader = ({isLoading}) => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, [rotationValue]);

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
    {isLoading &&     <View style={styles.container}>
      <Animated.View
        style={[styles.icon, { transform: [{ rotate: rotateInterpolation }] }]}
      >
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </Animated.View>
    </View>}
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bar: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'black',
  },
});

export default FormLoader;