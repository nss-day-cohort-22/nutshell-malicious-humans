//Tyler: This module contains a function that filters through the news articles stored in local storage and grabs the active users and their friends articles and prints them to the DOM.

const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const createNewArticle = require("./newsFactory")
const setLocalStorage = require("./setLocalStorage")
const deleteNews = require("./deleteNews")
const revealDashLink = require("./revealDashLink")





let writeNews = () => {
    
    let mainDB = getLocalStorage()
    const activeUserId = getSessionStorage().user.userId
    
    let newsOutpulEl = document.getElementById("Dashboard")
    newsOutpulEl.innerHTML = ""
    let newsHTML = ""
    //array that holds all the userFriend relationship objects that contain the activeUserID.
    let friendsArray = mainDB.userFriend.filter(friend => {return activeUserId === friend.activeUserId || activeUserId === friend.friendUserId})
    let friendId = []
    //filters throught the friends array and gets the friend userId of all users in the userFriend relationships EXCEPT the current active User
    friendsArray.forEach(friend => {
        if(friend.friendUserId !== activeUserId){
            let id = friend.friendUserId
            if(friendId.includes(id)===false){
                friendId.push(id)
            }} else {
            if(friend.activeUserId !== activeUserId){
                let id = friend.activeUserId
                //checks to see if the friend user Id is currently in the array, this prevents duplicate news articles from being printed.
                if(friendId.includes(id)===false){
                    friendId.push(id)
                }
            }
        }
    })
    //filters through the news article database and pulls the articles whose author is a friend of the activeUser.
    let friendNews =[]
    friendId.forEach(friendId => {
        friendNews.push(mainDB.news.filter(article => {return article.userId === friendId}))
    })
    //because the friendNews is currently an array of arrays, the following code will turn the array of arrays into one array of the data.
    friendNews = [].concat.apply([], friendNews)
    //filters through the news article databas and pulls the articles whose author is the activeUser
    let currentUserNews =[]
    currentUserNews.push(mainDB.news.filter(article => {
        return article.userId === activeUserId
    }))

    currentUserNews = [].concat.apply([], currentUserNews)

    //concats the userNews and friendNews arrays into one array containing all the news article objects.
    let userNewsArray = currentUserNews.concat(friendNews)
    //sorts the news article objects by date.
    let sorteduserNewsArray = userNewsArray.sort(function(n,p){return p.date - n.date})
    
    //iterates over each object and creates the innerHTML for the articles.
    sorteduserNewsArray.forEach(
        article => {
            //this checks to see if the author id is the activeUser or a friend.  It gives the DOM element a different class depending on which it is.
            if(article.userId !== activeUserId){
                newsHTML += `<section class = "newsArticle friendArticle" id = "newsArticle__${article.newsId}">`
            } else {
                newsHTML += `<section class = "newsArticle activeUserArticle" id = "newsArticle__${article.newsId}">`
            }

            newsHTML += 
            `
            <h2>${article.userFirst} posted a news article: </h2>
            <h1 class = "newsArticle__title"> ${article.title}</h1>
            <h3 class = "newsArticle__summary">Article Synopsis: ${article.summary}</h3>
            <h3 class = "newsArticle__url"><a href="https://${article.url}" target= "_blank">${article.url}</a></h3>
            `
            //this checks to see if the author userId is the activeUser, if it is it adds a delete button to the article innerHTML.
            if(article.userId === activeUserId) {
                newsHTML +=
                `
                <button type="button" class = "delete" id="delete_${article.newsId}">Delete</button>
                </section>
                `
            } else {
                newsHTML += "</section>"
            }
        }
    )
    //prints the articles to the DOM
    newsOutpulEl.innerHTML = newsHTML

    //targets all the delete buttons and adds an event listener to them that will run the delete article function.
    let deleteButtons = document.getElementsByClassName("delete")
    let deleteArray = Array.from(deleteButtons)
    deleteArray.forEach(
        button => {button.addEventListener("click", deleteNews)})

    setLocalStorage(mainDB)
    revealDashLink()
}
    
    

module.exports = writeNews

