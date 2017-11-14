//Kristen
// this module adds the new event to the DOM after a user fills out the New Event form

const editEvent = require("./eventEditController")
const getSessionStorage = require("./getSessionStorage")

const addEventList = function (event) {
    const eventListEl = document.getElementById("event_list")
    const activeUser = getSessionStorage().user

    const eventEl = document.createElement("section")
    eventEl.id = `event_${event.eventId}`
    
    let eventContentString = `
    <h3 id="event_name${event.eventId}">${event.eventName}</h3>
    <p id="event_date${event.eventId}">Date: ${event.eventDate}</p>
    <p id="event_location${event.eventId}">Location: ${event.eventLocation}</p>
    <p id="event_description${event.eventId}">Description: ${event.eventDescription}</p>
    `
    
    eventEl.innerHTML += eventContentString
    
    //only allow user to edit the event that they created
    if(event.userId === activeUser.userId) {
        eventEl.className = "myEvent" //added class to identify events that are the active users
        
        const editEventButton = document.createElement("button")
        editEventButton.className = `edit_${event.eventId}`
        editEventButton.appendChild(document.createTextNode("Edit Event"))
        editEventButton.addEventListener("click", editEvent)

        eventEl.appendChild(editEventButton)
    } else {
        eventEl.className = "friendEvent" //added class to identify events that are for the user's friends
    }

    eventListEl.appendChild(eventEl)

}

module.exports = addEventList