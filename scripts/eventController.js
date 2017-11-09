const eventInfo = require("./eventFactory")

const domEl = document.getElementById("Dashboard")

const eventDash = function () {
    domEl.innerHTML = " "

    const eventDiv = document.createElement("div")
    eventDiv.id = "event_div"
    eventDiv.innerHTML = "<h1>Upcoming Events</h1>"

    const eventListEl = document.createElement("section")
    eventListEl.id = "event_list"

    const addEventButton = document.createElement("button")
    addEventButton.id = "add_event_button"
    addEventButton.appendChild(document.createTextNode("Add New Event"))
    

    eventDiv.appendChild(eventListEl)
    eventDiv.appendChild(addEventButton)
    domEl.appendChild(eventDiv)
}

module.exports = eventDash