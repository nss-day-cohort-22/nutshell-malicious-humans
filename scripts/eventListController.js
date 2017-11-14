//Kristen
// this module adds the new event to the DOM after a user fills out the New Event form

const editEvent = require("./eventEditController")

const addEventList = function (event) {
    const eventListEl = document.getElementById("event_list")

    const eventEl = document.createElement("section")
    eventEl.id = `event_${event.eventId}`

    let eventContentString = `
        <h3 id="event_name${event.eventId}">${event.eventName}</h3>
        <p id="event_date${event.eventId}">Date: ${event.eventDate}</p>
        <p id="event_location${event.eventId}">Location: ${event.eventLocation}</p>
        <p id="event_description${event.eventId}">Description: ${event.eventDescription}</p>
    `

    eventEl.innerHTML += eventContentString

    const editEventButton = document.createElement("button")
    editEventButton.className = `edit_${event.eventId}`
    editEventButton.appendChild(document.createTextNode("Edit Event"))
    editEventButton.addEventListener("click", editEvent)

    //creates a div for the edit form
    const editFormDiv = document.createElement("div")
    editFormDiv.id = `event_editContent_${event.eventId}`

    eventEl.appendChild(editEventButton)
    eventEl.appendChild(editFormDiv)

    eventListEl.appendChild(eventEl)

}

module.exports = addEventList