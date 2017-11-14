// Garrett Ward, This is a function to make our basic landing page
// that prompts the user to create a profile
let addUserForm = require("./userFormController")

let buildLandingPage = function () {
    let landingPageMarker = document.getElementById("landingPage")
    
    // added class="btn btn-primary" to the button
    landingPageMarker.innerHTML += `
    <div>
    <h1>
    Welcome to Get a life!
    </h1>
    <button class="btn btn-primary" id="showUserForm"> Sign Up!</button>
    </div>
    `
    let showFormButton = document.getElementById("showUserForm")
    showFormButton.addEventListener("click", addUserForm)
}


module.exports = buildLandingPage 
