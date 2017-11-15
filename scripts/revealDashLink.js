//Author : Garrett Ward
//Functionality : reveals the return to dashboard button. executs when user leaves dashboard.

const revealDashLink = function () {
    let dashButton = document.getElementById("returnToDashButton")
    dashButton.classList.remove("hideIt")
}

module.exports = revealDashLink