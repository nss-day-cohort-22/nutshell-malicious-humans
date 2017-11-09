let getSessionStorage = require("./getSessionStorage")

const displayActiveUser = function () {
    let currentUserObject = getSessionStorage()
    let userDisplayMarker = document.getElementById("headerId")
    let userDisplayHeading = document.createElement("h1")
    userDisplayHeading.appendChild(document.createTextNode("Welcome " + currentUserObject.user.firstName + "!"))
    userDisplayMarker.appendChild(userDisplayHeading)
    userDisplayMarker.classList.add("partyTime")

}

module.exports = displayActiveUser

