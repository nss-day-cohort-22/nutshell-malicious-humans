let addUserForm = require("./userFormController")
let getLocalStorage = require("./getLocalStorage")
let buildDashboard = require("./buildDashboard")
let copyUser = require("./copyUser")
let getSessionStorage = require("./getSessionStorage")

const userSignIn = function () {

    let storedDB = getLocalStorage()
    
    let userName = document.getElementById("user_userName").value
    let userPassword = document.getElementById("user_password").value

    storedDB.users.forEach(function (user) {
        if (user.userName === userName) {
            if (user.password === userPassword) {
                copyUser(user)
                buildDashboard()
            } else {
                alert("password does not match, try again. Careful: password check is case sensitive")
            }
        }
    })

    let sessionObj = getSessionStorage()
    if (sessionObj === null) {
        alert("user not found! please register!")
        location.reload()
    }
    
}
module.exports = userSignIn