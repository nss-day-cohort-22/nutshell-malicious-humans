//Kristen
//this module creates a new event when a user fills out the New Event form
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")
const eventFactory = require("./eventFactory")
const storedDb = getLocalStorage()


const createEvent = () => {

    //gets values from form 
    let eName = document.getElementById("event_name").value
    let eDate = document.getElementById("event_date").value
    let eLocation = document.getElementById("event_location").value
    let eDescription = document.getElementById("event_description").value

    //calculates today's date so that only future events can be added


    // } else if (pToday < pEvent){
    //     console.log(Date.parse(eDate))

    const today = new Date()
    const year = today.getFullYear().toString()
    const month = (today.getMonth()+1).toString()
    const day = today.getDate().toString()
    
    const fullDate = year + "-" + month + "-" + day

    const pToday = Date.parse(fullDate) //today's date should be less than the event date
    const pEvent = Date.parse(eDate)


    if (eName === "" || eDate === "" || eLocation === "" || eDescription === "") {
        alert("Please fill out all fields") //if any fields are blank show this alert

    } else if (pToday > pEvent) { //if today's date is after the event date, alert to only enter future events
        alert(`Please enter a date later than ${fullDate}`)
    } else {
        eventFactory(eName, eDate, eLocation, eDescription) //if all fields are filled in then pass values into the eventFactory to create the new event

        document.getElementById("event_None").className = "hideIt" //give default message a class of hide it
        document.getElementById("event_form").removeChild(document.getElementById("event_formContent")) //remove form
    }
}

module.exports = createEvent