//Tyler: This module takes a userObject and sets them as the activeUser and puts them in Session storage.

let getLocalStorage = require("./getLocalStorage")
let setSessionStorage = require("./setSessionStorage")

let copyUser = function(user){
    let copiedUser = user
    let activeUser = {"user": null}
    activeUser.user = copiedUser
    setSessionStorage(activeUser)
}

module.exports = copyUser 