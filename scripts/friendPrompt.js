//Tyler: This module will display a modal that has the user verify that they want to add the person as a friend.

const getLocalStorage = require("./getLocalStorage")
const addFriend = require("./addFriend")
const displayUsers = require("./displayUsers")
const mainDB = getLocalStorage()


let addPrompt = (event) => {
    let id = parseInt(event.target.id)
    let friend = mainDB.users.filter(user => {return user.userId === id})[0]
    //Get the DOM element that will display the modal
    let modalOutput = document.getElementById("modal")
    modalOutput.style.display = "block"

    //Modal HTML
    let modalHTML = 
    `
    <div class = "friendModal" id= "addFriendModal">
        <h3> Are you sure you want to add ${friend.firstName} ${friend.lastName} as a friend? </h3>
        <button id = "button_${id}">Add Friend</button> 
        <button id = "cancel"> Cancel </button>
    </div>
    `
    modalOutput.innerHTML = modalHTML
    //create an add user button and a cancel button and adds an event listener to each.
    let addButton = document.getElementById(`button_${id}`)
    let cancelButton = document.getElementById("cancel")
    addButton.addEventListener("click", function(){
        addFriend(event)
        let userToHide = document.getElementById(`${id}`)
        userToHide.style.display = "none"
        modalOutput.style.display="none"

    })
    cancelButton.addEventListener("click", function(){
        modalOutput.style.display = "none"
    })
}


module.exports = addPrompt