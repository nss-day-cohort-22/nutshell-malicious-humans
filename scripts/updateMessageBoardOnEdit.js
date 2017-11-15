// Author: Jason Figueroa
// Module purpose: this module determines whether or not it is appropriate to 
// search for changes in the messages db. It compares the old messages to the 
// new ones and if It finds a change it updates the dom to reflect the changes. 
// const writeMessages = require("")

const updateMessageBoardOnEdit = (e) => {
    // window.addEventListener("storage", function(e) {
    // console.log(e)
    // console.log(JSON.parse(e.newValue))
    // console.log(JSON.parse(e.oldValue))
    const oldValue = JSON.parse(e.oldValue)
    const newValue = JSON.parse(e.newValue)
    const oldValueMessages = oldValue.messages
    const newValueMessages = newValue.messages
    
    if(oldValueMessages.length === newValueMessages.length) {

        for(let i = 0; i < oldValueMessages.length; i++) {
            console.log(oldValueMessages[i])
            console.log(newValueMessages[i])
            const oldMessageObj = oldValueMessages[i]
            const newMessageObj = newValueMessages[i]
            const oldMessageText = oldMessageObj.messageText
            const newMessageText = newMessageObj.messageText

            if(oldMessageText != newMessageText) {
                const id = oldMessageObj.messageId
                // document.querySelector(`#${id} > #messageText`).innerHTML = `${newMessageText}`
                document.getElementById(`${id}`).querySelector(".chatMessage > #messageText").innerHTML = `${newMessageText}`
            }
        }
    }
    // console.log(e)
    // })
}

module.exports = updateMessageBoardOnEdit