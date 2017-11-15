//Author : Garrett Ward
//Functionality : Generates a Dom element that will contain a text entry area 
//for the user to write an edit for their message, and a button to submit
//the change

const submitMessageEdit = require("./submitMessageEdit")
const autoScroll = require("./autoScroll")

const makeMessageEdit = function (event) {

    //use an if statement ot make sure a message edit div is not 
    //already opened on the dom
    if (document.getElementById("messageEditText") === null) {
        //capture the target's parent element(div to be edited)
        let targetDiv = event.target.parentElement
        //create virtual elements and append them to the DOM
        let editDiv = document.createElement("div")
        let editText = document.createElement("textarea")
        editText.id = "messageEditText"
        let submitEditButton = document.createElement("button")
        submitEditButton.id = "submitMessageEditTextButton"
        submitEditButton.classList.add("btn", "btn-secondary")
        submitEditButton.appendChild(document.createTextNode("Submit Edit"))
        editDiv.appendChild(editText)
        editDiv.appendChild(submitEditButton)
        targetDiv.appendChild(editDiv)
        //add an event listener that invokes a function to submit the edit written
        //by the user
        submitEditButton.addEventListener("click", submitMessageEdit)
        let  messageDisplayArea = document.getElementById("messageDisplaySection")
        autoScroll(messageDisplayArea)
    }
}

module.exports = makeMessageEdit