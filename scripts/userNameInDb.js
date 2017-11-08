// Jason Figueroa
// Module checks to see if a username exists in database

// Module accepts a username and an object
// Searches the object for key "users" 
// Then iterates the value of key, an array of objects 
// Then searches each object in array for key "userName"
// If value of key "userName" in object matches parameter username function returns true 

function userNameInDb(userName, dbObj) {

    let userInDb = false

    dbObj.users.forEach(userObj => {
        if(userObj.userName === userName) {
            userInDb = true
        }
    })

    return userInDb
}

module.exports = userNameInDb
