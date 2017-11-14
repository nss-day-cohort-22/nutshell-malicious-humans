let getLocalStorage = require("./getLocalStorage")
let friendObjFactory = require("./friendObjFactory")
let getSessionsStorage = require("./getSessionStorage")


const addChatUserAsFriend = function () {
    let targetParent = event.target.parentElement
    let targetId = parseInt(targetParent.id)
    let messageAuthorId = 0 
    let storedDB = getLocalStorage()
    let currentUserObject = getSessionsStorage()
    storedDB.messages.forEach(function (message) {
        if (targetId === message.messageId) {
            messageAuthorId = message.authorId
        }
    })

    
    if (messageAuthorId !== currentUserObject.user.userId) {
        if (document.getElementById("addFriendButton") === null) {
        
            let userObj = {}


            storedDB.users.forEach(function (user) {
                if (user.userId === messageAuthorId) {
                    userObj = user 
                }
            })

            let buttonKiller = function () {
                friendObjFactory(userObj)
                // if (document.getElementById("addUser")) {
                addFriendFormDiv.remove(document.getElementById("addUser"))
                // }
            }

            let addFriendFormDiv = document.createElement("div")
            addFriendFormDiv.id = "addUser"
            let addFriendButton = document.createElement("button")
            addFriendButton.id = "addFriendButton"
            let doNotAddFriendButton = document.createElement("button")
            doNotAddFriendButton.if = "doNotAddFriendButton"
            addFriendButton.appendChild(document.createTextNode("Add Friend"))
            doNotAddFriendButton.appendChild(document.createTextNode("Do Not Add Friend"))
            addFriendFormDiv.appendChild(addFriendButton)
            addFriendFormDiv.appendChild(doNotAddFriendButton)
            targetParent.appendChild(addFriendFormDiv)
            addFriendButton.addEventListener("click", buttonKiller)
            doNotAddFriendButton.addEventListener("click", function () {
                addFriendFormDiv.remove(addFriendFormDiv)
            })


        }
    }
}



module.exports = addChatUserAsFriend