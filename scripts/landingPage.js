// Garrett Ward, This is a function to make our basic landing page
// that prompts the user to create a profile
let addUserForm = require("./userFormController")
let signInForm = require("./signInForm")

let buildLandingPage = function () {
    let landingPageMarker = document.getElementById("landingPage")
    landingPageMarker.innerHTML += `
    <div>
    <img src="../img/nutshell.jpg" alt="black and white image of a nutshell">
    <h1>
    Welcome to Malicious Nutshell!
    </h1>
    <button class="btn btn-primary" id="showUserForm"> Sign Up!</button>
    <button class="btn btn-primary" id="showUserSignIn">Sign In!</button>
    </div>
    `
    let showFormButton = document.getElementById("showUserForm")
    showFormButton.addEventListener("click", addUserForm)
    let showSignInButton = document.getElementById("showUserSignIn")
    showSignInButton.addEventListener("click", signInForm)

}


module.exports = buildLandingPage 
