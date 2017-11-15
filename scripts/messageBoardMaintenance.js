//Author : Garrett Ward
//Functionaity : listens to storage events and invokes a function that
//adds the most recent chat posts to the dom 

let getLocalStorage = require("./getLocalStorage")
const autoScroll = require("./autoScroll")
const addChatUserAsFriend = require("./addChatUserAsFriend")
const updateMessageBoardOnEdit = require("./updateMessageBoardOnEdit")

const messageBoardMaitenance = function () {

    window.addEventListener("storage", function (event) {
        //Jason F's function passing in the most recent storage event object
        updateMessageBoardOnEdit(event) 
        
        //capture the message arrays out of the storage event objects and parse them
        // into useable arrays
        let oldValueStr = event.oldValue
        let referenceMessageArray = JSON.parse(oldValueStr).messages

        let newValueStr = event.newValue
        let refreshedMessageArray = JSON.parse(newValueStr).messages
        
        //if the lenth of the new messages array is longer than the length
        //of the old messages array than anew messages has been added, and logic will
        //be performed
        if (refreshedMessageArray.length > referenceMessageArray.length) {
            //parse entire new db object from the storage event and store it in a variable
            let refreshedDB = JSON.parse(newValueStr)

            //create an empty variable to hold the message author
            let messageAuthor = ""
            //get the most recent message by splicing the last message in the array.
            let spliceResult = refreshedDB.messages.splice(-1)
            //store the object in the spliced array into a variable
            let message = spliceResult[0]
            
            //iterate through the users in the new database
            refreshedDB.users.forEach(function (user) {
                //check to see if the user id matches the author id of the most recent message
                if (user.userId === message.authorId) {
                    //store the username of the author in the previously declared 
                    //message author variable
                    messageAuthor = user.userName
                }
            })

            //capture the element to add the new messages to
            let addNewMessageMarker = document.getElementById("messageDisplaySection")

            //create virtual elements and append them to the dom.
            //these elements will compse the new message,
            //and is the same structure as in the writeMessages function
            let messageDiv = document.createElement("div")
            messageDiv.id = message.messageId
            messageDiv.classList.add("chatMessage")
            let messageTitleParagraph = document.createElement("p")
            messageTitleParagraph.id = "messageAuthor"
            messageTitleParagraph.appendChild(document.createTextNode(messageAuthor))
            let messageTextParagraph = document.createElement("p")
            messageTextParagraph.id = "messageText"
            messageTextParagraph.appendChild(document.createTextNode(message.messageText))
            let messageEditButton = document.createElement("button")
            messageEditButton.classList.add("editMessageButton", "hideIt")
            messageEditButton.appendChild(document.createTextNode("Edit Message"))
            let messageDeleteButton = document.createElement("button")
            messageDeleteButton.classList.add("deleteMessageButton", "hideIt")
            messageDeleteButton.appendChild(document.createTextNode("Delete Message"))
            messageDiv.appendChild(messageTitleParagraph)
            messageDiv.appendChild(messageTextParagraph)
            messageDiv.appendChild(messageEditButton)
            messageDiv.appendChild(messageDeleteButton)
            messageTitleParagraph.addEventListener("click", addChatUserAsFriend)

            addNewMessageMarker.appendChild(messageDiv)

            autoScroll(addNewMessageMarker)

        }
    })

}



module.exports = messageBoardMaitenance


