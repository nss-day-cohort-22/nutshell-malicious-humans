//Kristen
// displays event dashboard

const eventInfo = require("./eventFactory")
const createEvent = require("./eventFormController")
const displayEvents = require("./eventListDisplay")

const domEl = document.getElementById("Dashboard")


const eventDash = function () {
    domEl.innerHTML = " "

    const eventDiv = document.createElement("div")
    eventDiv.id = "event_div"
    eventDiv.innerHTML = "<h1>Upcoming Events</h1>"

    const eventListEl = document.createElement("section")
    eventListEl.id = "event_list"
    
    
    const addEventButton = document.createElement("button")
    addEventButton.id = "event_addButton"
    addEventButton.appendChild(document.createTextNode("Add New Event"))
    addEventButton.addEventListener("click", createEvent)
    
    const eventFormEl = document.createElement("div")
    eventFormEl.id = "event_form"

    
    eventDiv.appendChild(addEventButton)
    eventDiv.appendChild(eventFormEl)
    eventDiv.appendChild(eventListEl)
    domEl.appendChild(eventDiv)
    displayEvents()
}

module.exports = eventDash