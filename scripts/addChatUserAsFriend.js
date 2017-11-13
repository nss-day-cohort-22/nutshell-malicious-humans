let getLocalStorage = require("./getLocalStorage")
let friendObjFactory = require("./friendObjFactory")


const addChatUserAsFriend = function () {
    let targetParent = event.target.parentElement
    let targetId = parseInt(targetParent.id)
    let messageAuthorId = 0 
    let storedDB = getLocalStorage()
    storedDB.messages.forEach(function (message) {
        if (targetId === message.messageId) {
            messageAuthorId = message.authorId
        }
    })

    let userObj = {}
    storedDB.users.forEach(function (user) {
        if (user.userId === messageAuthorId) {
            userObj = user 
        }
    })

    friendObjFactory(userObj)

}

module.exports = addChatUserAsFriend