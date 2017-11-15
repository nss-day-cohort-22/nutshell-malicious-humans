//Tyler: This module exports a function that pulls down local storage and parses it.

let getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("nutshellDB"))
}

module.exports = getLocalStorage