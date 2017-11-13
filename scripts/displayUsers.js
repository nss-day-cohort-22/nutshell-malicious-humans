const getLocalStorage = require("./getLocalStorage")
const getSessinStorage = require("./getSessionStorage")

const mainDB = getLocalStorage()
const activeUser = getSessinStorage()

const displayUsers = () => {
    let usersOutputEl = document.getElementById("Dashboard")
    usersOutputEl.innerHTML = ""

    let userString = ""

    mainDB.users.forEach(user => {
        if(user.id !== activeUser.user.userId) {
            userString+= 
            `
            <section id= ${user.userId}
            `
        }
    })
}