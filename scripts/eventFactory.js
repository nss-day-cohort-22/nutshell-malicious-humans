//Kristen
//this module create an event object, adds it to the DOM and to local storage
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")

const storedDb = getLocalStorage()

let eventFactory = function(eventId, eventName, date, location, description) {

    const newEvent = Object.create(null, {
        "userId": {
            "value": getSessionStorage().user.userId,
            "enumerable": true
        },
        "eventId": {
            "value": eventId,
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
        "eventDescription": {
            "value": description,
            "enumerable": true,
            "writable": true,
        }
    })

    storedDb.events.push(newEvent) //add newEvent to events array
    addEventList(newEvent) //add the newEvent to the DOM
    setLocalStorage(storedDb) //set local storage
    
}

module.exports = eventFactory