//Kristen
//displays events in DOM if they already exist in the database for that use

const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")

const currentEvents = getLocalStorage().events

const displayEventList = function () {
    const eventListEl = document.getElementById("event_list")

    if (currentEvents.length > 0) {
        const currentUserId = getSessionStorage().user.userId
        currentEvents.sort( function(a, b) {
            const dateA = Date.parse(a.eventDate)
            const dateB = Date.parse(b.eventDate)
            return dateA - dateB
        }).forEach( event => {
            if(event.userId === currentUserId) {
                const dateToday = Date.now()
                const eventDate = Date.parse(event.eventDate)
                if(eventDate > dateToday) {
                    addEventList(event)
                }
            } else {
                eventListEl.innerHTML = "<p>You have no upcoming events</p>"
            }

        })
    }

}

module.exports = displayEventList
