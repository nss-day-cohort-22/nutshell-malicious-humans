//Tyler: This module exports a function that pulls down Session storage and parses it.

let getSessionStorage = () => {
    return JSON.parse(sessionStorage.getItem("activeUser"))
}

module.exports = getSessionStorage