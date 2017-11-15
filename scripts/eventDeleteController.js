//Kristen
//this module deletes event from local storage when a user clicks the delete event button
//not working

const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")


const deleteEvent = function (event) {
    const storedDb = getLocalStorage()

    const eId = parseInt(
        Array.from(event.target.classList)
            .find(editClass => {
                if(editClass.startsWith("delete_")) return editClass
            })
            .split("_")[1]
    ) //gets the class of button clicked and identifies the eventId


    const deleteE = storedDb.events.filter( (e) => {
        if(e.eventId === eId) {
            return e
        }
    })[0]

    const indexOfEvent = storedDb.events.indexOf(deleteE) //gets position of event in the array

        
    storedDb.events.splice(indexOfEvent, 1) //deletes event from database
    setLocalStorage(storedDb) //saves to local storage

    const listEl = document.getElementById("event_list")
    const deletedEl = document.getElementById("event_" + `${eId}`)
    
    listEl.removeChild(deletedEl)

}

module.exports = deleteEvent