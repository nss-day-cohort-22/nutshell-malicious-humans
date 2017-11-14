let getLocalStorage = require("./getLocalStorage")
let getSessionStorage = require("./getSessionStorage")
let deleteFriend = require("./deleteFriend")
let revealDashLink = require("./revealDashLink")

let displayFriends = () => {
    const mainDB = getLocalStorage()
    const friendRelArray = mainDB.userFriend
    const activeUserId = getSessionStorage().user.userId 

    const myFriendRel = friendRelArray.filter(friendObj => {
        return friendObj.activeUserId === activeUserId || friendObj.friendUserId === activeUserId
    })

    let friendsToDisplayId = []

    myFriendRel.forEach(friendObj => {
        if(friendObj.friendUserId !== activeUserId){
            friendsToDisplayId.push(friendObj.friendUserId)
        }})
    

    let friendObjToDisplay = []

    friendsToDisplayId.forEach(id => {
        let userToPush =  mainDB.users.filter(user => {
            return user.userId === id 
        })
        friendObjToDisplay.push(userToPush)
    })

    let friendOutputEl = document.getElementById("Dashboard")

    friendOutputEl.innerHTML = ""
    let friendHTML = 
    `<section id="friendList">
        <h1> My Friends </h1>
    `

    friendObjToDisplay.forEach(friendArray => {
        let friend = friendArray[0]
        friendHTML += 
        `
        <div class="friendList__friend" id="friend_${friend.userId}">
            <h2>${friend.firstName} ${friend.lastName}</h2>
            <button class= "delete" id= "delete_${friend.userId}">Delete Friend</button>
        </div>
        `
    })

    friendHTML += "</section>"

    friendOutputEl.innerHTML = friendHTML

    let deleteButtons = document.getElementsByClassName("delete")
    let deleteButtonArray = Array.from(deleteButtons)
    deleteButtonArray.forEach(button => {
        button.addEventListener("click", deleteFriend)
    })
    revealDashLink()
}

module.exports = displayFriends
