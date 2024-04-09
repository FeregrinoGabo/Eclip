import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  const sunAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moonTiming = Animated.timing(moonAnimation, {
      toValue: 1,
      duration: 15000,
      useNativeDriver: false,
    });

    const sunTiming = Animated.timing(sunAnimation, {
      toValue: 1,
      duration: 15000,
      useNativeDriver: false,
    });

    Animated.parallel([moonTiming,sunTiming]).start();
  }, []);

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '90%']
  });

  const moonColor = moonAnimation.interpolate({
    inputRange: [0, 0.225, 0.5, 0.675, 0.90],
    outputRange: ['#ADD8E6', '#000', '#000', '#000', '#ADD8E6']
  });

  const sunSize = sunAnimation.interpolate({
    inputRange: [0, 0.225, 0.45, 0.675, 1],
    outputRange: [70, 71, 72, 71, 70]
  });

  const sunColor = sunAnimation.interpolate({
    inputRange: [0, 0.49, 0.5, 0.51, 1],
    outputRange: ['#f39f18', '#fff', '#fff', '#fff', '#f39f18']
  });

  const containerBackgroundColor = moonAnimation.interpolate({
    inputRange: [0, 0.48, 0.5, 0.52, 1],
    outputRange: ['#ADD8E6', '#000', '#000', '#000', '#ADD8E6']
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      <Animated.View style={[styles.moon, { left: moonLeft, backgroundColor: moonColor }]} />
      <Animated.View style={[styles.sun, { backgroundColor:sunColor, width: sunSize, height: sunSize }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moon: {
    position: 'absolute',
    bottom: '50%',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: 1,
  },
  sun: {
    position: 'absolute',
    bottom: '50%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'orange',
  },
});
