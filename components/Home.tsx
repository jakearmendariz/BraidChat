import React, { useState, useEffect, Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Button, View, Platform } from 'react-native';
// import localStorage from 'react-native-sync-localstorage'
import Constants from 'expo-constants'
import registerForPushNotifications from './registerForPushNotifications'
import { WebView } from 'react-native-webview';



import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


function HomeScreen(){

    return (
        <View style={{overflow:'hidden', height:600, width: 400 }}>
          <WebView
          source={{ uri: 'https://invisible.college/chat/' }}
          style={{marginBottom:100  }}
          />
          <Button 
            title="basic notification"
            // style={styles.webviewButton}
            onPress= {() =>  
                fetch("https://jelly-fern-skiff.glitch.me/message", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: {
                            user: 'Jake',
                            text:'Hello World'
                        }
                    }),
                })
            }
          />
        </View>
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


