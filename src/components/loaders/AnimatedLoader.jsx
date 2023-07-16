import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const AnimatedLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default AnimatedLoader;