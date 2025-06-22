import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function Charger() {
  const count = useSharedValue(0);

  useEffect(
   () => {
      count.value = withTiming(100, { duration: 1000 }); // Animate to 100
      return () => {
        count.value = 0;
      };
    }, []
  );

  const animatedCount = useDerivedValue(() => {
    return `${Math.round(count.value)}`;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // You can animate styles here if needed
    };
  });

  return (
    <View
      style={{
        height: 200,
        width: 200,
        borderRadius: 200,
        backgroundColor: Colors.primaryColor,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.primaryColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 120,
        elevation: 40, // Android glow
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <AnimatedText style={styles.text}>
          {animatedCount.value}
        </AnimatedText>
        <Text style={[styles.text, { fontSize: 30 }]}>%</Text>
      </View>
      <Text style={[styles.text, { fontSize: 12, fontFamily: "Lufga" }]}>
        Charged
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "LufgaMedium",
    fontSize: 50,
    color: Colors.background,
  },
});
