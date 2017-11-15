//Tyler: This module exports a function that sets session storage.


let setSessionStorage = newActiveUser => {
    let activeUserString = JSON.stringify(newActiveUser)
    sessionStorage.setItem("activeUser", activeUserString)
}

module.exports = setSessionStorage