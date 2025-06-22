import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TestGesture() {
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      translateX.value = withTiming(0);
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[{ width: 100, height: 100, backgroundColor: Colors.background }, animStyle]}>
          <Text style={{ color: 'white', textAlign: 'center', lineHeight: 100 }}>Drag me</Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
