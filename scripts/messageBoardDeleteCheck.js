let getLocalStorage = require("./getLocalStorage")


const messageBoardDeleteCheck = function () {
    
    let gotLocalStorage = getLocalStorage()
    let referenceDB = gotLocalStorage
    
    window.addEventListener("storage", function (event) {
        
        let oldValueStr = event.oldValue
        let oldMessagesArray = JSON.parse(oldValueStr).messages

        let newValueStr = event.newValue
        let newMessagesArray = JSON.parse(newValueStr).messages

        console.log(oldMessagesArray)
        console.log(newMessagesArray)

        
        if (newMessagesArray.length < oldMessagesArray.length) {

            let firstIdArray = oldMessagesArray.map(function (message) {
                return message.messageId
            })
            console.log(firstIdArray)
            let secondIdArray = newMessagesArray.map(function (message) {
                return message.messageId
            })
            console.log(secondIdArray)
    
            if (secondIdArray.length > 0) {
    
                let deleteTargetId = (firstIdArray.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue })) - (secondIdArray.reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue }))
    
                let deleteMarker = document.querySelector(`div[id="${deleteTargetId}"]`)
                    
                while (deleteMarker.firstChild) {
                    deleteMarker.removeChild(deleteMarker.firstChild)
                }
    
            } else {
    
                let targetId = parseInt(firstIdArray[0])
                let deleteMarker = document.querySelector(`div[id="${targetId}"]`)
                while (deleteMarker.firstChild) {
                    deleteMarker.removeChild(deleteMarker.firstChild)
                }
            }
        }
    })
        
}

module.exports = messageBoardDeleteCheck