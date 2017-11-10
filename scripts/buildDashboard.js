const displayActiveUser = require("./displayActiveUser")
const taskController = require("./taskController.js")

const buildDashboard = function () {
    //hide landing page and sign up form sections
    let landingSection = document.getElementById("landingPage")
    landingSection.classList.add("hideIt")
    let formSection = document.getElementById("userFormSection")
    formSection.classList.add("hideIt")
    displayActiveUser()

    // declare a variable to store the html injection location for the dashboard using an id
    let dashBoardMarker = document.getElementById("Dashboard")

    // create div for tasks link
    // create a div and store it in a variable. Then add text to that div
    let tasksDiv = document.createElement("div")
    tasksDiv.appendChild(document.createTextNode("Click to create or view Tasks"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let tasksButton = document.createElement("button")
    tasksButton.appendChild(document.createTextNode("Click"))
    tasksButton.id = "tasks_Button"
    tasksButton.addEventListener("click", function(){
        taskController()
    })
    //append the button to the tasks div
    tasksDiv.appendChild(tasksButton)

    // create div for messages link
    // create a div and store it in a variable. Then add text to that div
    let messagesDiv = document.createElement("div")
    messagesDiv.appendChild(document.createTextNode("Click to create or view messages"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let messagesButton = document.createElement("button")
    messagesButton.appendChild(document.createTextNode("Click"))
    messagesButton.id = "messages_Button"
    messagesButton.addEventListener("click", function(){})
    //append the button to the tasks div
    messagesDiv.appendChild(messagesButton) 

    // create div for events link
    // create a div and store it in a variable. Then add text to that div
    let eventsDiv = document.createElement("div")
    eventsDiv.appendChild(document.createTextNode("Click to create or view events"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let eventsButton = document.createElement("button")
    eventsButton.appendChild(document.createTextNode("Click"))
    eventsButton.id = "events_Button"
    eventsButton.addEventListener("click", function(){})
    //append the button to the tasks div
    eventsDiv.appendChild(eventsButton)

    // create div for news
    // create a div and store it in a variable. Then add text to that div
    let newsDiv = document.createElement("div")
    newsDiv.appendChild(document.createTextNode("Click to create or view News"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let newsButton = document.createElement("button")
    newsButton.appendChild(document.createTextNode("Click"))
    newsButton.id = "news_Button"
    newsButton.addEventListener("click", function(){})
    //append the button to the tasks div
    newsDiv.appendChild(newsButton)

    // create div for friends link
    // create a div and store it in a variable. Then add text to that div
    let friendsDiv = document.createElement("div")
    friendsDiv.appendChild(document.createTextNode("Click to add or view Friends"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let friendsButton = document.createElement("button")
    friendsButton.appendChild(document.createTextNode("Click"))
    friendsButton.id = "friends_Button"
    friendsButton.addEventListener("click", function(){})
    //append the button to the tasks div
    friendsDiv.appendChild(friendsButton)

    //append all divs to Dashboard section element
    dashBoardMarker.appendChild(friendsDiv)
    dashBoardMarker.appendChild(messagesDiv)
    dashBoardMarker.appendChild(tasksDiv)
    dashBoardMarker.appendChild(eventsDiv)
    dashBoardMarker.appendChild(newsDiv)

}

module.exports = buildDashboard