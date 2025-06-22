import { ScrollView,Text, View,Image, Pressable,StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { BatteryMedium, CloudSun, LocationEditIcon, LucideShipWheel, SatelliteIcon } from "lucide-react-native";
export default function Profile() {
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
  return (
     <View style={{ flex: 1, backgroundColor: Colors.background }}>
    <ScrollView
    contentContainerStyle={styles.container}
   showsVerticalScrollIndicator={false}
    >
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",padding:10,gap:5,alignItems:"center"}}>
      <View style={{flexDirection:"row",gap:20}}>
      <Image source={require('../assets/images/profile.png')} style={{width:70,height:70,borderRadius:70,borderColor:"white",borderWidth:1}}></Image>
      <View style={{paddingTop:5,gap:10}}>
        <Text style={{...styles.maintext,fontFamily:"Lufga"}}>Hello!</Text>
        <Text style={{...styles.maintext,fontSize:20,fontFamily:"LufgaBold"}}>Divyansh Saraswat</Text>
      </View>
      </View>
        <Pressable  onPress={()=>router.push('/dashboard')}>
          <Text style={styles.text}>O</Text>
        </Pressable>
      </View>

      <Text style={{fontFamily:'LufgaMedium',color:Colors.foreground,fontSize:32,alignSelf:"flex-start",paddingLeft:20}}>Profile</Text>
      <Image source={require('../assets/images/transparent.webp')} style={{width:"100%", height: 200}}></Image>
      {/* <Text style={{fontFamily:'LufgaBold',color:Colors.foreground,fontSize:64}}>voltgear.</Text>
      <Text style={{fontFamily:'LufgaMedium',color:Colors.foreground,fontSize:14,letterSpacing:1}}>Now in development</Text> */}
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
        <View 
          key={index} 
          style={[
        styles.box,
        item.special && {
          transform: [{ rotate: '-5deg' }],
          backgroundColor: Colors.primaryColor
        }
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
          <Text style={{
        ...styles.text,
        ...(item.large ? {padding:5,fontSize:45,width:'auto'} : {}),
        color: item.special ? Colors.darkColor : '#fff'
          }}>{item.value}</Text>
        </View>
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