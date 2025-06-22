import { Text, View,Image,StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { ChevronRight, CircleUserIcon, Link2Icon, User2, User2Icon, UserCircleIcon,BellIcon,HelpCircleIcon,InfoIcon, LogOutIcon, Car, Languages } from 'lucide-react-native';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
export default function Settings() {
  const navigation = useNavigation();
  const router = useRouter()
  const arritems = [
    {"name":"Personal Information","icons":<UserCircleIcon size={18}  strokeWidth={1} color={Colors.foreground}/>,route:"vehicle"},
    {"name":"My Vehicles","icons":<Car size={18}  strokeWidth={1} color={Colors.foreground}/>,route:"/"},
    {"name":"Security","icons":<Link2Icon size={18}  strokeWidth={1} color={Colors.foreground}/>,route:"/"},
    {"name":"Language","icons":<Languages size={18}  strokeWidth={1} color={Colors.foreground}/>,route:"test"},
    {"name":"Notification","icons":<BellIcon size={18}  strokeWidth={1} color={Colors.foreground}/>,route:"/"},
    {"name":"Help & Support","icons":<HelpCircleIcon size={18}  strokeWidth={1} color={Colors.foreground}/>,route:"/"},
    {"name":"Logout","icons":<LogOutIcon size={18}  strokeWidth={1} color={"red"}/>}
  ]
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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        paddingTop:100,
        alignItems: "center",
        backgroundColor:Colors.background,
        gap:30
      }}
    >
      <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",gap:10}}>
        <Image source={require('../../assets/images/profile.png')} style={{width: 100,height:100,borderRadius:100}}></Image>
        <Text style={{fontFamily:'LufgaMedium',color:Colors.foreground,fontSize:24,letterSpacing:1}}>Divyansh Saraswat</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Link2Icon size={15} color={Colors.primaryColor} />
            <Text style={{fontFamily:'LufgaMedium', color:Colors.greyed, fontSize:14, letterSpacing:1}}>
              M10472545G2
            </Text>
          </View>
      </View>
      <View style={{flexDirection:"column",gap:20,paddingHorizontal:10}}>
      {arritems.map((res,idx)=>{
        return (
          <Pressable key={idx} onPress={()=>router.push('/test')}>
          <ListItem key={idx} icon={res.icons} name={res.name}/>
          </Pressable>
        )
      })}
      </View>
    </View>
  );
}

function ListItem({name,icon}:any){
  return(
    <View style={{flexDirection:"row",width:"100%",borderBottomWidth:0.5,borderColor:Colors.greyed,justifyContent:"space-between",alignItems:'center',paddingHorizontal:5}}>
    <View style={{flexDirection:"row",alignItems:"center",gap:10,paddingVertical:15}}>
{icon}
<Text style={{...styles.text,fontSize:15,color:name=='Logout'?'red':Colors.foreground}}>{name}</Text>
    </View>
    <ChevronRight color={Colors.foreground}  strokeWidth={1}/>
    </View>
  )
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
    fontFamily:'Lufga',
    fontSize:35,
    zIndex:3
  },
  Imagebg:{
    position:"absolute",
    bottom:20,
    right:-55,
    objectFit:"fill",
    zIndex:1
  }
});