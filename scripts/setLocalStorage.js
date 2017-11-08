let setLocalStorage = newDB => {
    let mainDBString = JSON.stringify(newDB)
    localStorage.setItem("nutshellDB", mainDBString)
}

module.exports = setLocalStorage