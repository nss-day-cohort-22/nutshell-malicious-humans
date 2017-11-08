let getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("nutshellDB"))
}

module.exports = getLocalStorage