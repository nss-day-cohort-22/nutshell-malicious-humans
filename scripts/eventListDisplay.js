const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")

const currentEvents = getLocalStorage().events
const eventListEl = document.getElementById("event_list")


const displayEventList = function () {
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