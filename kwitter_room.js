
  var firebaseConfig = {
    apiKey: "AIzaSyDadjtR9kww_Rg_hvF7C6q4RyeEIPVHsYo",
    authDomain: "let-s-chat-web-app-91d76.firebaseapp.com",
    databaseURL: "https://let-s-chat-web-app-91d76-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-web-app-91d76",
    storageBucket: "let-s-chat-web-app-91d76.appspot.com",
    messagingSenderId: "610021670110",
    appId: "1:610021670110:web:3e16c4ff4296ec34bfd64f",
    measurementId: "G-RHBJEV5C75"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: user_name, 
          message: msg,
          like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id = "+Room_names+" onclick = 'redirectToRoomName(this.id)' >#"+ Room_names + "</div><hr>"; 
      document.getElementById("output").innerHTML += row;
    });
  });
}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
      window.location = "kwitter.html";
}
function updateLike(message_id)
{
    console.log("clicked on like button-" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like: update_likes
    });

}