//Author : Garrett Ward
//Functionality : Displays edit/delete buttons on current active users messages

let getSessionStorage = require("./getSessionStorage")


const messageAuthorCheck = function () {
    //get a list of chat message elements
    let messages = document.getElementsByClassName("chatMessage")
    //make an array out of those elements
    let messagesArray = Array.from(messages)
    //capture the current user object
    let currentUserObject = getSessionStorage()
    //capture the current user's username
    let currentUserName = currentUserObject.user.userName
    //iterate through each chat message element
    messagesArray.forEach(function (messageDiv) {
        //capture the element of the message author by selecting the first child of the
        //current message div passed in by the for each
        let messageAuthor = messageDiv.children[0]

        //check to see if the html of message author element matches the current user's username
        if (messageAuthor.innerHTML === currentUserName) {
            //get a list of all buttons from the message div
            let buttons = messageDiv.getElementsByTagName("button")
            //make them into an array
            let buttonsArray = Array.from(buttons)
            //use a for each to hide each of those buttons
            buttonsArray.forEach(function (button) {
                button.classList.remove("hideIt")
            })
        }

    })
    
}

module.exports = messageAuthorCheck