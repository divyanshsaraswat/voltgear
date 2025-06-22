import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabLayout from './(tabs)/_layout';
import Profile from './profile';
import Features from './features';
import TestGesture from './test';
import Battery from './battery';
import Charging from './charging';
import Vehicle from './vehicle';
import Login from './login';
// import ProfileScreen from '../screens/ProfileScreen'; // Non-tab screen

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack.Navigator screenOptions={{
          headerTransparent: true,
          animation:"slide_from_right",
          headerStyle: {
            position: 'absolute',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            },
            headerBackButtonDisplayMode:"minimal",
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontFamily: 'Lufga',
            backgroundColor: 'transparent',
            color: Colors.foreground,
            },
            headerTintColor:Colors.foreground,
    }}>
      {/* Main app with tabs */}
      <Stack.Screen 
      name="TabsNavigator" 
      component={TabLayout} 
      options={{ headerShown: false }} 
      />

      {/* Non-tab screens */}
      <Stack.Screen 
      name="UserProfile" 
      component={Profile} 
      options={{ title: 'Profile' }}
      />
      <Stack.Screen 
      name="features" 
      component={Features}
      options={{ title: 'Special Features' }}
      />
      <Stack.Screen 
      name="battery" 
      component={Battery}
      options={{ title: 'Battery' }}
      />
      <Stack.Screen 
      name="charging" 
      component={Charging}
      options={{ title: 'Charging' }}
      />
      <Stack.Screen 
      name="vehicle" 
      component={Vehicle}
      options={{ title: 'My Vehicles' }}
      />
      <Stack.Screen 
      name="test" 
      component={TestGesture}
      options={{ title: 'Test' }}
      />
     

    </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
