//Kristen
//purpose create an event object

const eventId = require("./idGenerator")
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")

const storedEvents = getLocalStorage().event

let eventFactory = function(eventName, date, location, time, description) {
    let lastEventId = storedEvents[storedEvents.length- 1] ||  {eventId: 0}
    
    const newEvent = Object.create(null, {
        "eventId": {
            "value": eventId(lastEventId),
            "enumerable": true
        },
        "eventName": {
            "value": eventName,
            "enumerable": true,
            "writable": true,
        },
        "eventDate": {
            "value": date,
            "enumerable": true,
            "writable": true,
        },
        "eventLocation": {
            "value": location,
            "enumerable": true,
            "writable": true,
        },
        "eventTime": {
            "value": time,
            "enumerable": true,
            "writable": true,
        },
        "eventDescription": {
            "value": description,
            "enumerable": true,
            "writable": true,
        }
    })

    storedEvents.push(newEvent)
}