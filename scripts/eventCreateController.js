//Kristen
//creates the event 
const eventIdGen = require("./idGenerator")
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const eventFactory = require("./eventFactory")
const storedDb = getLocalStorage()


const createEvent = () => {
    let lastEventId = storedDb.events[storedDb.events.length- 1] ||  {eventId: 0}
    let eventIdFactory = eventIdGen(lastEventId.eventId)
    
    let eId = eventIdFactory.next().value
    let eName = document.getElementById("event_name").value
    let eDate = document.getElementById("event_date").value
    let eLocation = document.getElementById("event_location").value
    let eTime = document.getElementById("event_time").value
    let eDescription = document.getElementById("event_description").value

    if (eName === "" || eDate === "" || eLocation === "" || eTime === "" || eDescription === "") {
        alert("Please fill out all fields")
    } else {
        eventFactory(eId, eName, eDate, eLocation, eTime, eDescription)

        document.getElementById("event_None").className = "hideIt"
        document.getElementById("event_form").removeChild(document.getElementById("event_formContent"))
    }
}

module.exports = createEvent