//Kristen
//this module creates a new event when a user fills out the New Event form
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const eventFactory = require("./eventFactory")
const todayDate = require("./eventToday")
const storedDb = getLocalStorage()


const createEvent = () => {

    //gets values from form 
    let eName = document.getElementById("event_name").value
    let eDate = document.getElementById("event_date").value
    let eLocation = document.getElementById("event_location").value
    let eDescription = document.getElementById("event_description").value



    const pToday = Date.parse(todayDate()) //parses today's date
    const pEvent = Date.parse(eDate) //parses date of event entered


    if (eName === "" || eDate === "" || eLocation === "" || eDescription === "") {
        alert("Please fill out all fields") //if any fields are blank show this alert

    } else if (pToday > pEvent) { //if the event date is prior to today's date, alert to only enter future events
        alert(`Please enter a date later than ${todayDate()}`)
    } else {
        eventFactory(eName, eDate, eLocation, eDescription) //if all fields are filled in then pass values into the eventFactory to create the new event

        document.getElementById("event_None").className = "hideIt" //give default message a class of hide it
        document.getElementById("event_form").removeChild(document.getElementById("event_formContent")) //remove form
    }
}

module.exports = createEvent