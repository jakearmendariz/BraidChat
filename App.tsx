import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/Home'
import Settings from './components/Settings'
import NotificationPage from './components/NotificationPage'

import localStorage from 'react-native-sync-localstorage'

import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import registerForPushNotifications from './components/registerForPushNotifications'
import { Image } from 'react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={{uri:'./assests/images/BCicon.png'}}
//     />
//   );
// }

// function App() {
//   useEffect(() => {
//     registerForPushNotifications()
//     if(localStorage.getItem("notifications") == null){
//       localStorage.setItem("notifications", "true")
//     }
//   }, []);
//     return (

//       <NavigationContainer>
//         <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={Settings} />
//         <Tab.Screen name="Test" component={NotificationPage} />
//       </Tab.Navigator>
//       </NavigationContainer>
//     );
  
// }


const BottomTab = createBottomTabNavigator();

export default function Dashboard() {
  useEffect(() => {
    registerForPushNotifications()
    if(localStorage.getItem("notifications") == null){
      localStorage.setItem("notifications", "true")
    }
  }, []);
  return (
    <NavigationContainer>
    <BottomTab.Navigator initialRouteName="home">
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => <Entypo name="chat" color="#333" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Ionicons name="ios-settings" color="#333" size={24} />
          ),         
        }}
       
      />
      <BottomTab.Screen
        name="Send Notification"
        component={NotificationPage}
        options={{
          tabBarLabel: 'Send Notification',
          tabBarIcon: () => <MaterialCommunityIcons name="bullhorn" color="#333" size={24} />,
        }}
      />
    </BottomTab.Navigator>
    </NavigationContainer>
  );
}