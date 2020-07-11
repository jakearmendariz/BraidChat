import React, { useState, useEffect, Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Button, View, Platform, Switch } from 'react-native';
// import localStorage from 'react-native-sync-localstorage'
import Constants from 'expo-constants'
import localStorage from 'react-native-sync-localstorage'

import registerForPushNotifications from './registerForPushNotifications'
import removePushNotifications from './removePushNotifications'
import Header from './Header'



import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


function Settings(){
    var set = true
    var on = true;
    if(localStorage.getItem('notifications') != null){
        console.log("Notifications are " + localStorage.getItem('notifications'))
        set = JSON.parse(localStorage.getItem('notifications'))
        on = set
    }else{
        console.log("local settings not found, notifications are on")
    }
    const [isEnabled, setIsEnabled] = useState(set);
    const toggleSwitch = () => {
        console.log("About to toggle, current state:", isEnabled.toString())
        setIsEnabled(previousState => !previousState);
        on = !on
        localStorage.setItem("notifications", on.toString())
        console.log("Notifications toggled to " + on.toString())
        if(on){
            registerForPushNotifications()
        }else {
            removePushNotifications()
        }
    }
   

    return (
        <View>
        <Header />
        <View style={styles.Screen}>
          <Text style={styles.text}>Toggle notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={on}
        />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Screen: {
        textAlign:'center',
        flex: 1,
        // backgroundColor: '#323333',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:200
    },
    text: {
      fontSize: 20,
    },
});

export default Settings



