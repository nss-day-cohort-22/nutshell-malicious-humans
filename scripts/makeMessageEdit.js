const submitMessageEdit = require("./submitMessageEdit")
const autoScroll = require("./autoScroll")

const makeMessageEdit = function (event) {

    if (document.getElementById("messageEditText") === null) {
        
        let targetDiv = event.target.parentElement
        let editDiv = document.createElement("div")
        let editText = document.createElement("textarea")
        editText.id = "messageEditText"
        let submitEditButton = document.createElement("button")
        submitEditButton.id = "submitMessageEditTextButton"
        submitEditButton.appendChild(document.createTextNode("Submit Edit"))
        editDiv.appendChild(editText)
        editDiv.appendChild(submitEditButton)
        targetDiv.appendChild(editDiv)
        submitEditButton.addEventListener("click", submitMessageEdit)
        let  messageDisplayArea = document.getElementById("messageDisplaySection")
        autoScroll(messageDisplayArea)
    }
}

module.exports = makeMessageEdit