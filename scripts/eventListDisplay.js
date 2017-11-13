//Kristen
//this module displays events in DOM if they already exist in the database for that user

const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const addEventList = require("./eventListController")
const todayDate = require("./eventToday")



const displayEventList = function () {

    const storedDb = getLocalStorage()
    const currentEvents = storedDb.events //events in local storage
    const activeUser = getSessionStorage() 

    const eventListEl = document.getElementById("event_list")

    //if there are events in local storage
    if (currentEvents.length > 0) {
        
        
        const currentUserId = getSessionStorage().user.userId //id of current user
        let friendsArray = storedDb.userFriend.filter(friend => {return activeUser.user.userId === friend.activeUserId || activeUser.user.userId === friend.friendUserId})

        console.log(friendsArray)
        let friendEventArray = []

        friendsArray.forEach(friend => {
            
            let array = currentEvents.filter(cEvent => {
                const notActiveUser = (cEvent.userId !== activeUser.user.userId) //not the session active user
                const fActiveUser = (cEvent.userId === friend.activeUserId) //event Id is equal to the active user on the friend relationship
                const fFriendUser = (cEvent.userId === friend.friendUserId) //event Id is equal to the friend user on the friend relationship
                
                return notActiveUser && fActiveUser || notActiveUser && fFriendUser //return if the event id is NOT equal to the session active user but is equal to either the active or friend user on the friend relationship
            })

            let newArray = friendEventArray.concat(array) //concat events into an array

            friendEventArray = newArray //friend event array contains only friends events and not the active session user

        })

        console.log(friendEventArray)

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