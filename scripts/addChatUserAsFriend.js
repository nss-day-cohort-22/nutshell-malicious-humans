// Author : Garrett Ward
// Functionality : Function that will add a user to current users friend list when
// their user name is clicked on in the chat room


let getLocalStorage = require("./getLocalStorage")
let friendObjFactory = require("./friendObjFactory")
let getSessionsStorage = require("./getSessionStorage")


const addChatUserAsFriend = function () {
    //capture the parent element(the chat message div) of the event click
    let targetParent = event.target.parentElement
    //capture the id value and parse it into an integer
    let targetId = parseInt(targetParent.id)
    //declare a variable to capture th messageAuthor Id that will be produced
    //within the scope of a function
    let messageAuthorId = 0 
    //capture the database from local storage and store it in a variable
    let storedDB = getLocalStorage()
    //get object of current user and capture it in a variable
    let currentUserObject = getSessionsStorage()
    //iterate through the main database's messages array, and pass each message
    // in as the argument
    storedDB.messages.forEach(function (message) {
        //use an if statement to find the message id that matches the id of the div
        //the user clicked on
        if (targetId === message.messageId) {
            //store the message author id into the previously declared variable
            messageAuthorId = message.authorId
        }
    })

    //use an if statement to check and see if the author of the message
    //is the current user
    if (messageAuthorId !== currentUserObject.user.userId) {
        //use an if statement to to test and see if an add friend button has
        //already been opened on the page, so the user may only try to add
        //one friend off the chat room display at a time
        if (document.getElementById("addFriendButton") === null) {
            //declare and empty object, so an object produced within the scope of a function
            //may be used
            let userObj = {}

            //iterate through the users array in the main database
            storedDB.users.forEach(function (user) {
                //use an if statement to see if the user matches the author 
                //of the clicked message
                if (user.userId === messageAuthorId) {
                    //store the user object in the previously declared variable
                    userObj = user 
                }
            })

            // This function stores the friend into the database by passing the user obj
            // into the friendObjFactory Function
            //Jason F Co-Authored this function with me
            let buttonKiller = function () {
                friendObjFactory(userObj)
                //remove the add/noAdd friend buttons by targeting their parent div
                addFriendFormDiv.remove(document.getElementById("addUser"))
            }

            // create and append virtual elements to create a div, and buttons
            // for adding or not adding a friend that is clicked on. 
            let addFriendFormDiv = document.createElement("div")
            addFriendFormDiv.id = "addUser"
            let addFriendButton = document.createElement("button")
            addFriendButton.id = "addFriendButton"
            addFriendButton.classList.add("btn", "btn-secondary")
            let doNotAddFriendButton = document.createElement("button")
            doNotAddFriendButton.id = "doNotAddFriendButton"
            doNotAddFriendButton.classList.add("btn", "btn-secondary")
            addFriendButton.appendChild(document.createTextNode("Add Friend"))
            doNotAddFriendButton.appendChild(document.createTextNode("Do Not Add Friend"))
            addFriendFormDiv.appendChild(addFriendButton)
            addFriendFormDiv.appendChild(doNotAddFriendButton)
            targetParent.appendChild(addFriendFormDiv)

            //add event listeners to the buttons. add friend runs previously declared buttonKiller
            addFriendButton.addEventListener("click", buttonKiller)
            //doNotAddFriendButton simply removes the div with the buttons.
            doNotAddFriendButton.addEventListener("click", function () {
                addFriendFormDiv.remove(addFriendFormDiv)
            })


        }
    }
}



module.exports = addChatUserAsFriend