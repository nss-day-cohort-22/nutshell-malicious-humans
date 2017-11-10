//Kristen
//allow user to edit an existing event
const getLocalStorage = require("./getLocalStorage")


const editEventForm = function (event) {
    const idEventEdit = parseInt(
        Array.from(event.target.classList)
            .find(editClass => {
                if(editClass.startsWith("edit_")) return editClass
            })
            .split("_")[1]
    ) //gets the class of button clicked and identifies the eventId

    console.log(idEventEdit)

    
    const storedEvents = getLocalStorage().events

    const eventToEdit = storedEvents.forEach( e => {
        if(e.eventId === idEventEdit) {
            return e
        } 
    })

    console.log(eventToEdit)

    const eventEditEl = document.getElementById("event_" + idEventEdit)
    // formEl.innerHTML = " " //resets the innerHTML for the event_form element so that only one form will show even if the user presses the "Add New Event" button multiple times
    
    const formDiv = document.createElement("div")
    formDiv.id = "event_editContent"


    //content for form
    let editFormString = `
        <h3>Edit Event</h3>
        <p>
            <label for="event_name">Edit Event Name</label>    
                <input type="text" id="event_name" name="event_name">
            <label for="event_date">Edit Date</label>    
                <input type="date" id="event_date" name="event_date">
            <label for="event_location">Edit Location</label>    
                <input type="text" id="event_location" name="event_location">
            <label for="event_time">Edit Start Time</label>    
                <input type="time" id="event_time" name="event_time">
            <label for="event_description">Edit Description</label>    
                <textarea id="event_description" rows="4" cols="50"></textarea>
        </p>
    `
    
    formDiv.innerHTML += editFormString
    
    //create button will add the event to local storage and add it to the DOM
    const updateEventButton = document.createElement("button")
    updateEventButton.id = "event_updateButton"
    updateEventButton.appendChild(document.createTextNode("Update Event"))
    // updateEventButton.addEventListener("click", createEvent)
    
    //close button, closes out of the form
    const closeButton = document.createElement("button")
    closeButton.id = "close_event_form"
    closeButton.appendChild(document.createTextNode("Close"))
    closeButton.addEventListener("click", () => {
        eventEditEl.innerHTML = " "
    })
    
    formDiv.appendChild(updateEventButton)
    formDiv.appendChild(closeButton)

    eventEditEl.appendChild(formDiv)

}

module.exports = editEventForm