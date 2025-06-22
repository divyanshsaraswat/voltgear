// app/index.tsx
import { Image,View, Text, Button,StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated ,{FadeIn, useSharedValue,FadeOut,SlideInUp,withTiming,useAnimatedStyle, withSpring,runOnJS, withSequence} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useFonts } from 'expo-font';
import { useRef } from 'react';
import { Check,Car, ArrowUpRight, ChevronsRight, Github, GitBranch, Mail } from 'lucide-react-native';
import { Gesture,GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

function SignUpButtons({name,icon,color}){
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const appear = useSharedValue(false);
  const animatedStyleButton = useAnimatedStyle(() => ({
  transform: [{
    scale: withTiming(appear.value ? 0.7 : 1, { duration: 300 })
  }]
}));
  return(
    <AnimatedPressable  onPressIn={() => {
    appear.value = true;
  }}
  onPressOut={() => {
    appear.value = false;
  }} style={[styles.button,animatedStyleButton,{borderColor:Colors.primaryColor}]}>
      <Animated.View style={[{flexDirection:"row",alignItems:"center",gap:5}]}>
        <Text style={{color:Colors.foreground,fontFamily:"Lufga"}}>Sign Up with {name}</Text>
        {icon}

      </Animated.View>
      </AnimatedPressable>
  )  
}
export default function IndexPage() {
  const position = useSharedValue(0);
  const [sign,setsign] = useState(false);
  const opacity = useSharedValue(1);
  const hasNavigated = useRef(false); 
  const scale = useSharedValue(1);
  const color = useSharedValue<boolean>(false);
  const router = useRouter();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const value = useSharedValue(false);
  const END_POSITION = 200;
  const btns =[
    {name:"Google",icon:<GitBranch stroke="white"/>},
    {name:"Github",icon:<Github stroke="white"/>},
    {name:"Email",icon:<Mail stroke="white"/>,color:true}
  ]
   const [fontsLoaded,error] = useFonts({
      Lufga: require("../assets/fonts/LufgaRegular.ttf"), // adjust path as needed
      LufgaBlack: require("../assets/fonts/LufgaBlack.ttf"),
      LufgaBold: require("../assets/fonts/LufgaBold.ttf"),
      LufgaMedium: require("../assets/fonts/LufgaMedium.ttf"),
      LufgaThin: require("../assets/fonts/LufgaThin.ttf"),
    });
    if (error){
      return "Nah";
    }
 const navigateToHome = () => {
  if (hasNavigated.current) return;
  hasNavigated.current = true;

  console.log("Navigating to /(tabs)/map...");
  try {
    console.log("Navigating to /(tabs)/map...");
    
  } catch (error) {
    console.error("Navigation failed:", error);
    hasNavigated.current = false; // optionally allow retry
  }
};

  const panGesture = Gesture.Pan()
  .activeOffsetX([-10, 10])
  .onUpdate((e) => {
    if (e.translationX > 173 && !hasNavigated.current) {
      hasNavigated.current = true; // lock navigation

      opacity.value = 0;
      color.value = true;
      scale.value = withSequence(withSpring(1.2), withSpring(1), withSpring(0));
      runOnJS(setsign)(true);
    }

    position.value = e.translationX;
  })
  .onEnd((e) => {
    if (!hasNavigated.current) {
      position.value = withTiming(0); // reset only if not navigated
    }
  });
    const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ translateX: position.value }],
    opacity:opacity.value
  };
});
    const animatedParent = useAnimatedStyle(() => {
      
  return {
    transform: ([{ scale:(withSpring(scale.value,{
      duration:500
    })) }]),
    opacity:withSpring(opacity.value,{
      duration:500
    })
  };
});

const animatedbtn = useAnimatedStyle(()=>{
  return{
    backgroundColor:withSpring(color.value?Colors.primaryColor:Colors.darkbg)
  }
})
  return (

    <View style={styles.container}>
      <View style={{paddingTop:45,flex:0.6,gap:100}}>
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',zIndex:3}}>
        <Image source={require('../assets/images/icons/android/icon-dark.png')} style={{width: 45, height: 45,zIndex:3}}/>
        <Animated.Text 
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}

        style={{fontFamily:'LufgaBold', color:Colors.foreground, fontSize:28,opacity:value?1:0}}>
          voltgear
        </Animated.Text>
      </View>
      <View>
      <Animated.Text entering={SlideInUp.duration(500)} style={styles.text}>Keep your EV at your <Image source={require('../assets/images/icons/android/icon-dark.png')} style={{width: 50, height: 30}}/>
 fingertips</Animated.Text>
      <Text style={styles.text}>No matter where you are.</Text>
      {/* <Button title="Go to Home"  onPress={() => router.replace('/(tabs)/home')} /> */}
      </View>
      </View>
        {!sign && <Image source={require('../assets/images/imagebg.png')} style={styles.Imagebg}/>}
        <Animated.View style={[{position:"absolute",bottom:60,width:"80%",backgroundColor:Colors.darkbg,zIndex:5,borderRadius:75,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},animatedParent]}>
         <GestureDetector gesture={panGesture}>
        <Animated.View style={[{backgroundColor:Colors.greyed,width:75,height:75,borderRadius:75,justifyContent:"center",alignItems:"center"},animatedStyle]}>
        <Car color={Colors.foreground}/>
        </Animated.View>
        </GestureDetector>
      
        
        <View style={{width:25,height:25,borderRadius:25,justifyContent:"center",alignItems:"center"}}>
          <ChevronsRight color={Colors.greyed}/>
        </View>
     
        <Animated.View style={[{width:75,height:75,borderRadius:75,justifyContent:"center",alignItems:"center"},animatedbtn]}>
          <Check />
        </Animated.View>
        </Animated.View>
         {sign && <View style={[{justifyContent:"center",alignItems:"center",zIndex:10,bottom:40,gap:8,width:"100%"}]}>
          {/* <Text style={[styles.text,{fontSize:22,alignSelf:"flex-start",marginBottom:12,paddingLeft:18}]}>Sign-Up</Text> */}
          {btns.map((res,index)=>{
            return(
              
              <SignUpButtons key={index} name={res.name} icon={res.icon}/>
              
            )
          })}
         </View>}
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,            // <-- takes full height of screen
    justifyContent: 'space-between', // optional: center vertically
    alignItems: 'center',     // optional: center horizontally
    backgroundColor: '#000000',  // optional
    padding:20,
    zIndex:3

  },
  text:{
    color:Colors.foreground,
    fontFamily:'LufgaMedium',
    fontSize:35,
    zIndex:3
  },
  Imagebg:{
    position:"absolute",
    bottom:20,
    right:-55,
    objectFit:"fill",
    zIndex:1
  },
  button: {
    padding:14,
    borderWidth:0.5,
    borderColor:Colors.greyed,
    borderRadius: 40,
    width:"90%",
    
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  }
});