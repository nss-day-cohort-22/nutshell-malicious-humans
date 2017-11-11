//Kristen
//this module creates a new event when a user fills out the New Event form
const eventIdGen = require("./idGenerator")
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const eventFactory = require("./eventFactory")
const storedDb = getLocalStorage()


const createEvent = () => {
    let lastEventId = storedDb.events[storedDb.events.length- 1] ||  {eventId: 0}
    let eventIdFactory = eventIdGen(lastEventId.eventId)
    
    //gets values from form
    let eId = eventIdFactory.next().value
    let eName = document.getElementById("event_name").value
    let eDate = document.getElementById("event_date").value
    let eLocation = document.getElementById("event_location").value
    let eTime = document.getElementById("event_time").value
    let eDescription = document.getElementById("event_description").value

    if (eName === "" || eDate === "" || eLocation === "" || eTime === "" || eDescription === "") {
        alert("Please fill out all fields") //if any fields are blank show this alert
    } else {
        eventFactory(eId, eName, eDate, eLocation, eTime, eDescription) //if all fields are filled in then pass values into the eventFactory to create the new event

        document.getElementById("event_None").className = "hideIt" //give default message a class of hide it
        document.getElementById("event_form").removeChild(document.getElementById("event_formContent")) //remove form
    }
}

module.exports = createEvent