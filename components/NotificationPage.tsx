import React, {useState} from 'react';
import { Image, TextInput, StyleSheet, Text, TouchableOpacity, Button, View, Platform } from 'react-native';
import Header from './Header'
import localStorage from 'react-native-sync-localstorage'
import registerForPushNotifications from './components/registerForPushNotifications'
import * as config from './config'

const message_url = "https://jelly-fern-skiff.glitch.me/message"

export default function NotificationPage() {
    const [text, setText] = useState(' ');

    const onChangeText = (textValue) => setText(textValue);

    const [subject, setSubject] = useState(' ');

    const onChangeSubject = (subjectValue) => setSubject(subjectValue);
    return (
    
      <View >
        <Header value = "Echo"/>
        <View  style={{  alignItems: 'center', justifyContent: 'center', marginTop:200 }}>
            <Text style={{fontSize:17, fontWeight: "bold"}}>Send a notification to everyone with the app</Text>
            <TextInput style={styles.input} placeholder = "Subject" onChangeText={onChangeSubject}/>
            <TextInput style={styles.input} placeholder = "Message"  onChangeText={onChangeText}/>
             <TouchableOpacity 
                style={{padding:10,backgroundColor:'#0d4771',borderRadius:10}}
                onPress= {() =>  {
                    console.log(message_url)
                    fetch(message_url, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: {
                                user: subject,
                                text:text
                            }
                        }),
                    })
                }
                }
            ><Text style={{color:"white"}}>Send Notification</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
const styles = StyleSheet.create({
    input: {
        height:40,
        padding:8,
        fontSize:16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'white',
        width:300,
        borderRadius:10,
        overflow:"hidden",
        color:'black'
    }
})