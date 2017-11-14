// Tyler and Garrett. This module take the value from the user creation form,
// uses them to create a user object, and then pushes the object into our
// user database array

const idGenerator = require("./idGenerator")
const setLocalStorage = require("./setLocalStorage")
const getLocalStorage = require("./getLocalStorage")

const copyUser = require("./copyUser")
const buildDashboard = require("./buildDashboard")
const userNameInDb = require("./userNameInDb")
const userEmailInDb = require("./userEmailInDb")


let userObjectFactory = function (firstName, lastName, userName, email, password) {
    let storedMainDB = getLocalStorage()
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
            "enumerable": true,
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
        },
        "password": {
            "value": password,
            "enumerable": true,
            "writable": true
        },
        "friends": {
            "value": [],
            "enumerable": true,
            "writable": true
        }
    })
    storedMainDB.users.push(newUser)
    copyUser(newUser)
    setLocalStorage(storedMainDB)
    

}

let createUser = () => {
    let storedMainDB = getLocalStorage()
    let userFN = document.getElementById("user_firstName").value
    let userLN = document.getElementById("user_lastName").value
    let userName = document.getElementById("user_userName").value
    let userEmail = document.getElementById("user_email").value
    let userPassword = document.getElementById("user_password").value

    if(userFN === "" || userLN === "" || userName === "" || userEmail === "" || userPassword === "") {
        alert("Please complete all fields")
    } else if(userNameInDb(userName, storedMainDB) === true && userEmailInDb(userEmail, storedMainDB) === true)  {
        //get user from local storage
        const userArray = storedMainDB.users
        const currentUser = userArray.filter( user => {
            return user.userName === userName && user.email === userEmail
        }
        )
        copyUser(currentUser[0])
        buildDashboard()
    } else {
        //create new user and set user as active in session storage 
        userObjectFactory(userFN, userLN, userName, userEmail, userPassword)

        //add user to local storage
        // setLocalStorage(storedMainDB)
        //launch dashboard
        buildDashboard()
    }
    
}

module.exports = createUser