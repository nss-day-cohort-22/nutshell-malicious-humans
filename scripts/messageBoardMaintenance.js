let getLocalStorage = require("./getLocalStorage")
const autoScroll = require("./autoScroll")
const addChatUserAsFriend = require("./addChatUserAsFriend")
const updateMessageBoardOnEdit = require("./updateMessageBoardOnEdit")

const messageBoardMaitenance = function () {



    window.addEventListener("storage", function (event) {
        updateMessageBoardOnEdit(event) 
        
        let oldValueStr = event.oldValue
        let referenceMessageArray = JSON.parse(oldValueStr).messages

        let newValueStr = event.newValue
        let refreshedMessageArray = JSON.parse(newValueStr).messages
        

        if (refreshedMessageArray.length > referenceMessageArray.length) {
            
            let refreshedDB = JSON.parse(newValueStr)

            let messageAuthor = ""
            let spliceResult = refreshedDB.messages.splice(-1)
            let message = spliceResult[0]
            

            refreshedDB.users.forEach(function (user) {
                if (user.userId === message.authorId) {
                    messageAuthor = user.userName
                }
            })

            let addNewMessageMarker = document.getElementById("messageDisplaySection")

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


