//Running on https://jelly-fern-skiff.glitch.me/
const { Expo } = require("expo-server-sdk");
let expo = new Expo();

const express = require('express')
const app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors())

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

let savedUsers = {}
let savedPushTokens = []
let deviceNames = [] //Parallel array: keeps track of user's names that were saved, we won't send users notifications from themselves
let lastSent = {}
const saveToken = token => {
    console.log(token.value, savedPushTokens);
    const exists = savedPushTokens.find(t => t === token.value);
    if (!exists) {
        console.log("new device saved for push notifications")
        savedPushTokens.push(token.value);
        deviceNames.push(token.name);
    }else{
      console.log("Device was already saved")
      deviceNames[savedPushTokens.indexOf(token.value)] = token.name
    }
};

const deleteToken = token => {
  savedPushTokens =  savedPushTokens.filter(function(ele){ return ele != token; })
}


app.get('/', (req, res) => res.send('Braid Chat Notification Server'))

app.post("/token", (req, res) => {
    saveToken(req.body.token);
    console.log(`Received push token, ${req.body.token.value}`);
    res.send(`Received push token, ${req.body.token.value}`);
});

app.post("/delete", (req, res) => {
    deleteToken(req.body.token.value);
    console.log(`Deleted push token, ${req.body.token.value}`);
    res.send(`Deleted push token, ${req.body.token.value}`);
});

app.post("/message", (req, res) => {
    sendPushNotifications(req.body.message['user'], req.body.message['text'])
    console.log(JSON.stringify(req.body.message) + 'Sending message from ' + JSON.stringify(req.body.message['user']) + "to" + JSON.stringify(req.body.message['text']))
    res.send('Sending message');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

Object.fromEntries = (array) => {
  var result = {}
  array.forEach(x => result[x[0]] = result[x[1]])
  return result
}

const node = require("braidjs")()
node.websocket_client({url:'wss://invisible.college:3009'})
node.get('/usr', addUsers)
node.get('/chat', update_messages)
let count = 0
let messages = []
function update_messages(newVal){
    let message = newVal[newVal.length -1]
    console.log(JSON.stringify(message))
    console.log(message['body'])
    if(lastSent != message['body']){
      let name = savedUsers[message['user']]
      if(name == undefined){
        name = "unknown"
      }else{
        name = name['displayname']
      }
      sendPushNotifications(name, message['body'])
      lastSent = message['body']
      console.log("Sent message")
    }else{
      console.log("Didn't send push notification:" +  message['body'])
    }
}


function addUsers(userDict){
  savedUsers = JSON.parse(JSON.stringify(userDict)); //new json object here
  console.log("add users" + JSON.stringify(savedUsers))
}

const sendPushNotifications = ( user, message ) => {
    if(message == undefined){
      console.log("message is undefined")
      return
    }
    console.log("Sending push notification from " + " with body \"" + message + "\" subject \"" + user + "\" to "  +savedPushTokens.length + " devices") 
    let notifications = [];
    let index = -1;
    for (let pushToken of savedPushTokens) {
      console.log("sending to device:" + pushToken)
      index ++;
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      console.log("deviceNames: " + deviceNames[index])
      if(user != deviceNames[index]){
        notifications.push({
            to: pushToken,
            sound: "default",
            title: user,
            body: message,
            data: { message }
        });
    }
    }
    sendNotifications(notifications)
  
   
};


const sendNotifications = (notifications) => {
  if(notifications.length == 0){
    console.log("no devices linked")
  }else{
     console.log("sending notifications:" + JSON.stringify(notifications[0]))
     let chunks = expo.chunkPushNotifications(notifications);
  
    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.log("Fuck, theres an error with sendPushNotificationsAsync");
          console.error(error);
        }
      }
    })();
  }
}