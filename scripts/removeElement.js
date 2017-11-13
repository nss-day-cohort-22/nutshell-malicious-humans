// Module Author: Jason Figueroa
// Module Purpose: The purpose of this module is to remove an element from the dom.

// function accepts both the parentId and childId as strings
const removeElement = (parentId, childId) => {
    const parentNode = document.getElementById(parentId)
    const childNode = document.getElementById(childId)

    parentNode.removeChild(childNode)
}

module.exports = removeElement