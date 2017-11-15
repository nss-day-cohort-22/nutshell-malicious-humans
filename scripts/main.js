//behold the magic of browserify

let buildLandingPage = require("./landingPage")
let mainDB = require("./nutshellDB")
let setLocalStorage = require("./setLocalStorage")
let getSessionStorage = require("./getSessionStorage")
let buildDashboard = require("./buildDashboard")

setLocalStorage(mainDB)

let sessionStorage = getSessionStorage()
if(sessionStorage === null){
    buildLandingPage()
} else {
    buildDashboard()
}
