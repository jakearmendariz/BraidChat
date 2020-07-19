//registerForPushNotifications.js
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Notif from 'expo-notifications'
import { Platform } from 'react-native';
import * as config from './config'


const PUSH_ENDPOINT =  "https://jelly-fern-skiff.glitch.me/delete";


const removePushNotifications = async () => {
    console.log("removing for push notifications")
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();


    if (Platform.OS === 'android') {
        Notif.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notif.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: token,
            }
        }),
    });
}
export default removePushNotifications;