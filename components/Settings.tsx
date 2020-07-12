import React, { useState, useEffect, Component } from 'react';
import { Image, StyleSheet, Text,TextInput,  TouchableOpacity, Button, View, Platform, Switch } from 'react-native';
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
    const [text, setText] = useState(' ');

    const onChangeText = (textValue) => { setText(textValue); localStorage.setItem('name', textValue)}
   
    let value = localStorage.getItem('name')
    return (
        <View>
            <Header value="Settings"/>
            <View style={styles.Screen}>
                <Text style={styles.text}>Name</Text>
                    <View style={{flexDirection:"row", justifyContent: 'space-between'}}>
                    <TextInput  placeholder = "Your Name" onChangeText={onChangeText} value={value} style={styles.input}></TextInput>
                    <TouchableOpacity 
                    style={{padding:10,backgroundColor:'#0d4771',borderRadius:10, height:40,marginTop:10,paddingLeft:20, paddingRight:20}}
                    onPress={() => registerForPushNotifications()}>
                        <Text style={{color:"white", fontSize:16}}>Save</Text>
                    </TouchableOpacity>
                </View >
                        <View style={{flexDirection:"row", justifyContent: 'space-between'}}>
                            <Text style={styles.text}>Toggle notifications</Text>
                            <View style={{flexDirection:"row",justifyContent: 'flex-end',alignSelf: 'flex-end'}}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#0d4771" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={on}
                                style={{justifyContent: 'flex-end',alignSelf: 'flex-end'}}
                            />
                            </View>
                        </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Screen: {
        // alignItems: 'center',
        // justifyContent: 'center',
        margin:20,
        // marginTop:0
    },
    text: {
      fontSize: 18,
    //   textAlign:'left',
      color:'#550'
    },
    input: {
        height:40,
        padding:8,
        fontSize:16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'white',
        width:200,
        borderRadius:10,
        overflow:"hidden",
        color:'black'
    }
});

export default Settings



