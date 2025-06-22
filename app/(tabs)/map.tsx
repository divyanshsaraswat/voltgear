import { Colors } from '@/constants/Colors';
import { BoltIcon, Cable, Clock, CloudLightningIcon, DollarSign, FuelIcon, MapPin, Send, StarIcon, Zap } from 'lucide-react-native';
import Animated,{FadeIn,FadeOut, useAnimatedStyle, useSharedValue,withSpring,withTiming} from 'react-native-reanimated';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View,Text,Image,Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

export default function MapScreen() {
  const [selected,setselected] = useState(false);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const positionDrawer = useSharedValue<number>(0);
  const pressed = useSharedValue<boolean>(false);
  const [modal,setmodal] = useState(true);
  const animatedEntry = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(positionDrawer.value) }],
  }));
  const animatedStyleButton = useAnimatedStyle(() => ({
    transform: [{
      scale: withTiming(pressed.value ? 0.7 : 1, { duration: 300 })
    }]
  }));
  const router = useRouter();
  return (
    <Animated.View entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}  style={styles.container}>
      <MapView
      customMapStyle={DarkMapStyle}
      onPress={()=>positionDrawer.value=600}
        style={styles.map}
        initialRegion={{
          latitude: 26.959075,
          longitude: 75.743055,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: 28.6139, longitude: 75.743055 }} onPress={()=>setselected(!selected)}>
          <View style={{width:100,height:100,backgroundColor:Colors.primaryColor}}>
  <View style={{backgroundColor:Colors.primaryColor,borderRadius:30,width:30,height:30,alignItems:"center",justifyContent:"center",padding:5}} >
    <FuelIcon size={15}/>
    {selected && <Text>Selected</Text>}
  </View>
  </View>
</Marker>

      </MapView>

      <Animated.View style={[{position:"absolute",gap:25,bottom:0,borderTopLeftRadius:25,borderTopRightRadius:25,width:"100%",height:"auto",borderWidth:3,padding:15,paddingTop:35,paddingBottom:60,backgroundColor:Colors.darkColor},animatedEntry]}>
        <View style={{flexDirection:"row",gap:20}}>
          <View>
          <Image source={require('../../assets/images/charging.jpg')} style={{height:120,width:120,borderColor:"white",objectFit:"cover",borderRadius:15}}></Image>
          </View>
          <View style={{flexDirection:"column"}}>    
            
            <Text style={[styles.text, {fontSize:23,wordWrap:"nowrap",width:"100%"}]}>Sultan Limited Co.</Text>
            <View style={{width:"100%",flexDirection:"row",gap:10,alignItems:"center"}}>
              <StarIcon color="yellow" fill="yellow" size={20}/>
            <Text style={[styles.text, {fontSize:13,wordWrap:"nowrap",width:"100%",paddingVertical:8}]}>Sultan Limited Co.</Text>
            </View>
            <Text style={[styles.text, {fontSize:15,wordWrap:"nowrap",width:"100%",color:"orange"}]}>5.5 mile | 57 minute</Text>
            
          </View>
        </View>
        <View >
          <View style={{flexDirection:"row",borderBottomWidth:0.5,borderColor:Colors.greyed,paddingVertical:8,alignItems:"center",gap:5}}>
            <Zap color={Colors.foreground} size={15}/>
            <Text style={[styles.text,{color:Colors.foreground,fontSize:14,wordWrap:"nowrap",width:"100%"}]}>$20/kw</Text>
          </View>
          <View style={{flexDirection:"row",borderBottomWidth:0.5,borderColor:Colors.greyed,paddingVertical:8,alignItems:"center",gap:5}}>
            <Cable color={Colors.foreground} size={15}/>
            <Text style={[styles.text,{color:Colors.foreground,fontSize:14,wordWrap:"nowrap",width:"100%"}]}>3/10 Ports Available</Text>
          </View>
          <View style={{flexDirection:"row",borderBottomWidth:0.5,borderColor:Colors.greyed,paddingVertical:8,alignItems:"center",gap:5}}>
            <MapPin color={Colors.foreground} size={15}/>
            <Text style={[styles.text,{color:Colors.foreground,fontSize:14,wordWrap:"nowrap",width:"100%"}]}>Pubali Uttara Charge Station</Text>
          </View>
          <View style={{flexDirection:"row",borderBottomWidth:0.5,borderColor:Colors.greyed,paddingVertical:8,alignItems:"center",gap:5}}>
            <Clock color={Colors.foreground} size={15}/>
            <Text style={[styles.text,{color:Colors.foreground,fontSize:14,wordWrap:"nowrap",width:"100%"}]}>Open 24 Hours</Text>
          </View>
        </View>
        <AnimatedPressable 
                        style={[styles.button,{flexDirection:"row",gap:8,borderRadius:40,paddingVertical:25},animatedStyleButton]}
                        onPress={() => router.push('/map')}
                        onPressIn={()=>{pressed.value=true}}
                        onPressOut={()=>{pressed.value=false}}
                    >
                        <Send size={16}/>
                        <Text style={[styles.maintext,{color:Colors.darkColor}]}>Find a charge station</Text>
                    </AnimatedPressable>
      </Animated.View>
      {!modal && 
      <View style={[styles.modalparent,{width:"100%",height:"100%",position:"absolute",top:0,left:0}]}>

        <View style={{backgroundColor:Colors.greyed,width:"80%",borderRadius:30,justifyContent:"center",alignItems:"center",gap:5,padding:40}}>
        <Image source={require('../../assets/images/charging.jpg')} style={{height:120,width:120,borderColor:"white",objectFit:"cover",borderRadius:15}}></Image>
        <Text style={[styles.text,{fontSize:25}]}>Successful</Text>
        <Text style={[styles.text,{textAlign:"center",fontSize:12}]}>You are successfully reached in Sultan's station</Text>
        </View>
        </View>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lufga',
    color: '#fff',
    fontSize: 16,
    flexShrink: 1, // Allows text to shrink instead of overflow
    flexWrap: 'wrap' // Proper way to handle text wrapping in React Native
  },
  maintext: {
    fontFamily: 'Lufga',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkColor,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems:"center"
  }
});

const DarkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#212121' }]
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#212121' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: Colors.primaryColor }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: Colors.primaryColor }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#383838' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: Colors.primaryColor }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: Colors.primaryColor }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f2f2f' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: 'blue' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d3d3d' }]
  }
];

