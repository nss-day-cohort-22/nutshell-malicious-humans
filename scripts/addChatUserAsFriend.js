let getLocalStorage = require("./getLocalStorage")


const addChatUserAsFriend = function (event) {
    let targetParent = event.target.parentElement
    let targetId = parseInt(targetParent.id)

    let messageAuthorId = 0

    let storedDB = getLocalStorage()
    storedDB.messages.forEach(function (message) {
        if (targetId === message.messageId) {
            messageAuthorId = message.authorId
        }
    })

    


}