let getSessionStorage = () => {
    return JSON.parse(sessionStorage.getItem("activeUser"))
}

module.exports = getSessionStorage