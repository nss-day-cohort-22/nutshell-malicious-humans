// Jason Figueroa
// Module checks to see if a email exists in database

// Module accepts a email and an object
// Searches the object for key "users" 
// Then iterates the value of key, an array of objects 
// Then searches each object in array for key "email"
// If value of key "email" in object matches parameter email function returns true 

function userEmailInDb(email, dbObj) {

    let emailInDb = false

    dbObj.users.forEach(userObj => {
        if(userObj.email === email) {
            emailInDb = true
        }
    })

    return emailInDb
}

module.exports = userEmailInDb
