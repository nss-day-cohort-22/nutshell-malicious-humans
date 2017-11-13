//Kristen
//this module updates local storage when a user edits an event

const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")


const updateEvent = function (event) {
    const storedDb = getLocalStorage()

    const eId = parseInt(
        Array.from(event.target.classList)
            .find(editClass => {
                if(editClass.startsWith("update_")) return editClass
            })
            .split("_")[1]
    ) //gets the class of button clicked and identifies the eventId

    //values of fields in edit form
    let eNameEdit = document.getElementById("event_nameEdit").value
    let eDateEdit = document.getElementById("event_dateEdit").value
    let eLocationEdit = document.getElementById("event_locationEdit").value
    let eDescriptionEdit = document.getElementById("event_descriptionEdit").value

    //current elements of the event
    let eNameEl = document.getElementById("event_name" + `${eId}`)
    let eDateEl = document.getElementById("event_date" + `${eId}`)
    let eLocationEl = document.getElementById("event_location" + `${eId}`)
    let eDescriptionEl = document.getElementById("event_description" + `${eId}`)


    if (eNameEdit === "" || eDateEdit === "" || eLocationEdit === "" || eDescriptionEdit === "") {
        alert("Please fill out all fields")
    } else {
        const updateE = storedDb.events.filter( (e) => {
            if(e.eventId === eId) {
                return e
            }
        })[0]

        const indexOfEvent = storedDb.events.indexOf(updateE) //gets position of event in the array

        //updates the event info 
        updateE.eventName= eNameEdit
        updateE.eventDate = eDateEdit
        updateE.eventLocation = eLocationEdit
        updateE.eventDescription = eDescriptionEdit

        
        storedDb.events.splice(indexOfEvent, 1, updateE) //removes old info from database and replaces it with the updated info
        setLocalStorage(storedDb) //saves to local storage
        
        //update text in section with new values
        eNameEl.innerHTML = eNameEdit
        eDateEl.innerHTML = eDateEdit
        eLocationEl.innerHTML = eLocationEdit
        eDescriptionEl.innerHTML = eDescriptionEdit

        document.getElementById("event_" + `${eId}`).removeChild(document.getElementById("event_editContent")) //removes edit form 
    }

}

module.exports = updateEvent
