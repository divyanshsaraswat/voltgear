import { ScrollView,Text, View,Image, Pressable,StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useCallback } from "react";
import { Gesture,GestureDetector,GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated,{SlideInLeft,SlideOutLeft, useSharedValue, 
  useAnimatedStyle, 
  useAnimatedScrollHandler,
  useDerivedValue,
  withTiming, 
  withSpring,FadeIn,FadeOut,
  Easing,ReduceMotion} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import { ArrowUpRight, BatteryMedium, BellIcon, CloudSun, LocationEditIcon, LucideShipWheel, SatelliteIcon } from "lucide-react-native";
import { transform } from "@babel/core";
type IndividualCardProps = {
  item: any;
  index: number;
};
export default function Home() {
  const router = useRouter();
  const topoffsetX = useSharedValue(-100);
  const topoffsetXneg = useSharedValue(100);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [fontsLoaded,error] = useFonts({
    Lufga: require("../../assets/fonts/LufgaRegular.ttf"), // adjust path as needed
    LufgaBlack: require("../../assets/fonts/LufgaBlack.ttf"),
    LufgaBold: require("../../assets/fonts/LufgaBold.ttf"),
    LufgaMedium: require("../../assets/fonts/LufgaMedium.ttf"),
    LufgaThin: require("../../assets/fonts/LufgaThin.ttf"),
  });
  if (error){
    return "Nah";
  }
  const pressed = useSharedValue<boolean>(false);

 
const animatedStyleTop = useAnimatedStyle(()=>{
  return {
    transform: [{
      translateX: topoffsetX.value
    }]
  }
})
const animatedStyleTopNeg = useAnimatedStyle(()=>{
  return {
    transform: [{
      translateX: topoffsetX.value
    }]
  }
})
const animatedStyleButton = useAnimatedStyle(() => ({
  transform: [{
    scale: withTiming(pressed.value ? 0.7 : 1, { duration: 300 })
  }]
}));
const scrollYRaw = useSharedValue(0);

// Apply spring smoothing to raw scrollY
const scrollY = useDerivedValue(() => {
  return withSpring(scrollYRaw.value, {
    damping: 15,
    stiffness: 120,
  });
});

// Scroll handler updates raw scroll position
const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    scrollYRaw.value = event.contentOffset.y;
  },
});
useFocusEffect(
  useCallback(()=>{
      topoffsetX.value = withTiming(0, {
      duration: 350,
      easing: Easing.inOut(Easing.exp),
      reduceMotion: ReduceMotion.System,
    });
      topoffsetXneg.value = withTiming(0,{duration:800,easing:Easing.elastic(1)});
       return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        topoffsetX.value = withSpring(-600,{duration:500,dampingRatio:0.5})
      };
  },[])
);


function IndividualCard({item,index}: IndividualCardProps){
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const router = useRouter();
  const pressed = useSharedValue<boolean>(false);
  const width = useSharedValue(75);
  const offsetY = useSharedValue(30);
  const opacity = useSharedValue(0);
  const animatedStyleButtonIn = useAnimatedStyle(() => ({
  transform: [{
    scale: withTiming(pressed.value ? 0.7 : 1, { duration: 300 })
  }]
}));
  useFocusEffect(
  useCallback(() => {
    const timeout = setTimeout(() => {
      offsetY.value = withSpring(0, { duration: 1000,dampingRatio:0.5 });
      opacity.value = withSpring(1, { duration: 300,dampingRatio:0.7 });
    }, index*100);

    return () => {
      clearTimeout(timeout);
      offsetY.value = 30;
      opacity.value = 0;
    };
  }, [])
);
  const animatedStyleWidth = useAnimatedStyle(()=>{
    return{
      width:withSpring(`${width.value}%`,{duration:1000,dampingRatio:0.8}),
      backgroundColor:withSpring(width.value>50?Colors.primaryColor:"red",{duration:600,dampingRatio:0.7})
    }
  }
  )
  const animatedStyle = useAnimatedStyle(() => {
    const transforms = [];

    if (item.special) {
      transforms.push({ rotate: '-5deg' });
    }

    transforms.push({ translateY: offsetY.value });

    return {
      opacity: opacity.value,
      transform: transforms,
    };
  })


  return (
    <AnimatedPressable
      key={index}
      onPressIn={() => {
    pressed.value = true;
  }}
  onPressOut={() => {
    pressed.value = false;
  }}
      onPress={()=>setTimeout(()=>router.push(`/${item.route}`),320)}
      style={[
        styles.box,
        animatedStyle,
        animatedStyleButtonIn,
        item.special && { backgroundColor: Colors.primaryColor },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }} >
        <View style={{
          width: 55,
          height: 55,
          borderRadius: 55,
          backgroundColor: item.special ? Colors.darkColor : Colors.primaryColor,
          justifyContent: "center",
          alignItems: "center"
        }}>
          {item.icon(item.special as boolean)}
        </View>
        <Text style={{
          ...styles.text,
          color: item.special ? Colors.darkColor : '#fff'
        }}>{item.title}</Text>
      </View>
         {item.title=="Battery" && <Animated.View style={[{
           width:"100%",
           height:35,
           flex:1,
           paddingHorizontal:15,
           flexDirection:"column",
           borderRadius:15,
           backgroundColor:  Colors.darkColor,
           justifyContent:"flex-end",
           alignItems:"center"
          }]}>
              <View style={{gap:8,width:"100%",marginBottom:20}}>
                {item.title =="Battery" && <Text style={[styles.maintext,{fontFamily:"Lufga",fontSize:10}]}>2 h 25 mins remaining</Text>}
              <Animated.View style={[{height:65,backgroundColor:"red",borderRadius:15,flexDirection:"column",justifyContent:"center",alignItems:"center"},animatedStyleWidth]}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                        <Animated.Text style={[{fontSize:20,fontFamily:"LufgaMedium"}]}>
                          75%
                        </Animated.Text>
                      </View>
                
              </Animated.View>
              </View>
                 
              </Animated.View>}
      {item.value!="Tap" && <Text style={{
        ...styles.text,
        ...(item.large ? { padding: 5, fontSize: 45, width: 'auto' } : {}),
        color: item.special ? Colors.darkColor : '#fff'
      }}>{item.value}</Text>}
    </AnimatedPressable>
  );
}
  return (
   
     <Animated.View  entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)} style={{ flex: 1, backgroundColor: Colors.background }}>
    <Animated.ScrollView
 onScroll={scrollHandler}
  scrollEventThrottle={16}
  contentContainerStyle={styles.container}
  showsVerticalScrollIndicator={false}
  bounces={true}
  overScrollMode="always"
>
      <View style={[{width:"100%",flexDirection:"row",justifyContent:"space-between",padding:10,gap:5,alignItems:"center"}]}>
      <Animated.View style={[{flexDirection:"row",gap:20},animatedStyleTop]}>
      <Image source={require('../../assets/images/profile.png')} style={{width:70,height:70,borderRadius:70,borderColor:"white",borderWidth:1}}></Image>
      <View style={{paddingTop:5,gap:10}}>
        <Text style={{...styles.maintext,fontFamily:"Lufga"}}>Hello!</Text>
        <Text style={{...styles.maintext,fontSize:20,fontFamily:"LufgaBold"}}>Divyansh Saraswat</Text>
      </View>
      </Animated.View>
        <Pressable  onPress={()=>router.push('/dashboard')} style={{padding:12,borderRadius:30,backgroundColor:Colors.greyed}}>
          <BellIcon color={Colors.foreground} size={18}/>
        </Pressable>
      </View>

      <Animated.Text entering={SlideInLeft.duration(300)} exiting={SlideOutLeft.duration(500)} style={{fontFamily:'LufgaMedium',color:Colors.foreground,fontSize:32,alignSelf:"flex-start",paddingLeft:20}}>Dashboard</Animated.Text>
      <Image source={require('../../assets/images/transparent.webp')} style={{width:"100%", height: 200}}></Image>
      {/* <Text style={{fontFamily:'LufgaBold',color:Colors.foreground,fontSize:64}}>voltgear.</Text>
      <Text style={{fontFamily:'LufgaMedium',color:Colors.foreground,fontSize:14,letterSpacing:1}}>Now in development</Text> */}
      <View style={{width:"100%",height:'auto',flexDirection:"row",flexWrap:"wrap",padding:12,justifyContent:"space-between"}}>
      {[
        { 
          icon: (special:boolean) => <LocationEditIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Location', 
          value: 'Tap' ,
          route:""
        },
        { 
          icon: (special:boolean) => <BatteryMedium color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Battery', 
          value: 'Tap' ,
          route:"battery"
        },
        { 
          icon: (special:boolean) => <CloudSun color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Weather', 
          value: '25 °C', 
          large: true ,
          route:""
        },
        { 
          icon: (special:boolean) => <LocationEditIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Charging Station', 
          value: 'Tap' ,
          route:"charging"
        },
        { 
          icon: (special:boolean) => <SatelliteIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Seat adjustments', 
          value: '38°', 
          special:true,
          large: true ,
          route:""
        },
        { 
          icon: (special:boolean) => <LucideShipWheel color={special?Colors.primaryColor:Colors.darkColor} />, 
          title: 'Tyre Pressure', 
          value: '36 psi', 
          large: true ,
          route:""
        },
      ].map((item, index) =>{ 
        return (
        <IndividualCard  key={index} index={index} item={item}/>
      );
    }
)}
      </View>
        




   
      <AnimatedPressable  onPressIn={() => {
    pressed.value = true;
  }}
  onPressOut={() => {
    pressed.value = false;
  }} style={[styles.button,animatedStyleButton]} onPress={()=>setTimeout(()=>router.navigate('/features'),320)}>
      <Animated.View style={[{flexDirection:"row",alignItems:"center",gap:5}]}>
        <Text style={{color:Colors.foreground,fontFamily:"Lufga"}}>View All</Text>
        <ArrowUpRight color={Colors.foreground} strokeWidth={0.8}/>
      </Animated.View>
      </AnimatedPressable>

    </Animated.ScrollView>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  button: {
    padding:24,
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
  },
  text: {
    fontFamily:'Lufga',
    color: '#fff',
    fontSize: 16,
    width:"42%",
    wordWrap:"wrap"  
  },
  maintext: {
    fontFamily:'Lufga',
    color: '#fff',
    fontSize: 16,
  },
  container:{
        flexGrow: 1,
  paddingTop:80,
  paddingBottom: 125,
  alignItems: "center",
  gap: 15,
  backgroundColor: Colors.background,
        
  },
  box:{
    width:"49.5%",
    borderRadius:35,
    justifyContent:"space-between",
    padding:10,
    marginVertical:5,
    height:200,
    backgroundColor:Colors.darkColor
    }
});