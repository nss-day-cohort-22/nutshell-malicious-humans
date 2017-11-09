const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")

const currentEvents = getLocalStorage().events

const displayEventList = function () {
    const eventListEl = document.getElementById("event_list")
    
    if (currentEvents.length > 0) {
        const currentUserId = getSessionStorage().user.userId
        currentEvents.forEach( event => {
            if(event.userId === currentUserId) {
                addEventList(event)
            }
        })
    } else {
        eventListEl.innerHTML = "<p>You have no upcoming events</p>"
    }
}

module.exports = displayEventList