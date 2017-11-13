const getLocalStorage = require("./getLocalStorage")
const getSessinStorage = require("./getSessionStorage")
const addFriend = require("./addFriend")

const mainDB = getLocalStorage()
const activeUser = getSessinStorage()

const displayUsers = () => {
    let usersOutputEl = document.getElementById("Dashboard")
    usersOutputEl.innerHTML = ""

    let userString = ""

    mainDB.users.forEach(user => {
        if(user.userId !== activeUser.user.userId) {
            userString+= 
            `
            <section class= "user" id= "${user.userId}">
                <h2>${user.firstName} ${user.lastName}</h2>
                <button class= "addButton" id="${user.userId}">Add Friend</button>
            </section>
            `
        }
    })

    usersOutputEl.innerHTML = userString

    let buttonArray = document.getElementsByClassName("addButton")
    let addButtonArray = Array.from(buttonArray)
    addButtonArray.forEach(button => button.addEventListener("click", addFriend))

}

module.exports = displayUsers