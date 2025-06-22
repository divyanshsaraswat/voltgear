import { ScrollView,Text, View,Image, Pressable,StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import Animated,{useAnimatedStyle,withTiming,useSharedValue} from "react-native-reanimated";
import { BatteryMedium, CloudSun, LocationEditIcon, LucideShipWheel, SatelliteIcon,ArrowUpRight, Route } from "lucide-react-native";
import { GestureHandlerRootView,Gesture,GestureDetector } from "react-native-gesture-handler";
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Vehicle() {
  const router = useRouter();
  const pressed = useSharedValue<boolean>(false);
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

    const animatedStyleButton = useAnimatedStyle(() => ({
      transform: [{
        scale: withTiming(pressed.value ? 0.7 : 1, { duration: 300 })
      }]
    }));
    const tap = Gesture.Tap()
    .onBegin(() => {
      console.log("Tapped")
    })
    .onFinalize(() => {
      pressed.value = false;
    });
  return (
    <GestureHandlerRootView style={{flex:1}}>
     <View style={{ flex: 1, backgroundColor: Colors.background }}>
    <ScrollView
    contentContainerStyle={styles.container}
   showsVerticalScrollIndicator={false}
    >
      

      {/* <Text style={{fontFamily:'LufgaBold',color:Colors.foreground,fontSize:64}}>voltgear.</Text>
      <Text style={{fontFamily:'LufgaMedium',color:Colors.foreground,fontSize:14,letterSpacing:1}}>Now in development</Text> */}
      <View style={{width:"100%",height:'auto',flexDirection:"row",flexWrap:"wrap",padding:12,justifyContent:"space-between"}}>
      {[
        { 
          image:'../assets/images/car.png', 
          model:"M09879789",
          title: 'BMW i7', 
          use:true,
          value: 'Tap' 
        },
         { 
          image:'../assets/images/car.png', 
          model:"M09879789",  
          title: 'BMW i7', 
          use:false,
          value: 'Tap' 
        },
        { 
          image:'../assets/images/car.png', 
          model:"M09879789",
          title: 'BMW i7', 
          use:false,
          value: 'Tap' 
        },
         { 
          image:'../assets/images/car.png', 
          model:"M09879789",
          title: 'BMW i7', 
          use:false,
          value: 'Tap' 
        },
         { 
          image:'../assets/images/car.png', 
          model:"M09879789",
          title: 'BMW i7', 
          use:false,
          value: 'Tap' 
        },
         { 
          image:'../assets/images/car.png', 
          model:"M09879789",
          title: 'BMW i7', 
          use:false,
          value: 'Tap' 
        },
      ].sort((a:any,b:any)=>-a.use+b.use).map((item, index) => (
          <AnimatedPressable onPressIn={()=>pressed.value=true} onPressOut={()=>pressed.value=false} key={index}>
        <Animated.View 
          key={index} 
          style={[
        styles.box,animatedStyleButton
          ]}
        > 
          <View style={{flexDirection:"row",alignItems:"center",gap:10,padding:10}}>


        <View style={{
          width:"100%",
          height:"auto",
          borderRadius:55,
          backgroundColor: Colors.darkColor,
          justifyContent:"center",
          alignItems:"center"
        }}>
        {/* <Image source={require(item.image)} style={{width:70,height:70,borderRadius:70,borderColor:"white",borderWidth:1}}></Image> */}
       <View style={{ width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <View style={{gap:10}}>
         <Text style={{
          ...styles.text,
          color: Colors.foreground,
         
          fontSize:25,

        }}>{item.title}</Text>
         <Text style={{
          ...styles.text,
          color: Colors.foreground,
         
          fontSize:12,

        }}>{item.model}</Text>
        </View>
        {item.use && <Text style={[styles.text,{fontSize:12,padding:10,backgroundColor:Colors.primaryColor,color:Colors.background,borderRadius:18}]}>
            In Use
        </Text>}
       </View>
        </View>



          </View>
         
        <Image source={require('../assets/images/car.png')} style={{width:320,height:160}}/>


         <AnimatedPressable onPressIn={()=>pressed.value=true} onPressOut={()=>pressed.value=false}  style={[styles.button2,animatedStyleButton]} onPress={()=>router.navigate('/map')}>
      <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
        <Route color={Colors.foreground} strokeWidth={0.5}/>
        <Text style={{color:Colors.foreground,fontFamily:"Lufga"}}>Track Now</Text>
      </View>
    </AnimatedPressable>
        </Animated.View>
        </AnimatedPressable>
      ))}
      </View>
      

    </ScrollView>
    </View>
    </GestureHandlerRootView>
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
  button2: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 24,
    color:Colors.foreground,
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    borderColor:Colors.primaryColor,
    borderWidth:0.57
  },
  text: {
    fontFamily:'Lufga',
    color: '#fff',
    fontSize: 16,

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
    width:"100%",
    borderRadius:35,
    justifyContent:"space-between",
    alignItems:"center",
    padding:10,
    gap:10,
    marginVertical:25,

    height:"auto",
    backgroundColor:Colors.darkColor
    }
});