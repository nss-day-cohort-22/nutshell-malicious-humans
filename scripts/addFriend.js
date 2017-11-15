//Tyler: This module exports a function that adds a friend based on the target Id of what is clicked.

const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const friendObjFactory = require("./friendObjFactory")

const mainDB = getLocalStorage()

const addFriend = (event) => {
    let id
    if(event.type==="click"){
        id = parseInt(event.target.id)
    } else {
        id = event
    }

    let friendObj = mainDB.users.filter(user => user.userId === id)
    friendObjFactory(friendObj[0])

}

module.exports = addFriend