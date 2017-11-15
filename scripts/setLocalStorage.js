//Tyler: This module exports a function that sets local storage.

let setLocalStorage = newDB => {
    let mainDBString = JSON.stringify(newDB)
    localStorage.setItem("nutshellDB", mainDBString)
}

module.exports = setLocalStorage