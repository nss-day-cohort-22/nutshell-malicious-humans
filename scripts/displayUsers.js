const getLocalStorage = require("./getLocalStorage")
const getSessinStorage = require("./getSessionStorage")
const addFriend = require("./addFriend")


const displayUsers = () => {
    const mainDB = getLocalStorage()
    const activeUser = getSessinStorage()
    let usersOutputEl = document.getElementById("Dashboard")
    usersOutputEl.innerHTML = ""

    let userString = ""

    let userNot = []

    let friendsArray = mainDB.userFriend.filter(friend => {return activeUser.user.userId === friend.activeUserId || activeUser.user.userId === friend.friendUserId}) //array of current user's friends

        
    console.log(friendsArray)
    console.log(mainDB.users)

    mainDB.users.forEach(DbUser => {
        // const notActiveUser = (DbUser.userId !== activeUser.user.userId) //userId is not equal to the session active user
        userString+=
            `
            <section class= "user" id= "${DbUser.userId}">
                <h2>${DbUser.firstName} ${DbUser.lastName}</h2>
                <button class= "addButton" id="${DbUser.userId}">Add Friend</button>
            </section>
            `
    
    })

    usersOutputEl.innerHTML = userString

    let buttonArray = document.getElementsByClassName("addButton")
    let addButtonArray = Array.from(buttonArray)
    addButtonArray.forEach(button => button.addEventListener("click", addFriend))

}

module.exports = displayUsers