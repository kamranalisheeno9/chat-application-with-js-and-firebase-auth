
// log in with facebook

let login =() =>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        window.location.replace("chat-Panel.html")
        
        console.log(user)
   
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)

    });
}



let logout =() =>{
    firebase.auth().signOut()
        .then((result)=>{
            window.location.replace("index.html")

        })
    .catch((error)=>{

    })
}


let screen = document.getElementById("messageList");
let message = document.getElementById("messageInput");
let person = document.getElementById("person");
// let keyValue=5*chat-App;
// let key= Math.random(key)
let sendMessage = () => {
  if (person.innerHTML === "") {
    alert("Please Enter Name ");
    namePrompt = prompt("Enter Name");
    person.innerHTML = namePrompt;
    let database = {
      Name: namePrompt,
      Message: message.value,
      Key: firebase.database().ref("messages").push().key
    };
    firebase.database().ref("messages").child(database.Key).set(database);


    message.value = "";
  } else {
    let database = {
      Name: namePrompt,
      Message: message.value,
      Key: firebase.database().ref("messages").push().key
    };
    firebase.database().ref("messages").child(database.Key).set(database);

    message.value = "";
  }
};

firebase
  .database()
  .ref("messages")
  .on("child_added", (message) => {
    let newMessage = document.createElement("li");
    let newMessageText = document.createTextNode(
      `${message.val().Name}: ${message.val().Message}`
    );
    newMessage.appendChild(newMessageText);
    screen.appendChild(newMessage);
    if (message.val().Name === namePrompt) {
      newMessage.setAttribute("class", "sender2");
      let deleteMessage = document.createElement("button");
      let deleteName = document.createTextNode("Delete");
      deleteMessage.appendChild(deleteName);
      deleteMessage.setAttribute("class", "btn btn-danger dltbtn");
      deleteMessage.setAttribute("id", message.val().Key);
      deleteMessage.setAttribute("onclick", "dltMsg(this)");
      let linebreak = document.createElement("br");
      newMessage.appendChild(linebreak);
      newMessage.appendChild(deleteMessage);

    }
  });

  let dltMsg = (message) => {
    firebase.database().ref("messages").child(message.id).remove()
    message.parentNode.remove()
    console.log(message.id)
  };
  

  let clearChat = () => {
  firebase.database().ref("messages").remove();
  screen.innerHTML = "";
};





