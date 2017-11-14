const getLocalStorage = require("./getLocalStorage")
const idGenerator = require("./idGenerator")
const getSessionStorage = require("./getSessionStorage")
const setLocalStorage = require("./setLocalStorage")
const setSessionStorage = require("./setSessionStorage")

const mainDB = getLocalStorage()


let friendObjFactory = (friendObj) => {
    let activeUser = getSessionStorage()
    let lastId = mainDB.userFriend[mainDB.userFriend.length-1] || {"friendId":0}
    let friendIdGenerator = idGenerator(lastId.friendId)
    
    mainDB.userFriend.push(Object.create(null, {
        "friendId": {
            "value": friendIdGenerator.next().value,
            "enumerable": true
        },
        "activeUserId": {
            "value": activeUser.user.userId,
            "enumerable": true
        },
        "friendUserId": {
            "value": friendObj.userId,
            "enumerable": true
        }
    }))
    setLocalStorage(mainDB)

}

module.exports = friendObjFactory