//Author : Garrett Ward
//Functionality : Print the message history to the dom

let getLocalStorage = require("./getLocalStorage")
const messageAuthorCheck = require("./messageAuthorCheck")
const deleteMessage = require("./deleteMessage")
const makeMessageEdit = require("./makeMessageEdit")
const autoScroll = require("./autoScroll")
const addChatUserAsFriend = require("./addChatUserAsFriend")



const writeMessages = function () {
    //capture element to append messages to
    let messageInjectionMarker = document.getElementById("messageDisplaySection")
    //capture current database in a variable
    let mainDB = getLocalStorage()
    //clear message area html
    messageInjectionMarker.innerHTML = ""

    //iterate through each message in the main database
    mainDB.messages.forEach(function (message) {
        //for each message, declare an empty variable to capture the current author
        //we will use this to print the username with the corresponding message to the DOM
        let currentAuthor = ""
        //iterate through each user in the main database
        mainDB.users.forEach(function (user) {
            //if the user id and the author id match
            if (user.userId === message.authorId) {
                //assign the username to current author. 
                currentAuthor = user.userName
            }
        })

        //create virtual elements and append them to the dom.
        //Pass in the correct data for each message.
        //line 38-56 represent one message
        let messageDiv = document.createElement("div")
        messageDiv.id = message.messageId
        messageDiv.classList.add("chatMessage")
        let messageTitleParagraph = document.createElement("p")
        messageTitleParagraph.id = "messageAuthor"
        messageTitleParagraph.appendChild(document.createTextNode(currentAuthor))
        let messageTextParagraph = document.createElement("p")
        messageTextParagraph.id = "messageText"
        messageTextParagraph.appendChild(document.createTextNode(message.messageText))
        let messageEditButton = document.createElement("button")
        messageEditButton.classList.add("editMessageButton", "hideIt", "btn", "btn-secondary")
        messageEditButton.appendChild(document.createTextNode("Edit Message"))
        let messageDeleteButton = document.createElement("button")
        messageDeleteButton.classList.add("deleteMessageButton", "hideIt", "btn", "btn-secondary")
        messageDeleteButton.appendChild(document.createTextNode("Delete Message"))
        messageDiv.appendChild(messageTitleParagraph)
        messageDiv.appendChild(messageTextParagraph)
        messageDiv.appendChild(messageEditButton)
        messageDiv.appendChild(messageDeleteButton)
        //append entire message to message div
        messageInjectionMarker.appendChild(messageDiv)
        //add event listener to invoke function to add chat user as a friend.
        messageTitleParagraph.addEventListener("click", addChatUserAsFriend)
    })
    //get a list of each type of button
    let editButtons = document.getElementsByClassName("editMessageButton")
    let deleteButtons = document.getElementsByClassName("deleteMessageButton")

    //turn those lists into arrays
    let editButtonsArray = Array.from(editButtons)
    let deleteButtonsArray = Array.from(deleteButtons)
    
    //use a for each to add an event listener to each button
    //the functions on these event listeners allow users
    //to either edit or delete their chat messages
    editButtonsArray.forEach(function (element) {
        element.addEventListener("click", makeMessageEdit)
    })
    deleteButtonsArray.forEach(function (element) {
        element.addEventListener("click", deleteMessage)
    })

    //perform message author check to make sure edit/delete buttons
    //only display on current user's messages
    messageAuthorCheck()
    autoScroll(messageInjectionMarker)
    
}

module.exports = writeMessages