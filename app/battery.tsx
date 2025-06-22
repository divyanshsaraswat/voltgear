import { ScrollView,Text, View,Image, Pressable,StyleSheet, Button, Easing } from "react-native";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import CustomBarChart from "@/components/Graphs";
import Animated, { useAnimatedStyle,useSharedValue,withSpring,withTiming } from "react-native-reanimated";
import { BatteryMedium, CloudSun, FuelIcon, LocateIcon, LocationEditIcon, LucideLocateFixed, LucideShipWheel, MapPin, SatelliteIcon } from "lucide-react-native";
export default function Battery() {
  const router = useRouter();
  const width = useSharedValue(0);
  const pressed = useSharedValue(false);
  const counter = useSharedValue(0);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
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
  const animatedStyleButtonIn = useAnimatedStyle(() => ({
      transform: [{
        scale: withTiming(pressed.value ? 0.7 : 1, { duration: 300 })
      }]
    }));
  const animatedStyleWidth = useAnimatedStyle(()=>{
    return{
      width:withSpring(`${width.value}%`,{duration:1000,dampingRatio:0.8}),
      backgroundColor:withSpring(width.value>50?Colors.primaryColor:"red",{duration:600,dampingRatio:0.7})
    }
  }
  )
  
    useFocusEffect(
      useCallback(()=>{
           width.value = withSpring(75, { duration: 1800,dampingRatio:1.2,velocity:3 });
           return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            // topoffsetX.value = withSpring(-600,{duration:500,dampingRatio:0.5})
          };
      },[])
    );
  return (
     <View style={{ flex: 1, backgroundColor: Colors.background }}>
    <ScrollView
    contentContainerStyle={styles.container}
   showsVerticalScrollIndicator={false}
    >
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",padding:10,paddingTop:50,gap:5,alignItems:"center"}}>
        <Animated.View style={[{
          width:"100%",
          height:125,
          flex:1,
          paddingHorizontal:15,
          flexDirection:"row",
          borderRadius:65,
          backgroundColor:  Colors.darkColor,
          justifyContent:"space-between",
          alignItems:"center"
        }]}>
          
        <Animated.View style={[{height:125,backgroundColor:"red",borderRadius:35,flexDirection:"column",justifyContent:"center",alignItems:"center"},animatedStyleWidth]}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Animated.Text style={[{fontSize:60,fontFamily:"LufgaMedium"}]}>
                    75%
                  </Animated.Text>
                </View>
          <Text style={{fontFamily:"Lufga"}}>2 h 25 mins remaining</Text>
        </Animated.View>
           
        </Animated.View>
        
      </View>

        <View style={{ width:"95%",paddingHorizontal:15,paddingVertical:40,borderBottomWidth:0.5,borderColor:Colors.greyed,gap:15}}>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={[styles.text,{flexGrow:1.8}]}>Battery View</Text>
                <Text style={[styles.text,{fontSize:10,color:Colors.greyed}]}>Battery View</Text>
            </View>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={[styles.text,{flexGrow:1.8}]}>Total number of time charged</Text>
                <Text style={[styles.text,{fontSize:10,color:Colors.greyed}]}>Battery View</Text>
            </View>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={[styles.text,{flexGrow:1.8}]}>Additional Features</Text>
                <Text style={[styles.text,{fontSize:10,color:Colors.greyed}]}>Battery View</Text>
            </View>
        </View>
   
         <View style={{ width:"95%",paddingHorizontal:10,paddingTop:40,borderColor:Colors.greyed,gap:15,paddingBottom:80}}>
            <CustomBarChart/>
        </View>
    
        {/* <Pressable style={styles.button} onPress={()=>router.push('/dashboard')}>
          <Text style={styles.text}>Press me!</Text>
        </Pressable> */}

    </ScrollView>
    <Pressable>
        <View style={{
            position: 'absolute',
            bottom: 40,
            
            left: 20,
            right: 20
        }}>
            <AnimatedPressable 
                onPressIn={()=>pressed.value=true}
                onPressOut={()=>pressed.value=false}
                style={[styles.button,{flexDirection:"row",gap:8,borderRadius:40,paddingVertical:25},animatedStyleButtonIn]}
                onPress={() => router.push('/map')}
            >
                <FuelIcon size={16}/>
                <Text style={[styles.maintext,{color:Colors.darkColor}]}>Find a charge station</Text>
            </AnimatedPressable>
        </View>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    color:Colors.foreground,
    backgroundColor: Colors.primaryColor,
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
  paddingVertical: 85,
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