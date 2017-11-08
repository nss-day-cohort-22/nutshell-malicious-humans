let getLocalStorage = require("./getLocalStorage")
let setSessionStorage = require("./setSessionStorage")

let copyUser = function(user){
    let copiedUser = user
    let activeUser = {"user": null}
    activeUser.user = copiedUser
    setSessionStorage(activeUser)
}