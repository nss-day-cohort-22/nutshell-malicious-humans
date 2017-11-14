//Kristen
//this module displays events in DOM if they already exist in the database for that user

const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")
const todayDate = require("./eventToday")



const displayEventList = function () {

    const storedDb = getLocalStorage()
    const storedEvents = storedDb.events //events in local storage
    
    const eventListEl = document.getElementById("event_list")
    
    //if there are events in local storage
    if (storedEvents.length > 0) {
        
        const currentUserId = getSessionStorage().user.userId //id of current user
        
        let friendsArray = storedDb.userFriend.filter(friend => {return currentUserId === friend.activeUserId || currentUserId === friend.friendUserId}) //array of current user's friends

        let eventsToDisplay = [] //array that holds events that the current user's friends have created

        //filters through friendsArray and adds their events to the eventsToDisplay
        friendsArray.forEach(friend => {
            
            let array = storedEvents.filter(cEvent => {
                const notActiveUser = (cEvent.userId !== currentUserId) //event userId is not equal to the session active user
                const activeId = (cEvent.userId === friend.activeUserId) //event userId is equal to the active user on the friend relationship
                const friendId = (cEvent.userId === friend.friendUserId) //event userId is equal to the friend user on the friend relationship
            
                return (notActiveUser && (activeId || friendId))//id is NOT equal to the session active user but is equal to either the active or friend user on the friend relationship
            })

            let friendsEvents = eventsToDisplay.concat(array) //concat events into an array

            eventsToDisplay = friendsEvents //adds friendEvents into eventsToDisplay

            // console.log(friendsEvents)
        })

        //returns the events that have the current active user as the event userId
        const currentUserEvents = storedEvents.filter(event => {
            return event.userId === currentUserId
        })

        //adds the current active user's events to the eventsToDisplay array
        eventsToDisplay = eventsToDisplay.concat(currentUserEvents)


        eventsToDisplay.sort( function(a, b) { //sort events by date, need to parse into an integer
            const dateA = Date.parse(a.eventDate) 
            const dateB = Date.parse(b.eventDate)
            return dateA - dateB
        }).forEach( event => {
            const dateToday = Date.parse(todayDate()) //today's date parsed
            const eventDate = Date.parse(event.eventDate) //event date parsed
            if(dateToday <= eventDate) {
                addEventList(event) //then add the event to the DOM
                document.getElementById("event_None").className = "hideIt" //and give the default message a class of hideIt
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

// storedEvents.sort( function(a, b) { //sort events by date, need to parse into an integer
//     const dateA = Date.parse(a.eventDate) 
//     const dateB = Date.parse(b.eventDate)
//     return dateA - dateB
// }).forEach( event => {
//     if(event.userId === currentUserId) { //if the event userId matches the id of the current user 
//         const dateToday = Date.parse(todayDate()) //today's date parsed
//         const eventDate = Date.parse(event.eventDate) //event date parsed
//         if(dateToday <= eventDate) {
//             addEventList(event) //then add the event to the DOM
//             document.getElementById("event_None").className = "hideIt" //and give the default message a class of hideIt
//         }
//     }   
// })