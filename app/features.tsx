import { ScrollView,Text, View,Image, Pressable,StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { useFocusEffect } from "expo-router";
import { BatteryMedium, CloudSun, LocateIcon, LocationEditIcon, LucideLocateFixed, LucideShipWheel, MapPin, SatelliteIcon } from "lucide-react-native";
import Animated,{ useAnimatedStyle, useSharedValue,withSpring,withTiming } from "react-native-reanimated";
type IndividualCardProps = {
  item: any;
  index: number;
};
export default function Features() {
  const router = useRouter();
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
function IndividualCard({item,index}: IndividualCardProps){
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const router = useRouter();
  const pressed = useSharedValue<boolean>(false);
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
      <Text style={{
        ...styles.text,
        ...(item.large ? { padding: 5, fontSize: 45, width: 'auto' } : {}),
        color: item.special ? Colors.darkColor : '#fff'
      }}>{item.value}</Text>
    </AnimatedPressable>
  );
}
  return (
     <View style={{ flex: 1, backgroundColor: Colors.background }}>
    <ScrollView
    contentContainerStyle={styles.container}
   showsVerticalScrollIndicator={false}
    >
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",padding:10,gap:5,alignItems:"center"}}>
        <View style={{
          width:"100%",
          flex:1,
          padding:15,
          flexDirection:"row",
          borderRadius:55,
          backgroundColor:  Colors.darkColor,
          justifyContent:"space-between",
          alignItems:"center"
        }}>
           <View style={{width:"40%",height:310,justifyContent:"space-between"}} >
            <Text style={{color:Colors.foreground,fontSize:25,wordWrap:"wrap",fontFamily:"Lufga"}}>Charging Station</Text>
            <View style={{width:"100%"}}>
                <View style={{gap:12}}>
                <Text style={[styles.text, {fontSize:13,wordWrap:"nowrap",width:"100%"}]}>Sultan Limited Co.</Text>
                <View style={{flex:1,flexDirection:"row",gap:2}}>
                    <MapPin size={20} color={Colors.foreground}/>
                    <Text style={[styles.text,{fontSize:10,wordWrap:"nowrap",width:"100%"}]}>Pubali Uttara Charge Station</Text>
                </View>
                <View style={{flexDirection:"row",gap:8}}>
                    <View style={{padding:10,backgroundColor:Colors.primaryColor,borderRadius:18}}><Text style={{fontSize:10,fontFamily:"Lufga"}}>5.5 mile</Text></View>
                    <View style={{padding:10,backgroundColor:Colors.primaryColor,borderRadius:18}}><Text style={{fontSize:10,fontFamily:"Lufga"}}>57 min</Text></View>
                </View>
                </View>
            </View>
            </View> 

           <View style={{borderWidth:1,borderRadius:35,flex:0.9}}>
            <Image source={require('../assets/images/charging.jpg')} style={{height:310,width:"auto",borderRadius:30,borderColor:"white",objectFit:"cover"}}></Image>

            </View> 
           
        </View>
        
      </View>

  
   
      <View style={{width:"100%",height:'auto',flexDirection:"row",flexWrap:"wrap",padding:12,justifyContent:"space-between"}}>
      {[
        { 
          icon: (special:boolean) => <LocationEditIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Location', 
          value: 'Tap' 
        },
        { 
          icon: (special:boolean) => <BatteryMedium color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Battery', 
          value: 'Tap' 
        },
        { 
          icon: (special:boolean) => <CloudSun color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Weather', 
          value: '25 °C', 
          large: true 
        },
        { 
          icon: (special:boolean) => <LocationEditIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Charging Station', 
          value: 'Tap' 
        },
        { 
          icon: (special:boolean) => <SatelliteIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: 'Seat adjustments', 
          value: '38°', 
          special:true,
          large: true 
        },
        { 
          icon: (special:boolean) => <LucideShipWheel color={special?Colors.primaryColor:Colors.darkColor} />, 
          title: 'Tyre Pressure', 
          value: '36 psi', 
          large: true 
        },
      ].map((item, index) => (
       <IndividualCard key={index} item={item} index={index}/>
      ))}
      </View>
        {/* <Pressable style={styles.button} onPress={()=>router.push('/dashboard')}>
          <Text style={styles.text}>Press me!</Text>
        </Pressable> */}

    </ScrollView>
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