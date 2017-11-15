//Author : Garrett Ward
//Functionality : Deletes Messages from database as well as removes
//them from the DOM

let getLocalStorage = require("./getLocalStorage")
let setLocalStorage = require("./setLocalStorage")

const deleteMessage = function (event) {
    //use event passed in by even listener to target
    //the parent element (chat message to be deleted)
    let messageToDelete = event.target.parentElement
    //retreive the database from local storage
    let storedDB = getLocalStorage()
    //capture the id of the message to delete as an integer in 
    //a variable
    let targetId = parseInt(messageToDelete.id) 
    //use the find index method to iterate through the messages array in the main database.
    //check each message in the database to see if its id matches the id of the message to delete.
    //return the matches index value and capture it in a variable
    let indexOfMessageToDelete = storedDB.messages.findIndex(function (message) {
        return message.messageId === targetId
    })
    
    //splice the message to be delted out of the array, removing it.
    storedDB.messages.splice(indexOfMessageToDelete, 1)
    //store the altered database
    setLocalStorage(storedDB)
    //hide the deleted message on the DOM
    messageToDelete.classList.add("hideIt")

}


module.exports = deleteMessage 