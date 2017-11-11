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

    let eNameEdit = document.getElementById("event_nameEdit").value
    let eDateEdit = document.getElementById("event_dateEdit").value
    let eLocationEdit = document.getElementById("event_locationEdit").value
    let eDescriptionEdit = document.getElementById("event_descriptionEdit").value

    if (eNameEdit === "" || eDateEdit === "" || eLocationEdit === "" || eDescriptionEdit === "") {
        alert("Please fill out all fields")
    } else {
        const updateE = storedDb.events.filter( (e) => {
            if(e.eventId === eId) {
                return e
            }
        })[0]

        const indexOfEvent = storedDb.events.indexOf(updateE) //gets position of event in the array

        const removeE = storedDb.events.splice(indexOfEvent, 1) //removes old info from database
        //updates the event info
        console.log(storedDb)
        updateE.eventName = eNameEdit
        updateE.eventDate = eDateEdit
        updateE.eventLocation = eLocationEdit
        updateE.eventDescription = eDescriptionEdit
        
        const addE = storedDb.events.push(updateE) //adds updated info to database
        setLocalStorage(storedDb) //saves to local storage

        document.getElementById("event_" + `${eId}`).removeChild(document.getElementById("event_editContent"))
    }

}

module.exports = updateEvent
