//Kristen
// displays event section

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
    // displayEvents()
     

    const addEventButton = document.createElement("button")
    addEventButton.id = "add_event_button"
    addEventButton.appendChild(document.createTextNode("Add New Event"))
    addEventButton.addEventListener("click", createEvent)

    const eventFormEl = document.createElement("div")
    eventFormEl.id = "event_form"
    

    eventDiv.appendChild(eventListEl)
    eventDiv.appendChild(addEventButton)
    eventDiv.appendChild(eventFormEl)
    domEl.appendChild(eventDiv)
}

module.exports = eventDash