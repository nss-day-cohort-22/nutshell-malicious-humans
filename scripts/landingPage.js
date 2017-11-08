// Garrett Ward, This is a function to make our basic landing page
// that prompts the user to create a profile

let buildLandingPage = function () {
    let landingPageMarker = document.getElementById("landingPage")
    landingPageMarker.innerHTML += `
    <div>
    <h1>
    Welcome to Get a life!
    </h1>
    <button> Sign Up!</button>
    </div>
    `
}

module.exports = buildLandingPage 
