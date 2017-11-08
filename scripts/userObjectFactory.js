// Tyler and Garrett. This module take the value from the user creation form,
// uses them to create a user object, and then pushes the object into our
// user database array

const idGenerator = require("./idGenerator")
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")

const copyUser = require("./copyUser")
const buildDashboard = require("./buildDashboard")


const storedMainDB = getLocalStorage()



let userObjectFactory = function (firstName, lastName, userName, email) {
    let lastId = storedMainDB.users[storedMainDB.users.length- 1] ||  {userId: 0}
    let userIdFactory = idGenerator(lastId.userId)
    let newUser = Object.create(null, {
        "userId": {
            "value": userIdFactory.next().value,
            "enumerable": true
        },
        "firstName": {
            "value": firstName,
            "enumerable": true,
            "writable": true
        },
        "lastName": {
            "value": lastName,
            "enumerbale": true,
            "writable": true
        },
        "userName": {
            "value": userName,
            "enumerable": true,
        },
        "email": {
            "value": email,
            "enumerable": true,
            "writable": true
        }
    })
    storedMainDB.users.push(newUser)
    copyUser(newUser)
    
}

let createUser = () => {
    let userFN = document.getElementById("user_firstName").value
    let userLN = document.getElementById("user_lastName").value
    let userName = document.getElementById("user_userName").value
    let userEmail = document.getElementById("user_email").value

    if(userFN === "" || userLN === "" || userName === "" || userEmail === "") {
        alert("Please complete all fields")
    } else {
        userObjectFactory(userFN, userLN, userName, userEmail)

        setLocalStorage(storedMainDB)
        buildDashboard()
    }
    
}

module.exports = createUser