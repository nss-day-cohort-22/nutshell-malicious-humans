const getLocalStorage = require("./getLocalStorage")
const idGenerator = require("./idGenerator")
const getSessionStorage = require("./getSessionStorage")
const setLocalStorage = require("./setLocalStorage")
const setSessionStorage = require("./setSessionStorage")

const mainDB = getLocalStorage()
let activeUser = getSessionStorage()


let friendObjFactory = (friendObj) => {
    let lastId = activeUser.user.friends[activeUser.user.friends.length-1] || {"friendId":0}
    let friendIdGenerator = idGenerator(lastId.friendId)
    activeUser.user.friends.push(Object.create(null, {
        "friendId": {
            "value": friendIdGenerator.next().value,
            "enumerable": true
        },
        "friendUserId": {
            "value": friendObj.userId,
            "enumerable": true
        },
        "friendFirstName": {
            "value": friendObj.firstName,
            "enumerable": true
        },
        "friendLastName": {
            "value": friendObj.lastName,
            "enumerable": true
        }
    }))
    let index = mainDB.users.indexOf(activeUser.user)
    mainDB.users.splice(index, 1, activeUser.user)
    setSessionStorage(activeUser)
    setLocalStorage(mainDB)
}

module.exports = friendObjFactory