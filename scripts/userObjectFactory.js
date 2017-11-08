// Tyler and Garrett. This module take the value from the user creation form,
// uses them to create a user object, and then pushes the object into our
// user database array

const idGenerator = require("./idGenerator")
const userDb = require("./users")

let userIdFactory = idGenerator()

let userObjectFactory = function (firstName, lastName, userName, email) {
    userDb.push(
        Object.create(null, {
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
    )
}

let createUser = () => {
    let userFN = document.getElementById("user_firstName").value
    let userLN = document.getElementById("user_lastName").value
    let userName = document.getElementById("user_userName").value
    let userEmail = document.getElementById("user_email").value

    userObjectFactory(userFN, userLN, userName, userEmail)
}

module.exports = createUser