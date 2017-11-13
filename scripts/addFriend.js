const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const friendObjFactory = require("./friendObjFactory")

const mainDB = getLocalStorage()

const addFriend = (event) => {
    let id
    if(event.type==="click"){
        id = event.target.id.value
    } else {
        id = event
    }

    let friendObj = mainDB.users.filter(user => user.userId === id)
    friendObjFactory(friendObj[0])
}

module.exports = addFriend