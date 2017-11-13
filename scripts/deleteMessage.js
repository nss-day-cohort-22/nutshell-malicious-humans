let getLocalStorage = require("./getLocalStorage")
let setLocalStorage = require("./setLocalStorage")

const deleteMessage = function (event) {
    let messageToDelete = event.target.parentElement
    let storedDB = getLocalStorage()
    let targetId = parseInt(messageToDelete.id) 
    let indexOfMessageToDelete = storedDB.messages.findIndex(function (message) {
        return message.messageId === targetId
    })
    storedDB.messages.splice(indexOfMessageToDelete, 1)
    setLocalStorage(storedDB)
    while (messageToDelete.firstChild) {
        messageToDelete.removeChild(messageToDelete.firstChild)
    }

}


module.exports = deleteMessage 