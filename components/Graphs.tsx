import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const CustomBarChart = () => {
  const targetBarData = [
    { value: 100, frontColor: '#ccc', label: '1' },
    { value: 100, frontColor: '#ccc' },
    { value: 100, frontColor: '#ccc' },
    { value: 100, frontColor: '#ccc', label: '4' },
    { value: 100, frontColor: '#ccc' },
    { value: 100, frontColor: '#ccc' },
    { value: 100, frontColor: '#ccc', label: '7' },
    { value: 100, frontColor: '#ccc' },
    { value: 100, frontColor: '#ccc' },
    { value: 100, frontColor: '#ccc', label: '10' },
    { value: 60, frontColor: '#a5ff2b' },
    { value: 60, frontColor: '#a5ff2b' },
    { value: 60, frontColor: '#a5ff2b', label: 'Now' },
  ];

  const animatedValues = useRef(
    targetBarData.map(() => new Animated.Value(0))
  ).current;

  const [currentBarData, setCurrentBarData] = React.useState(
    targetBarData.map(item => ({ ...item, value: 0 }))
  );

  useEffect(() => {
    // Set up listeners for each animated value with throttling
    const throttledUpdate = (index, value) => {
      setCurrentBarData(prevData => {
        const newData = [...prevData];
        newData[index] = {
          ...targetBarData[index],
          value: Math.round(value)
        };
        return newData;
      });
    };

    animatedValues.forEach((animatedValue, index) => {
      let lastUpdate = 0;
      animatedValue.addListener(({ value }) => {
        const now = Date.now();
        if (now - lastUpdate > 8) { // Throttle to ~120fps max
          lastUpdate = now;
          throttledUpdate(index, value);
        }
      });
    });

    // Start spring animations with optimized parameters
    setTimeout(() => {
      const springAnimations = animatedValues.map((animatedValue, index) => {
        return Animated.spring(animatedValue, {
          toValue: targetBarData[index].value,
          tension: 100,  // Increased for snappier response
          friction: 8,   // Reduced for more bounce
          velocity: 12,  // Add initial velocity
          useNativeDriver: false,
        });
      });

      Animated.stagger(30, springAnimations).start(); // Faster stagger
    }, 50);

    return () => {
      animatedValues.forEach(animatedValue => {
        animatedValue.removeAllListeners();
      });
    };
  }, []);

  return (
    <View style={{ backgroundColor: '#0f0f0f', flex: 1, padding: 20, borderRadius: 20 }}>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <Text style={[styles.legendText,{fontFamily:"Lufga",fontSize:20,marginBottom:25}]}>Activity</Text>
        <Text style={[styles.legendText,{fontFamily:"Lufga",fontSize:15,marginBottom:25}]}>Today</Text>
      </View>
      
      {/* Legend */}
      <View style={{ flexDirection: 'row', marginBottom: 12 ,alignItems:"center",justifyContent:"center"}}>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#ccc' }]} />
          <Text style={[styles.legendText,{fontFamily:"Lufga"}]}>Battery Usage</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#a5ff2b' }]} />
          <Text style={[styles.legendText,{fontFamily:"Lufga",color:'#a5ff2b'}]}>Charging</Text>
        </View>
      </View>
      
      {/* Bar Chart with individual value animations */}
      <BarChart
        barWidth={3}
        barBorderRadius={2}
        data={currentBarData}
        spacing={18}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisLabelTexts={['0%', '25%', '50%', '75%', '100%']}
        yAxisTextStyle={{ color: 'white', fontSize: 10 }}
        xAxisLabelTextStyle={{ color: 'white', fontSize: 8,marginRight:4 }}
        noOfSections={4}
        stepValue={25}
        maxValue={100}
        rulesColor="transparent"
      />
    </View>
  );
};

const styles = {
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  colorBox: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
  },
};

export default CustomBarChart;