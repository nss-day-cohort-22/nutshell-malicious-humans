//Author : Garrett Ward
//Functionality : Stores the edited message into the database updates the Dom with the 
//edited message text

let getLocalStorage = require("./getLocalStorage")
let setLocalStorage = require("./setLocalStorage")
let getSessionStorage = require("./getSessionStorage")
let buildMessageBoard = require("./buildMessageBoard")
const makeMessageEdit = require("./makeMessageEdit")
const addChatUserAsFriend = require("./addChatUserAsFriend")


const submitMessageEdit = function (event) {
    //get the current user object out of session storage
    let currentUserObject = getSessionStorage()
    //get element containing message edit text
    let textElement = document.getElementById("messageEditText")
    //get the text out of the element 
    let textSubmission = textElement.value
    //capture the main database from local storage
    let storedDB = getLocalStorage()
    //capture the element of the message edit div
    let messageEditDiv = event.target.parentElement
    //capture the element of the message div
    let messageDiv = messageEditDiv.parentElement

    //iterate through each message in the messages array in the main database
    storedDB.messages.forEach(function (message) {
        //parsethe id of the message div and store it in a variable
        let messageDivId = parseInt(messageDiv.id)
        //if the current message id matches the id of the message div id
        if (messageDivId === message.messageId) {
            //set the text edit submission as the new value of the
            //current message in local storage
            message.messageText = textSubmission
            setLocalStorage(storedDB)
        }
    })

    //clear the message dit div so makeMessageEdit can run correctly if invoked after this function
    messageEditDiv.innerHTML = ""
    

    //use a while statement to eliminate p elements from the message div while they exist.
    //this is done to avoid deleting the buttons
    while (messageDiv.querySelector("p")) {
        let childToRemove = messageDiv.querySelector("p")
        childToRemove.parentNode.removeChild(childToRemove)
    }


    //iterate through each message in the messages array in the main database
    storedDB.messages.forEach(function (message) { 
        //parse the id of the message div and capture it in a variable
        let messageDivId = parseInt(messageDiv.id)
        //check to see if the message div id matches the current message in the main database
        if (messageDivId === message.messageId) {
            //create virtual elements to build to updated
            //chat message info and append them to the proper
            //element in the dom
            let updatedMessageDiv = document.createElement("div")
            updatedMessageDiv.id = message.messageId
            let updatedMessageAuthor = document.createElement("p")
            updatedMessageAuthor.id ="messageTitle"
            updatedMessageAuthor.appendChild(document.createTextNode(currentUserObject.user.userName))
            let updatedMessageText = document.createElement("p")
            updatedMessageText.id = "messageText"
            updatedMessageText.appendChild(document.createTextNode(message.messageText))
            updatedMessageDiv.appendChild(updatedMessageAuthor)
            updatedMessageDiv.appendChild(updatedMessageText)
            //use insertBefore to make sure the updted info is appened before the buttons
            messageDiv.insertBefore(updatedMessageDiv, messageDiv.firstChild)
            updatedMessageAuthor.addEventListener("click", addChatUserAsFriend)
        }
    })
    
}

module.exports = submitMessageEdit