let getLocalStorage = require("./getLocalStorage")
let mainDB = require("./nutshellDB")
let makeMessageEdit = require("./makeMessageEdit")
let deleteMessage = require("./deleteMessage")
const autoScroll = require("./autoScroll")
let getSessionStorage = require("./getSessionStorage")
let retreiveEditObject = require("./retreiveEditObject")
let getEditObject = require("./getEditObject")
let setEditObject = require("./setEditObject")

const messageBoardMaitenance = function () {
    
    let messageMaintenanceArea = document.getElementById("messageDisplaySection")
    let storedDB = getLocalStorage()
    let deleteReferenceDB = getLocalStorage()
    let dbLength = storedDB.messages.length

    let newMessageCheck  = window.setInterval(function() {
        let currentUserObject = getSessionStorage()
        let refreshedDB = getLocalStorage()
        if (dbLength < refreshedDB.messages.length) {
            let newMessageAuthor = ""
            let newMessage = refreshedDB.messages.splice(-1)
            mainDB.users.forEach(function (user) {
                if (user.userId === newMessage[0].authorId) {
                    newMessageAuthor = user.userName
                }
            })
            
            if (newMessageAuthor !== currentUserObject.user.userName) {

                messageMaintenanceArea.innerHTML += `
                <div id="${newMessage[0].messageId}" class="chatMessage">
                    <p id="messageTitle">${newMessageAuthor}</p>
                    <p id="messageText">${newMessage[0].messageText}</p>
                    <button class="editMessageButton hideIt">Edit Message</button>
                    <button class="deleteMessageButton hideIt">Delete Message</button>
                </div>
                `
            
            
                let editButtons = document.getElementsByClassName("editMessageButton")
                let deleteButtons = document.getElementsByClassName("deleteMessageButton")
        
                let editButtonsArray = Array.from(editButtons)
                let deleteButtonsArray = Array.from(deleteButtons)
            
                editButtonsArray.forEach(function (element) {
                    element.addEventListener("click", makeMessageEdit)
                })
                deleteButtonsArray.forEach(function (element) {
                    element.addEventListener("click", deleteMessage)
                })
                autoScroll(messageMaintenanceArea)
                
            }
            dbLength ++
        }

    }, 500)


    let deleteMessageCheck = window.setInterval(function () {
        let currentUserObject = getSessionStorage()
        let refreshedDB = getLocalStorage()
        if (deleteReferenceDB.messages.length > refreshedDB.messages.length) {
            console.log("hey")
            let firstIdArray = deleteReferenceDB.messages.map(function (message) {
                return message.messageId
            })
            let secondIdArray = refreshedDB.messages.map(function (message) {
                return message.messageId
            })

            if (secondIdArray.length > 0) {

                let deleteTargetId = (firstIdArray.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue })) - (secondIdArray.reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue }))

                let deleteMarker = document.querySelector(`div[id="${deleteTargetId}"]`)
            
                let currentAuthor = ""

                refreshedDB.messages.forEach(function(message) {
                    if (message.messageId === deleteTargetId) {
                        mainDB.users.forEach(function (user) {
                            if (message.authorId === user.userId) {
                                currentAuthor = user.userName
                            }
                        })
                    }
                })
            
                if (currentAuthor !== currentUserObject.user.userName) {
                    while (deleteMarker.firstChild) {
                        deleteMarker.removeChild(deleteMarker.firstChild)
                    }
                }
            } else {
                let targetAuthor = ""
                let targetId = parseInt(firstIdArray[0])
                deleteReferenceDB.messages.forEach(function (message) {
                    if (message.messageId === targetId) {
                        deleteReferenceDB.users.forEach(function (user) {
                            if (user.userId === message.authorId) {
                                targetAuthor = user.userName
                            }
                        })
                    }
                })

                if (currentUserObject.user.userName !== targetAuthor) {
                    let deleteMarker = document.querySelector(`div[id="${targetId}"]`)
                    while (deleteMarker.firstChild) {
                        deleteMarker.removeChild(deleteMarker.firstChild)
                    }
                }

            }
        }
        deleteReferenceDB = getLocalStorage()
    }, 500)
    

    // let initialEditObject = getEditObject(0, "", "")
    // setEditObject(initialEditObject)
    // let lastText = ""
    // let editChecker = window.setInterval(function () {
    // let currentUserObject = getSessionStorage()
    // let editObject = retreiveEditObject()
    // let refreshedText = editObject.updatedMessageText
    // if (lastText !== refreshedText) {
    // if (currentUserObject.user.userName !== editObject.updatedMessageAuthor) {
    // let divToUpdate = document.querySelector(`div[id="${editObject.updatedMessageId}"]`)
    // 
    // while (divToUpdate.querySelector("p")) {
    // let childToRemove = divToUpdate.querySelector("p")
    // childToRemove.parentNode.removeChild(childToRemove)
    // }
// 
    // let updatedMessageDiv = document.createElement("div")
    // let updatedMessageAuthor = document.createElement("p")
    // updatedMessageAuthor.id ="messageTitle"
    // updatedMessageAuthor.appendChild(document.createTextNode(editObject.updatedMessageAuthor))
    // let updatedMessageText = document.createElement("p")
    // updatedMessageText.id = "messageText"
    // updatedMessageText.appendChild(document.createTextNode(editObject.updatedMessageText))
    // updatedMessageDiv.appendChild(updatedMessageAuthor)
    // updatedMessageDiv.appendChild(updatedMessageText)
    // divToUpdate.insertBefore(updatedMessageDiv, divToUpdate.firstChild)
    // lastText = editObject.updatedMessageText
// 
    // }                
    // }
    // }, 900)
}
module.exports = messageBoardMaitenance