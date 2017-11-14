
let getLocalStorage = require("./getLocalStorage")
let buildDashboard = require("./buildDashboard")
let copyUser = require("./copyUser")

const userSignIn = function () {

    let storedDB = getLocalStorage()
    
    let userName = document.getElementById("user_userName").value
    let userPassword = document.getElementById("user_password").value
    console.log("hello")

    storedDB.users.forEach(function (user) {
        if (user.userName === userName) {
            if (user.password === userPassword) {
                copyUser(user)
                buildDashboard()
            } else {
                alert("password does not match, try again. Careful: password check is case sensitive")
            }
        } else {
            alert("user not found! please register!")
        }
    })
    
}
module.exports = userSignIn