const messagesDB = require("./messages")
const idGenerator = require("./idGenerator")
let getSessionStorage = require("./getSessionStorage")
let getLocalStorage = require("./getLocalStorage")
let setLocalStorage = require("./setLocalStorage")
const writeMessages = require("./writeMessages")

const storeMessage = function () {
    let messageLocation = document.getElementById("messageTextArea")
    let currentMessage = messageLocation.value
    let mainDB = getLocalStorage()
    
    let messageAuthorObject = getSessionStorage()
    let messageAuthorId = messageAuthorObject.user.userId
    
    // make an array of message ids in database and then check to see if any of them match the proposed unique id for the message object
    // if matches an id, increase its value by one until it no longer matches any unique id's

    let idArray = []
    mainDB.messages.forEach(function (message) {
        idArray.push(message.messageId)
    })
     
    let lastId = mainDB.messages[mainDB.messages.length - 1] || {messageId: 0}

    idArray.forEach(function (id) {
        if (id === lastId.messageId + 1) {
            lastId.messageId += 2
        }
    })

    let messageIdFactory = idGenerator(lastId.messageId)
    
    
    let newMessage = Object.create(null, { 
        "messageText": {
            "value": currentMessage,
            "enumerable": true,
            "writable": true
        },
        "authorId":{ 
            "value": messageAuthorId,
            "enumerable": true
        },
        "messageId":{
            "value": messageIdFactory.next().value,
            "enumerable": true
        }
        
    })
    
    
    mainDB.messages.push(newMessage)
    setLocalStorage(mainDB)
    writeMessages()
}

module.exports = storeMessage