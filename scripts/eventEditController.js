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

    //gets array of events from local storage
    const storedEvents = getLocalStorage().events

    //gets the event that corresponds with the eventId of the button clicked
    const eventToEdit = storedEvents.filter( e => {
        return e.eventId === idEventEdit
    })[0]

    //stored content of event
    let editEName = eventToEdit.eventName
    let editEDate = eventToEdit.eventDate
    let editELocation = eventToEdit.eventLocation
    let editETime = eventToEdit.eventTime
    let editEDescription = eventToEdit.eventDescription


    //gets the section of the event clicked
    const eventEditEl = document.getElementById("event_" + idEventEdit)
    
    //creates a div for the edit form
    const editFormDiv = document.createElement("div")
    editFormDiv.id = "event_editContent"




    //content for edit form
    let editFormString = `
        <h3>Edit Event</h3>
        <p>
            <label for="event_name">Edit Event Name</label>    
                <input type="text" id="event_name" name="event_name" value="${editEName}">
            <label for="event_date">Edit Date</label>    
                <input type="date" id="event_date" name="event_date" value="${editEDate}">
            <label for="event_location">Edit Location</label>    
                <input type="text" id="event_location" name="event_location" value="${editELocation}">
            <label for="event_time">Edit Start Time</label>    
                <input type="time" id="event_time" name="event_time" value="${editETime}">
            <label for="event_description">Edit Description</label>    
                <textarea id="event_description" rows="4" cols="50">${editEDescription}</textarea>
        </p>
    `
    
    editFormDiv.innerHTML += editFormString
    
    //create button will add the event to local storage and add it to the DOM
    const updateEventButton = document.createElement("button")
    updateEventButton.id = "event_updateButton"
    updateEventButton.appendChild(document.createTextNode("Update Event"))
    // updateEventButton.addEventListener("click", createEvent)
    
    //close button, removes the form
    const closeButton = document.createElement("button")
    closeButton.id = "close_event_form"
    closeButton.appendChild(document.createTextNode("Close"))
    closeButton.addEventListener("click", () => {
        eventEditEl.removeChild(editFormDiv)
    })
    
    editFormDiv.appendChild(updateEventButton)
    editFormDiv.appendChild(closeButton)

    eventEditEl.appendChild(editFormDiv)

}

module.exports = editEventForm