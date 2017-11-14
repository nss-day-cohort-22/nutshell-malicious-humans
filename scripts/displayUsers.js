const getLocalStorage = require("./getLocalStorage")
const getSessinStorage = require("./getSessionStorage")
const addFriend = require("./addFriend")


const displayUsers = () => {
    const mainDB = getLocalStorage()
    const activeUser = getSessinStorage()
    let usersOutputEl = document.getElementById("Dashboard")
    usersOutputEl.innerHTML = ""

    let userString = ""

    let friendsArray = mainDB.userFriend.filter(friend => {return activeUser.user.userId === friend.activeUserId || activeUser.user.userId === friend.friendUserId}) //array of current user's friends

    // if user is a current friend of the active user, do not add them to the notFriends array
    const notFriends = mainDB.users.filter(user =>{
        let noFriend = true
        friendsArray.forEach( friend => {
            if(user.userId === friend.friendUserId || user.userId === friend.activeUserId) {
                noFriend = false
            }
        })
        return noFriend
    })

    //only display users who are not friends with the current active user 
    notFriends.forEach( user => {

        userString+=
                `
                <section class= "user" id= "${user.userId}">
                    <h2>${user.firstName} ${user.lastName}</h2>
                    <button class= "addButton" id="${user.userId}">Add Friend</button>
                </section>
                `
    })

    usersOutputEl.innerHTML = userString

    let buttonArray = document.getElementsByClassName("addButton")
    let addButtonArray = Array.from(buttonArray)
    addButtonArray.forEach(button => button.addEventListener("click", addFriend))

}

module.exports = displayUsers