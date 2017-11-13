let getLocalStorage = require("./getLocalStorage")
let setLocalStorage = require("./setLocalStorage")
let getSessionStorage = require("./getSessionStorage")
let buildMessageBoard = require("./buildMessageBoard")
const makeMessageEdit = require("./makeMessageEdit")
const getEditObject = require("./getEditObject")
let setEditObject = require("./setEditObject")
const addChatUserAsFriend = require("./addChatUserAsFriend")


const submitMessageEdit = function (event) {
    
    let currentUserObject = getSessionStorage()
    let textElement = document.getElementById("messageEditText")
    let textSubmission = textElement.value
    let storedDB = getLocalStorage()
    let messageEditDiv = event.target.parentElement
    let messageDiv = messageEditDiv.parentElement

    storedDB.messages.forEach(function (message) {
        let messageDivId = parseInt(messageDiv.id)
        if (messageDivId === message.messageId) {
            message.messageText = textSubmission
            setLocalStorage(storedDB)
            let editObject = getEditObject(messageDivId, textSubmission, currentUserObject.user.userName)
            setEditObject(editObject)
        }
    })


    messageEditDiv.innerHTML = ""

    while (messageDiv.querySelector("p")) {
        let childToRemove = messageDiv.querySelector("p")
        childToRemove.parentNode.removeChild(childToRemove)
    }



    storedDB.messages.forEach(function (message) { 
        let messageDivId = parseInt(messageDiv.id)
        if (messageDivId === message.messageId) {
            let updatedMessageDiv = document.createElement("div")
            updatedMessageDiv.classList.add("chatMessage")
            updatedMessageDiv.id = message.messageId
            let updatedMessageAuthor = document.createElement("p")
            updatedMessageAuthor.id ="messageTitle"
            updatedMessageAuthor.appendChild(document.createTextNode(currentUserObject.user.userName))
            let updatedMessageText = document.createElement("p")
            updatedMessageText.id = "messageText"
            updatedMessageText.appendChild(document.createTextNode(message.messageText))
            updatedMessageDiv.appendChild(updatedMessageAuthor)
            updatedMessageDiv.appendChild(updatedMessageText)
            messageDiv.insertBefore(updatedMessageDiv, messageDiv.firstChild)
            updatedMessageAuthor.addEventListener("click", addChatUserAsFriend)
        }
    })
    
}

module.exports = submitMessageEdit