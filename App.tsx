import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/Home'
import Settings from './components/Settings'
import NotificationPage from './components/NotificationPage'

import localStorage from 'react-native-sync-localstorage'
import Constants from 'expo-constants';

import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import registerForPushNotifications from './components/registerForPushNotifications'
import { Image } from 'react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const BottomTab = createBottomTabNavigator();

async function printUserString(){
  let user_string =  await Constants.getWebViewUserAgentAsync()
  console.log("user_string: " + user_string)
}

export default function Dashboard() {
  printUserString()
  useEffect(() => {
    registerForPushNotifications()
    if(localStorage.getItem("notifications") == undefined){
      console.log("app.tsx: no localstorage notifications found. Setting to true")
      localStorage.setItem("notifications", "true")
    }else{
      console.log("app.tsx: localstorage:notifications:" + localStorage.getItem("notifications"))
    }
  }, []);
  return(
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