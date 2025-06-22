import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import MapScreen from './map';
import Index from '../index';
import Settings from './settings';
import Dashboard from './dashboard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import { Tabs } from 'expo-router';
import { Dimensions,View } from 'react-native';
import { CarIcon, HomeIcon,Map,MenuIcon,Settings2, User2Icon } from 'lucide-react-native';
const Tab = createBottomTabNavigator();
export default function TabLayout() {
    const { width: screenWidth } = Dimensions.get('window');
    const TAB_BAR_WIDTH = 300;

    return (
        <Tab.Navigator screenOptions={({route})=>({

            tabBarStyle: {
                position:"absolute",
                bottom: 50,
                width: TAB_BAR_WIDTH,
                marginLeft: (screenWidth - TAB_BAR_WIDTH) / 2, 
                backgroundColor: 'rgba(40, 40, 40, 0.67)',
                justifyContent:"center",
                flexDirection:"row",   
                alignContent:"center",
                borderRadius: 50,
                height: 70,
                paddingBottom: 10,
                paddingTop: 15,
                borderTopWidth: 0,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 10,
            },
           tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginHorizontal: 4,
                padding:0,
            },
            unmountOnBlur:true,
            tabBarShowLabel:false,
            tabBarIconStyle:{
            justifyContent: 'center',
            alignItems: 'center',
            },
            tabBarActiveTintColor: Colors.primaryColor,               // Optional: active icon/text color
            tabBarInactiveTintColor: '#888', // Optional: inactive icon/text color
            tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'index':
              return <CarIcon color={color} size={size}/>;
            case 'home':
              return <HomeIcon color={color} size={size} />;
            case 'dashboard':
              return <MenuIcon color={color} size={size} />;
            case 'navigate':
              return <Map color={color} size={size} />;
            case 'settings':
              return <Settings2 color={color} size={size} />;
            default:
              return null;
          }
        },
            headerTransparent: true,
            headerStyle: {
            position: 'absolute',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontFamily: 'Lufga',
            backgroundColor: 'transparent',
            color: Colors.foreground,
            },
            headerTintColor: Colors.foreground,
        })}>
            <Tab.Screen
            name="index"
            component={Index}
            options={{
            title: 'Index',
            
            headerShown: false,
            tabBarStyle:{display:"none"}
            }}
            />
            <Tab.Screen
            name="home"
            component={Home}
            options={{
            title: 'Home',
            
            headerShown: false
            }}
            />
           
            <Tab.Screen
            name="navigate"
            component={MapScreen}
            options={{
            title: 'Navigate',
            }}
            />
            <Tab.Screen
            name="settings"
            component={Settings}
            options={{
            title: 'Settings',
            }}
            />
        </Tab.Navigator>
    );
}
