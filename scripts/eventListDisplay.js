//Kristen
//this module displays events in DOM if they already exist in the database for that user

const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")
const todayDate = require("./eventToday")



const displayEventList = function () {

    const storedDB = getLocalStorage()
    const currentEvents = storedDB.events //events in local storage

    const eventListEl = document.getElementById("event_list")

    //if there are events in local storage
    if (currentEvents.length > 0) {
        const currentUserId = getSessionStorage().user.userId //id of current user
        currentEvents.sort( function(a, b) { //sort events by date, need to parse into an integer
            const dateA = Date.parse(a.eventDate) 
            const dateB = Date.parse(b.eventDate)
            return dateA - dateB
        }).forEach( event => {
            if(event.userId === currentUserId) { //if the event userId matches the id of the current user 
                const dateToday = Date.parse(todayDate()) //today's date parsed
                const eventDate = Date.parse(event.eventDate) //event date parsed
                if(dateToday <= eventDate) {
                    addEventList(event) //then add the event to the DOM
                    document.getElementById("event_None").className = "hideIt" //and give the default message a class of hideIt
                }
            }   
        })
    }

}

module.exports = displayEventList

// doesn't work yet:
// const dateToday = Date.now()
// const eventDate = Date.parse(event.eventDate)
// if(eventDate > dateToday) { //doesn't display events that happened before today's date
//     addEventList(event)
// }