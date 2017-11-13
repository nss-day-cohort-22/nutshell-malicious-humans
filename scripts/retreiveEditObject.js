
const retreiveEditObject = function () {
    return JSON.parse(localStorage.getItem("editObject"))
}

module.exports = retreiveEditObject