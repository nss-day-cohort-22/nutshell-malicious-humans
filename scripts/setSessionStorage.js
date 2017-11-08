let setSessionStorage = newActiveUser => {
    let activeUserString = JSON.stringify(newActiveUser)
    sessionStorage.setItem("activeUser", activeUserString)
}

module.exports = setSessionStorage