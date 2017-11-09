//Kristen
//generates a form for a user to create/edit an event
const eventController = require("./eventController")



const createEventForm = function () {
    const formEl = document.getElementById("event_form")

    document.getElementById("add_event_button").classList.add("hideIt")
    
    const formDiv = document.createElement("div")
    formDiv.id = "event_formContent"

    
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
    
    const createEventButton = document.createElement("button")
    createEventButton.id = "create_event_button"
    createEventButton.appendChild(document.createTextNode("Create Event"))
    
    // const closeButton = document.createElement("button")
    // closeButton.id = "close_event_form"
    // closeButton.appendChild(document.createTextNode("Close"))
    // closeButton.addEventListener("click", eventController)
    
    formDiv.appendChild(createEventButton)
    // formDiv.appendChild(closeButton)

    formEl.appendChild(formDiv)

}

module.exports = createEventForm

