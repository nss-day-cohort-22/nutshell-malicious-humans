let buildLandingPage = require("./landingPage")
let mainDB = require("./nutshellDB")
let setLocalStorage = require("./setLocalStorage")

setLocalStorage(mainDB)
buildLandingPage()
