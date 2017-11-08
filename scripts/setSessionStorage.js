let setSessionStorage = newActiveUser => {
    let activeUserString = JSON.stringify(newActiveUser)
    localStorage.setItem("activeUser", activeUserString)
}

module.exports = setSessionStorage