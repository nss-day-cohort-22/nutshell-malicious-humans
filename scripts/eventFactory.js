//Kristen
//purpose create an event object
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")

const storedDb = getLocalStorage()

let eventFactory = function(eventId, eventName, date, location, time, description) {

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

    storedDb.events.push(newEvent)
    addEventList(newEvent)
    setLocalStorage(storedDb)
    
}

module.exports = eventFactory