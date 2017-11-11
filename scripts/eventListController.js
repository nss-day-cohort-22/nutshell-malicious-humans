//Kristen
// this module adds the new event to the DOM after a user fills out the New Event form

const editEvent = require("./eventEditController")

const addEventList = function (event) {
    const eventListEl = document.getElementById("event_list")

    const eventEl = document.createElement("section")
    eventEl.id = `event_${event.eventId}`

    let eventContentString = `
        <h3>${event.eventName}</h3>
        <p>Date: ${event.eventDate}</p>
        <p>Location: ${event.eventLocation}</p>
        <p>Start Time: ${event.eventTime}</p>
        <p>Description: ${event.eventDescription}</p>
    `

    eventEl.innerHTML += eventContentString

    const editEventButton = document.createElement("button")
    editEventButton.className = `edit_${event.eventId}`
    editEventButton.appendChild(document.createTextNode("Edit Event"))
    editEventButton.addEventListener("click", editEvent)

    eventEl.appendChild(editEventButton)

    eventListEl.appendChild(eventEl)

}

module.exports = addEventList