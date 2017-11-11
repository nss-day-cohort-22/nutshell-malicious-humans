//Kristen
//functionality when the update button is pressed

const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")
const eventFactory = require("./eventFactory")

const storedDb = getLocalStorage()

const updateEvent = function (event) {

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
    let eTimeEdit = document.getElementById("event_timeEdit").value
    let eDescriptionEdit = document.getElementById("event_descriptionEdit").value

    console.log(eId, eNameEdit, eDateEdit, eLocationEdit, eTimeEdit, eDescriptionEdit)

    if (eNameEdit === "" || eDateEdit === "" || eLocationEdit === "" || eTimeEdit === "" || eDescriptionEdit === "") {
        alert("Please fill out all fields")
    } else {
        storedDb.events.filter( (e) => {
            if(e.eventId === eId) {
                e.eventName = eNameEdit
                e.eventDate = eDateEdit
                e.eventLocation = eLocationEdit
                e.eventTime = eTimeEdit
                e.eventDescription = eDescriptionEdit

            }
        })

        document.getElementById("event_" + `${eId}`).removeChild(document.getElementById("event_editContent"))
    }

}

module.exports = updateEvent