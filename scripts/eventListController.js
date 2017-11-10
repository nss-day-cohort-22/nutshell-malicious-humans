//Kristen, after a user creates an event it is added to the Event List

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