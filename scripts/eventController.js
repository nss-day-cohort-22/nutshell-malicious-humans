//Kristen
//this module displays event dashboard when user first clicks the event link on the main Dashboard

const eventInfo = require("./eventFactory")
const createEvent = require("./eventFormController")
const displayEvents = require("./eventListDisplay")

const domEl = document.getElementById("Dashboard")


const eventDash = function () {
    domEl.innerHTML = " "
    //creates Upcoming events div
    const eventDiv = document.createElement("div")
    eventDiv.id = "event_div"
    eventDiv.innerHTML = "<h1>Upcoming Events</h1>"
    
    //creates section to show the events for that user
    const eventListEl = document.createElement("section")
    eventListEl.id = "event_list"
    //default message displayed in the event list when there are no events for that user
    eventListEl.innerHTML = "<p id='event_None'>You have no upcoming events</p>"

    //creates button for user to click to add more events
    const addEventButton = document.createElement("button")
    addEventButton.id = "event_addButton"
    addEventButton.appendChild(document.createTextNode("Add New Event"))
    addEventButton.addEventListener("click", createEvent)
    
    //creates the div for the form to display when the user clicks add event
    const eventFormEl = document.createElement("div")
    eventFormEl.id = "event_form"

    
    eventDiv.appendChild(addEventButton) //appends add button to the event div
    eventDiv.appendChild(eventFormEl) //appends the form element to the event div
    eventDiv.appendChild(eventListEl) //appends the event list element to the event div
    domEl.appendChild(eventDiv) //appends the event div to the Dashboard
    displayEvents() //if there are any existing events they are displayed
}

module.exports = eventDash