//Author : Garrett Ward
//Functionality : Listens to local storage events to invoke a function that will
//update the message display div by removing the most recently deleted messages

let getLocalStorage = require("./getLocalStorage")


const messageBoardDeleteCheck = function () {
    //capture the database out of local storage
    let gotLocalStorage = getLocalStorage()
    //create a copy of the databse
    let referenceDB = gotLocalStorage
    
    window.addEventListener("storage", function (event) {
        //the event passed into this function is an object that contains the previous
        //and current contents of local storage with each update

        //get the string of the old value object and parse the messages array out of it
        let oldValueStr = event.oldValue
        let oldMessagesArray = JSON.parse(oldValueStr).messages

        //do the same to the new value string
        let newValueStr = event.newValue
        let newMessagesArray = JSON.parse(newValueStr).messages
        
        //use an if statement to compare the length of the old and new message arrays.
        // if the new array length is shorter than a message has been deleted from it
        // logic will be performed
        if (newMessagesArray.length < oldMessagesArray.length) {

            //use the map method to create arrays containing only the ids
            //of each message
            let firstIdArray = oldMessagesArray.map(function (message) {
                return message.messageId
            })
            let secondIdArray = newMessagesArray.map(function (message) {
                return message.messageId
            })
    
            //test to make sure the most recent array is not empty
            if (secondIdArray.length > 0) {
                
                //use .reduce to get a sum of the id values for each array.
                //since the most recent array will be shorter than the old array by the 
                //integer value of the deleted message, the difference between the two arrays may
                //be used to isolate the id of the deleted message.
                let deleteTargetId = (firstIdArray.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue })) - (secondIdArray.reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue }))
                
                //use document.queryselector to target a div with the corresponding message id
                //we need to delete
                let deleteMarker = document.querySelector(`div[id="${deleteTargetId}"]`)
                 
                //hide the message 
                deleteMarker.classList.add("hideIt")
    
            } else {
                
                //if only one message remains, the integer value left in the array will correspond
                //with the message that needs to be deleted.
                let targetId = parseInt(firstIdArray[0])
                let deleteMarker = document.querySelector(`div[id="${targetId}"]`)
                deleteMarker.classList.add("hideIt")
            }
        }
    })
        
}

module.exports = messageBoardDeleteCheck