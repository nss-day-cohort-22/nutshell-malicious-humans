const getLocalStorage = require("./getLocalStorage")
const getSessinStorage = require("./getSessionStorage")
const addFriend = require("./addFriend")
const revealDashLink = require("./revealDashLink")

const mainDB = getLocalStorage()

const displayUsers = () => {
    const activeUser = getSessinStorage()
    let usersOutputEl = document.getElementById("Dashboard")
    usersOutputEl.innerHTML = ""

    let userString = ""

    mainDB.users.forEach(DbUser => {
        if(DbUser.userId !== activeUser.user.userId && activeUser.user.friends.includes(DbUser)===false) {
            userString+= 
            `
            <section class= "user" id= "${DbUser.userId}">
                <h2>${DbUser.firstName} ${DbUser.lastName}</h2>
                <button class= "addButton" id="${DbUser.userId}">Add Friend</button>
            </section>
            `
        }
    })

    usersOutputEl.innerHTML = userString

    let buttonArray = document.getElementsByClassName("addButton")
    let addButtonArray = Array.from(buttonArray)
    addButtonArray.forEach(button => button.addEventListener("click", addFriend))

    revealDashLink()

}

module.exports = displayUsers