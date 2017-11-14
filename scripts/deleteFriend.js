const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const setLocalStorage = require("./setLocalStorage")


let deleteFriend = (event) => {
    const mainDB = getLocalStorage()
    const activeUser = getSessionStorage()
    const activeUserId = activeUser.user.userId

    let friendId = parseInt(event.target.id.split("_")[1])

    let friendObjToDelete = mainDB.userFriend.filter(obj => {return obj.activeUserId === activeUserId && obj.friendUserId === friendId})

    let friendIndex = mainDB.userFriend.indexOf(friendObjToDelete[0])

    mainDB.userFriend.splice(friendIndex, 1)

    let friendDomEl = document.getElementById(`friend_${friendId}`)
    friendDomEl.classList.add("hideIt")

    setLocalStorage(mainDB)

}

module.exports = deleteFriend