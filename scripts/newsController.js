const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const createNewArticle = require("./newsFactory")
const setLocalStorage = require("./setLocalStorage")
const deleteNews = require("./deleteNews")





let writeNews = () => {
    
    let mainDB = getLocalStorage()
    const activeUser = getSessionStorage()
    
    let newsOutpulEl = document.getElementById("Dashboard")
    newsOutpulEl.innerHTML = ""
    let newsHTML = ""
    let friendsArray = mainDB.userFriend.filter(friend => {return activeUser.user.userId === friend.activeUserId })
    let userNewsArray =[]
    friendsArray.forEach(friend => {
        let array = mainDB.news.filter(article => {return article.userId === friend.activeUserId || article.userId === friend.friendUserId})
        let newArray = userNewsArray.concat(array)
        userNewsArray = newArray
    })
    let sorteduserNewsArray = userNewsArray.sort(function(n,p){return p.date - n.date})
    
    sorteduserNewsArray.forEach(
        article => {
            newsHTML += 
            `
            <section class = "newsArticle" id = "newsArticle__${article.newsId}">
            <h2>${article.userFirst} posted a news article: </h2>
            <h1 class = "newsArticle__title"> ${article.title}</h1>
            <h3 class = "newsArticle__summary">Article Synopsis: ${article.summary}</h3>
            <h3 class = "newsArticle__url">${article.url}</h3>
            <button type="button" class = "delete" id="delete_${article.newsId}">Delete</button>
            </section>
            
            `
            // let deleteButton = document.createElement("button")
            // deleteButton.appendChild(document.createTextNode("Delete"))
            // deleteButton.id = `delete_${article.newsId}`
            // deleteButton.addEventListener("click", deleteNews)
            
            
        }
    )
    
    
    newsOutpulEl.innerHTML = newsHTML
    let deleteButtons = document.getElementsByClassName("delete")
    let deleteArray = Array.from(deleteButtons)
    deleteArray.forEach(
        button => {button.addEventListener("click", deleteNews)})

    setLocalStorage(mainDB)
}
    
    

module.exports = writeNews

