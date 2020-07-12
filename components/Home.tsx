import React, { useState, useEffect, Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Button, View, Platform,KeyboardAvoidingView } from 'react-native';
// import localStorage from 'react-native-sync-localstorage'
import Constants from 'expo-constants'
import registerForPushNotifications from './registerForPushNotifications'
import { WebView } from 'react-native-webview';


import Header from './Header'

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


function HomeScreen({navigation}){

    return (
        
        // <View style={{overflow:'hidden', height:750, width: 400 }}>
            // 
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: "position", android: null })}
                enabled
                contentContainerStyle={{ flex: 1 }}
                // keyboardVerticalOffset={Platform.select({ ios: 20, android: 20 })}
                style={{ flexGrow: 1 }}
            >
                <Header />
          <WebView
          source={{ uri: 'https://invisible.college/chat/' }}
          style={{marginBottom:0  }}
          />
          </KeyboardAvoidingView>
        // </View>
    );
}

const styles = StyleSheet.create({
    Test: {
      textAlign:"center",
      padding:100,
    },
    text: {
      fontSize: 40,
    },
    webviewButton: {
        marginTop: 30,
        backgroundColor: 'gray', 
        padding:10, 
        borderRadius:10,
    }  
});

  export default HomeScreen


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


