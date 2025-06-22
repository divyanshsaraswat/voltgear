import { ScrollView,Text, View,Image, Pressable,StyleSheet } from "react-native";
import { useCallback } from "react";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { BatteryCharging, BatteryMedium,FuelIcon, CloudSun, DollarSignIcon, History, HistoryIcon, LocateIcon, LocationEditIcon, LucideLocateFixed, LucideShipWheel, MapPin, SatelliteIcon, PlugZap, PlugZap2 } from "lucide-react-native";
import Charger from "@/components/Charger";
import Animated,{ useSharedValue,useAnimatedStyle,withTiming } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
type IndividualCardProps = {
  item: any;
  index: number;
};
export default function Charging() {
  const router = useRouter();
  const pressed = useSharedValue(false);
  const counter = useSharedValue(0);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
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
  const IndividualCard = ({item,index}:IndividualCardProps)=>{
    const pressed = useSharedValue(false);
    const animatedStyleButtonIn = useAnimatedStyle(() => ({
    transform: [{
      scale: withTiming(pressed.value ? 0.7 : 1, { duration: 300 })
    }]
  }));
  
    return(
       <AnimatedPressable 
          key={index} 
          onPressIn={()=>pressed.value=true}
          onPressOut={()=>pressed.value=false}
          style={[
        styles.box,
        animatedStyleButtonIn
          ]}
        > 
          <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <View style={{
          width:55,
          height:55,
          borderRadius:55,
          backgroundColor: item.special ? Colors.darkColor : Colors.primaryColor,
          justifyContent:"center",
          alignItems:"center"
        }}>
          {item.icon(item.special as boolean)}
        </View>

        
        <Text style={{
          ...styles.text,
          color: item.special ? Colors.darkColor : '#fff'
        }}>{item.title}</Text>
          </View>
          <View>
          <Text style={{
        ...styles.text,
        ...(item.large ? {padding:5,fontSize:28,width:'auto'} : {}),
        color: item.special ? Colors.darkColor : '#fff'
          }}>{item.value}</Text>
          <Text style={[styles.text,{color:Colors.greyed,padding:5,width:"100%",fontSize:14}]}>{item.subtitle}</Text>
          </View>
        </AnimatedPressable>
    )
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
          padding:40,
          flexDirection:"row",
          borderRadius:55,

          justifyContent:"center",
          alignItems:"center"
        }}>
           {/* <View style={{width:"40%",height:310,justifyContent:"space-between"}} >
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
            </View>  */}

           {/* <View style={{borderWidth:1,borderRadius:35,flex:0.9}}>
            <Image source={require('../assets/images/charging.jpg')} style={{height:310,width:"auto",borderRadius:30,borderColor:"white",objectFit:"cover"}}></Image>

            </View>  */}    
          <Charger/>
        </View>
        
      </View>

  
   
      <View style={{width:"100%",height:'auto',flexDirection:"row",flexWrap:"wrap",padding:12,paddingBottom:50,justifyContent:"space-between"}}>
      {[
        { 
          icon: (special:boolean) => <HistoryIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: '', 
          value: '2h 45 min' ,
          subtitle:"Duration",
          large:true
        },
        { 
          icon: (special:boolean) => <History color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: '', 
          value: '15 minute' ,
          subtitle:"Ends in",
          large:true 
        },
        { 
          icon: (special:boolean) => <BatteryCharging color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: '', 
          value: '75%',
          subtitle:"Battery Charged",
          large: true 
        },
        { 
          icon: (special:boolean) => <DollarSignIcon color={special?Colors.primaryColor:Colors.darkColor}/>, 
          title: '', 
          value: '$25' ,
          subtitle:"Total Cost",
          large:true
        },
        
      ].map((item, index) => {
        return <IndividualCard key={index} item={item} index={index}/>
      })}
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
                style={[styles.button,{flexDirection:"row",gap:8,borderRadius:40,paddingVertical:25},animatedStyleButton]}
                onPressIn={()=>{pressed.value=true}}
                onPressOut={()=>{pressed.value=false}}
                onPress={() => router.push('/map')}
            >
                <PlugZap2 size={16}/>
                <Text style={[styles.maintext,{color:Colors.darkColor}]}>Finish Now</Text>
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