import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home'
import registerForPushNotifications from './components/registerForPushNotifications'

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotifications()
  }, []);
    return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  
}
