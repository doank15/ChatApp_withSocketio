# Goal 1
## Create an Express server 
## Set up a new Express server
+ Server up the public directory 
+ Listen on Port 3000
## Create index.html and render chatApp to the screen


# Goal 2 Set up package.json
## Install nodemon to start server anytime when have changed
## Create start on package.json to run app
## Create 'dev' script to start the app using nodemon
## Run both scripts to test your works


# Websocket and socket.io 
+ Unlike HTTPS protocol, websocket allows for transfer data in both directory (client to server and opposite)
+ Socket.io is a lib of JS that works similarly to Websocket. Each connection know as socket, consists of two parts
+ Data transfer from socket.io is mostly done in the form of a JSON. So we will be using Json format for this article


# Socket.io events challenge 
# Goal : Send a welcome message to new users
+ 1: Have server emit "message" when new client connects
    - Send "welcome" as the data
+ 2: Have client listent for message event and print to console
+ 3: Test

# Allow client send message
+ Creat an input form and button


# Broadcast socketio
# Sharing your location Using Geolocation API 
+ Get latitude and longitude 


# VIDEO 9 acknowledgements 
+ Some use case you want a more classic req and res API. In socketio called this feature is acknowledgements
+ You can add callback as the last arg of the emit('eventName', arg1, {arg2 : can be object}, (callback) => {
    //do something 
})

# Video 10 form and button 
## Goal: Disable to send the location button while location being sent
1 : Set up a selector at the top of file
2 : Disable the button just before getting the current position
3 : Enable the button in the Acknowledge callback
4 : Test your work

# Vid 11 : Rendering Message 
+ Use 3 script related to render message to HTML

# Vid 12: Render messages Location
## Challenge 1
### Goal: Create a separate event for location starting messages
1 : Have server emit 'locationMessage' with the URL
2 : Have the client listen for 'localtionMessage' URL to the console
3 : Test your work by sharing a location 

## Challenge 2
### Goal: Render new template for location message
1 : Duplicate the message template
    - Change ID to something else
2 : Add link inside the paragraph  with the link text 'My current location'
    - URL for link should be maps URL (dynamic)
3 : Select the template from JS
4 : Render the template with URL and append to message list
5 : Test your work

# Vid 13 : Working with Time 
+ Using moment.js to display time 
+ Create A module generateMessage in utils with file messages.js 

# Vid 14: Working with Time for Location 
## Goal : Add timestamps for location messages
1: Creat generateLocationMessage and export
    - {url: '', createdAt: 0}
2: Use generateLocationMessage when server emits locationMessage
3: Update template to render time before the url 
4: Compile the template with the URL and the formatted time
5: Test


# Vid 15 + 16 => Design Style chat room and create page enter name and room before join room 
# Vid 17: Socket.io Rooms 
# Vid 18: Create a new file users.js in utils folder (Storing User in socket.io) 
+ Inside that, create some new function addUser, removeUser, getUser, getUserInRoom
# Vid 19: Storing User part II
+ Challenge: Goal Create two new functions for users
+ 1: Create getUser
    - Accept Id and return user object (or undefinded)
+ 2: Create getUserInroom
    - Accept room name and return array of users (or empty array)
+ 3: Test your work 

# Vid 20 : Tracking users joining and leaving
+ Create User and Remove User when connect and disconnect 

# Vid 21: Sending Message to Rooms
Challenge: Send messages to correct room
1 : User getUser inside "sendMessage" event handler to get user data
2 : Emit the message to their current room
3 : Test your work!
4 : Repeat for sendLocation 

# Vid22: Display username and render it to client
+ Setup autocomplete = off to avoid send empty messages
