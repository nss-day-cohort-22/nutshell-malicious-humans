


let getSessionStorage = require("./getSessionStorage")


const messageAuthorCheck = function () {
    let messages = document.getElementsByClassName("chatMessage")
    let messagesArray = Array.from(messages)
    let currentUserObject = getSessionStorage()
    let currentUserName = currentUserObject.user.userName

    messagesArray.forEach(function (messageDiv) {
        

        let messageAuthor = messageDiv.children[0]

        
        if (messageAuthor.innerHTML === currentUserName) {
            let buttons = messageDiv.getElementsByTagName("button")
            let buttonsArray = Array.from(buttons)
            buttonsArray.forEach(function (button) {
                button.classList.remove("hideIt")
            })
        }

    })
    
}

module.exports = messageAuthorCheck