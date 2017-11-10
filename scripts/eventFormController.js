//Kristen
//generates a form for a user to create/edit an event
const eventController = require("./eventController")
const createEvent = require("./eventFactory")



const createEventForm = function () {
    const formEl = document.getElementById("event_form")
    formEl.innerHTML = " " //resets the innerHTML for the event_form element so that only one form will show even if the user presses the "Add New Event" button multiple times
    
    const formDiv = document.createElement("div")
    formDiv.id = "event_formContent"

    //content for form
    let formContentString = `
        <h3>Create New Event</h3>
        <p>
            <label for="event_name">Event Name</label>    
                <input type="text" id="event_name" name="event_name" required="required">
            <label for="event_date">Date</label>    
                <input type="date" id="event_date" name="event_date" required="required">
            <label for="event_location">Location</label>    
                <input type="text" id="event_location" name="event_location" required="required">
            <label for="event_time">Start Time</label>    
                <input type="time" id="event_time" name="event_time">
            <label for="event_description">Description</label>    
                <textarea id="event_description" rows="4" cols="50"></textarea>
        </p>
    `
    
    formDiv.innerHTML += formContentString
    
    //create button will add the event to local storage and add it to the DOM
    const createEventButton = document.createElement("button")
    createEventButton.id = "event_createButton"
    createEventButton.appendChild(document.createTextNode("Create Event"))
    createEventButton.addEventListener("click", createEvent)
    
    //close button, closes out of the form
    const closeButton = document.createElement("button")
    closeButton.id = "event_closeForm"
    closeButton.appendChild(document.createTextNode("Close"))
    closeButton.addEventListener("click", () => {
        formEl.removeChild(formDiv)
    })
    
    formDiv.appendChild(createEventButton)
    formDiv.appendChild(closeButton)

    formEl.appendChild(formDiv)

}

module.exports = createEventForm

