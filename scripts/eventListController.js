//Kristen, after a user creates an event it is added to the Event List


const addEventList = function (event) {
    const eventListEl = document.getElementById("event_list")

    const eventEl = document.createElement("section")
    eventEl.id = `event_${event.eventId}`

    let eventContentString = `
        <h3>${event.eventName}</h3>
        <p>${event.eventDate}</p>
        <p>${event.eventLocation}</p>
        <p>${event.eventTime}</p>
        <p>${event.eventDescription}</p>
    `

    eventEl.innerHTML += eventContentString

    const editEventButton = document.createElement("button")
    editEventButton.classList.add = "edit_event_button"
    editEventButton.appendChild(document.createTextNode("Edit Event"))
    // editEventButton.addEventListener("click", editEvent)
    eventEl.appendChild(editEventButton)

    eventListEl.appendChild(eventEl)
}

module.exports = addEventList