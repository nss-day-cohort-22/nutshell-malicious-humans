const displayActiveUser = require("./displayActiveUser")
const newsForm = require("./newsForm")
const writeNews = require("./newsController")
const buildMessageBoard = require("./buildMessageBoard")
const taskController = require("./taskController.js")
const eventController = require("./eventController.js")
const displayUsers = require("./displayUsers")
const displayFriends = require("./displayFriends")



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
    tasksDiv.appendChild(document.createTextNode("Manage your tasks"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let tasksButton = document.createElement("button")
    tasksButton.appendChild(document.createTextNode("Go"))
    tasksButton.id = "tasks_Button"
    tasksButton.addEventListener("click", function(){
        taskController()
    })
    //append the button to the tasks div
    tasksDiv.appendChild(tasksButton)

    // create div for messages link
    // create a div and store it in a variable. Then add text to that div
    let messagesDiv = document.createElement("div")
    messagesDiv.appendChild(document.createTextNode("Use the chatroom"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let messagesButton = document.createElement("button")
    messagesButton.appendChild(document.createTextNode("Enter"))
    messagesButton.id = "messages_Button"
    messagesButton.addEventListener("click", buildMessageBoard)
    //append the button to the tasks div
    messagesDiv.appendChild(messagesButton) 

    // create div for events link
    // create a div and store it in a variable. Then add text to that div
    let eventsDiv = document.createElement("div")
    eventsDiv.appendChild(document.createTextNode("View or create upcoming events"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let eventsButton = document.createElement("button")
    eventsButton.appendChild(document.createTextNode("Check it Out"))
    eventsButton.id = "events_Button"
    eventsButton.addEventListener("click", eventController)
    //append the button to the tasks div
    eventsDiv.appendChild(eventsButton)

    // create div for news
    // create a div and store it in a variable. Then add text to that div
    let newsDiv = document.createElement("div")
    newsDiv.appendChild(document.createTextNode("View or contribute to the latest breaking news"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let createNewsButton = document.createElement("button")
    createNewsButton.appendChild(document.createTextNode("Post News"))
    createNewsButton.id = "create_news_button"
    createNewsButton.addEventListener("click", newsForm)
    //append the button to the tasks div
    newsDiv.appendChild(createNewsButton)
    let showNewsButton = document.createElement("button")
    showNewsButton.appendChild(document.createTextNode("Show News"))
    showNewsButton.id = "show_news_button"
    showNewsButton.addEventListener("click", writeNews)
    newsDiv.appendChild(showNewsButton)

    // create div for friends link
    // create a div and store it in a variable. Then add text to that div
    let friendsDiv = document.createElement("div")
    friendsDiv.appendChild(document.createTextNode("Your friends"))
    //create a button that allows users to navigate to the tasks page, give that button an id
    let friendsButton = document.createElement("button")
    friendsButton.appendChild(document.createTextNode("Add Friends"))
    friendsButton.id = "friends_Button"
    friendsButton.addEventListener("click", displayUsers)
    //append the button to the tasks div
    friendsDiv.appendChild(friendsButton)
    let showFriendsButton = document.createElement("button")
    showFriendsButton.appendChild(document.createTextNode("Show Current Friends"))
    showFriendsButton.id = "show_Friends_button"
    showFriendsButton.addEventListener("click", displayFriends)
    friendsDiv.appendChild(showFriendsButton)


    let dashButtonMarker = document.getElementById("headerId")
    let returnToDashButton = document.createElement("button")
    returnToDashButton.id = "returnToDashButton"
    returnToDashButton.classList.add("btn", "btn-secondary", "hideIt")
    returnToDashButton.appendChild(document.createTextNode("Return To Dashboard"))
    dashButtonMarker.appendChild(returnToDashButton)
    returnToDashButton.addEventListener("click", function () {
        location.reload()
    })

    let logOutButton = document.createElement("button")
    logOutButton.id = "logOutButton"
    logOutButton.classList.add("btn", "btn-secondary")
    logOutButton.appendChild(document.createTextNode("Log Out"))
    dashButtonMarker.appendChild(logOutButton)
    logOutButton.addEventListener("click", function () {
        sessionStorage.clear()
        location.reload()
    })



    //append all divs to Dashboard section element
    dashBoardMarker.appendChild(friendsDiv)
    dashBoardMarker.appendChild(messagesDiv)
    dashBoardMarker.appendChild(tasksDiv)
    dashBoardMarker.appendChild(eventsDiv)
    dashBoardMarker.appendChild(newsDiv)

}

module.exports = buildDashboard