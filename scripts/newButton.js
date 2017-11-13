// Module Author: Jason Figueroa
// Module Purpose: The purpose of this module is to create an input element to be 
// used as a button.

const newButton = (value, id, fn) => {
    const newInput = document.createElement("input")
    newInput.type = "submit"
    newInput.value = value
    newInput.id = id
    newInput.addEventListener("click", fn)
    return newInput
}

module.exports = newButton