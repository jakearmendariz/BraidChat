import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Button, View, Platform } from 'react-native';
// import localStorage from 'react-native-sync-localstorage'


function Header(){

    return (
        <View>
          <Text style={styles.text}>BraidChat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   
    text: {
      padding:15,
      paddingTop:60,
      fontSize: 20,
      backgroundColor:'white',
      fontWeight: "bold"
    },
    
});

  export default Header


