//Kristen
//functionality when the update button is pressed

const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")
const eventFactory = require("./eventFactory")
const storedDb = getLocalStorage()

const updateEvent = function (event) {

    const eId = parseInt(
        Array.from(event.target.classList)
            .find(editClass => {
                if(editClass.startsWith("update_")) return editClass
            })
            .split("_")[1]
    ) //gets the class of button clicked and identifies the eventId

    // let eId = eventIdFactory.next().value
    let eNameEdit = document.getElementById("event_nameEdit").value
    let eDateEdit = document.getElementById("event_dateEdit").value
    let eLocationEdit = document.getElementById("event_locationEdit").value
    let eTimeEdit = document.getElementById("event_timeEdit").value
    let eDescriptionEdit = document.getElementById("event_descriptionEdit").value

    console.log(eNameEdit, eDateEdit, eLocationEdit, eTimeEdit, eDescriptionEdit)

    if (eNameEdit === "" || eDateEdit === "" || eLocationEdit === "" || eTimeEdit === "" || eDescriptionEdit === "") {
        alert("Please fill out all fields")
    } else {
        eventFactory(eId, eNameEdit, eDateEdit, eLocationEdit, eTimeEdit, eDescriptionEdit)
        console.log("qq")
    }
}

// const createEvent = () => {


//     if (eName === "" || eDate === "" || eLocation === "" || eTime === "" || eDescription === "") {
//         alert("Please fill out all fields")
//     } else {
//         eventFactory(eIdEdit, eName, eDate, eLocation, eTime, eDescription)

//         setLocalStorage(storedDb)

//     }
//     // document.getElementById("event_formContent").innerHTML = " "
//     document.getElementById("event_form").removeChild(document.getElementById("event_formContent"))
// }

module.exports = updateEvent