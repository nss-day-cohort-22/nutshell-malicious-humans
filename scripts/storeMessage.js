//Author : Garrett Ward
//Functionality : Stores each new message inputed by user into local storage.

const messagesDB = require("./messages")
const idGenerator = require("./idGenerator")
let getSessionStorage = require("./getSessionStorage")
let getLocalStorage = require("./getLocalStorage")
let setLocalStorage = require("./setLocalStorage")
const writeMessages = require("./writeMessages")

const storeMessage = function () {
    //get element of user text entry
    let messageLocation = document.getElementById("messageTextArea")
    //capture the value of the text entry into a variable
    let currentMessage = messageLocation.value
    //capture the main database from local storage
    let mainDB = getLocalStorage()
    

    //capture the current user object
    let messageAuthorObject = getSessionStorage()
    //cpature the user id and store it as the message author id
    let messageAuthorId = messageAuthorObject.user.userId
    
    // make an array of message ids in database and then check to see 
    //if any of them match the proposed unique id for the message object
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

    //create an instance of the id generator to make unique ids for the message objects
    let messageIdFactory = idGenerator(lastId.messageId)
    
    
    //define the message objects with longhand syntax so we may choose
    //which fields may be altered in the future
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
    
    //push the new message into the database
    mainDB.messages.push(newMessage)
    //store the updated db into local storage
    setLocalStorage(mainDB)
    //print the updated database to the dom
    writeMessages()
}

module.exports = storeMessage