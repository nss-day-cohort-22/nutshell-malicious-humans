let getLocalStorage = require("./getLocalStorage")
const messageAuthorCheck = require("./messageAuthorCheck")
const deleteMessage = require("./deleteMessage")
const makeMessageEdit = require("./makeMessageEdit")
const autoScroll = require("./autoScroll")
const addChatUserAsFriend = require("./addChatUserAsFriend")



const writeMessages = function () {

    let messageInjectionMarker = document.getElementById("messageDisplaySection")
    let mainDB = getLocalStorage()
    messageInjectionMarker.innerHTML = ""

    mainDB.messages.forEach(function (message) {
        let currentAuthor = ""
        mainDB.users.forEach(function (user) {
            if (user.userId === message.authorId) {
                currentAuthor = user.userName
            }
        })

        let messageDiv = document.createElement("div")
        messageDiv.id = message.messageId
        let messageTitleParagraph = document.createElement("p")
        messageTitleParagraph.id = "messageAuthor"
        messageTitleParagraph.appendChild(document.createTextNode(currentAuthor))
        let messageTextParagraph = document.createElement("p")
        messageTextParagraph.id = "messageText"
        messageTextParagraph.appendChild(document.createTextNode(message.messageText))
        messageTextParagraph.addEventListener("click", addChatUserAsFriend)
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

        messageInjectionMarker.appendChild(messageDiv)



        // messageInjectionMarker.innerHTML += `
        // <div id="${message.messageId}" class="chatMessage">
        //     <p id="messageTitle">${currentAuthor}</p>
        //     <p id="messageText">${message.messageText}</p>
        //     <button class="editMessageButton hideIt">Edit Message</button>
        //     <button class="deleteMessageButton hideIt">Delete Message</button>
        // </div>
        // `
    })
    
    let editButtons = document.getElementsByClassName("editMessageButton")
    let deleteButtons = document.getElementsByClassName("deleteMessageButton")

    let editButtonsArray = Array.from(editButtons)
    let deleteButtonsArray = Array.from(deleteButtons)
    
    editButtonsArray.forEach(function (element) {
        element.addEventListener("click", makeMessageEdit)
    })
    deleteButtonsArray.forEach(function (element) {
        element.addEventListener("click", deleteMessage)
    })
    messageAuthorCheck()
    autoScroll(messageInjectionMarker)
}

module.exports = writeMessages