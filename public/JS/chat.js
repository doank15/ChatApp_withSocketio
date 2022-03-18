const socket = io();

//Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");

// const $sendLocation = document.querySelector("#send-location");
const $sendLocationButton = document.querySelector("#send-location");

//Rendering Message
const $messages = document.querySelector("#messages");
//template
const messageTemplate = document.querySelector("#message-template").innerHTML;
//Location Message
const messageTemplateLocation = document.querySelector(
  "#message-template-location"
  ).innerHTML;
  
  //Rendering List User
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  //New Message Element 
  const $newMessage = $messages.lastElementChild

  //Height of the new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

  //Visible height 
  const visibleHeight = $messages.offsetHeight

  //height of message container
  const containerHeight = $messages.scrollHeight

  //How far have i scrolled? 
  const scrollOfset = $messages.scrollTop + visibleHeight

  if(containerHeight - newMessageHeight <= scrollOfset) {
    $messages.scrollTop = $messages.scrollHeight
  }
}
//receive events from server
socket.on("mess", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment().calendar(),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});
//LocationMessage Challenge 2
socket.on("locationMessage", (message) => {
  console.log(message);
  let html = Mustache.render(messageTemplateLocation, {
    username: message.username,
    url: message.url,
    createdAt: moment().calendar(),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

//room Data
socket.on('roomData', ({room, users}) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  })
  document.querySelector('#sidebar').innerHTML = html
})  

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //disabled
  $messageFormButton.setAttribute("disabled", "disabled");

  const datafromUser = e.target.elements.message.value;
  socket.emit("sendMessage", { username, room }, datafromUser, (err) => {
    //enabled
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (err) {
      console.log(err);
    }
    console.log("Message was delivered");
  });
});


//Sharing your location to all users
$sendLocationButton.addEventListener("click", (position) => {
  // contain infomation you want to share
  $sendLocationButton.setAttribute("disabled", true);
  if (!navigator.geolocation) {
    return alert("Geolocation is not allow from your browser!!!");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    $sendLocationButton.removeAttribute("disabled");
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (err) => {
        if (err) {
          return console.log(err);
        }
        return console.log("Location shared");
      }
    );
  });
});

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href ='/'
  }
});
