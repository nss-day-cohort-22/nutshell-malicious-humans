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
        currentEvents.forEach( event => {
            if(event.userId === currentUserId) {
                addEventList(event)
            } else {
                eventListEl.innerHTML = "<p>You have no upcoming events</p>"
            }
        })
    } 

}

module.exports = displayEventList

// thoughts on how to organize events by date
// .sort( function(a, b) {
//     return b.eventDate - a.eventDate
// }) 