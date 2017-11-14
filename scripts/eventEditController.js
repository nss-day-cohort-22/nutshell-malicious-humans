//Kristen
//this module generates a form to allow user to edit an existing event
const getLocalStorage = require("./getLocalStorage")
const updateEvent = require("./eventUpdateController")
const eventFactory = require("./eventFactory")


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
    let editEDescription = eventToEdit.eventDescription


    //gets the section of the event clicked
    const eventEditEl = document.getElementById("event_" + idEventEdit)
    const editFormEl = document.getElementById("event_editContent" + idEventEdit)

    editFormEl.innerHTML = " " //prevents user from adding multiple edit forms if they click the button multipl times

    //content for edit form
    let editFormString = `
        <div class="editForm">
            <p>
                <label for="event_nameEdit">Edit Event Name</label>    
                    <input type="text" id="event_nameEdit" name="event_nameEdit" value="${editEName}">
                <label for="event_dateEdit">Edit Date</label>    
                    <input type="date" id="event_dateEdit" name="event_dateEdit" value="${editEDate}">
                <label for="event_locationEdit">Edit Location</label>    
                    <input type="text" id="event_locationEdit" name="event_locationEdit" value="${editELocation}">
                <label for="event_descriptionEdit">Edit Description</label>    
                    <textarea id="event_descriptionEdit" rows="4" cols="50">${editEDescription}</textarea>
            </p>
        </div>
    `
    
    editFormEl.innerHTML += editFormString
    
    //create button will add the event to local storage and add it to the DOM
    const updateEventButton = document.createElement("button")
    updateEventButton.className = `update_${idEventEdit}`
    updateEventButton.appendChild(document.createTextNode("Update Event"))
    updateEventButton.addEventListener("click", updateEvent)
    
    //close button, removes the form without making any changes
    const closeButton = document.createElement("button")
    closeButton.id = "close_event_form"
    closeButton.appendChild(document.createTextNode("Close"))
    closeButton.addEventListener("click", () => {
        editFormEl.innerHTML = " "
    })
    
    editFormEl.appendChild(updateEventButton)
    editFormEl.appendChild(closeButton)

    eventEditEl.appendChild(editFormEl)

}

module.exports = editEventForm