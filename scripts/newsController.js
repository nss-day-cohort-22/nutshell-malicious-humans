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
    let friendsArray = mainDB.userFriend.filter(friend => {return activeUserId === friend.activeUserId || activeUserId === friend.friendUserId})
    let friendId = []
    friendsArray.forEach(friend => {
        if(friend.friendUserId !== activeUserId){
            let id = friend.friendUserId
            if(friendId.includes(id)===false){
                friendId.push(id)
            }} else {
            if(friend.activeUserId !== activeUserId){
                let id = friend.activeUserId
                if(friendId.includes(id)===false){
                    friendId.push(id)
                }
            }
        }
    })
    let friendNews =[]
    friendId.forEach(friendId => {
        friendNews.push(mainDB.news.filter(article => {return article.userId === friendId}))
    })
    friendNews = [].concat.apply([], friendNews)
    
    let currentUserNews =[]
    currentUserNews.push(mainDB.news.filter(article => {
        return article.userId === activeUserId
    }))
    currentUserNews = [].concat.apply([], currentUserNews)

    
    let userNewsArray = currentUserNews.concat(friendNews)
    let sorteduserNewsArray = userNewsArray.sort(function(n,p){return p.date - n.date})
    
    sorteduserNewsArray.forEach(
        article => {

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

            if(article.userId === activeUserId) {
                newsHTML +=
                `
                <button type="button" class = "delete" id="delete_${article.newsId}">Delete</button>
                </section>
                `
            } else {
                newsHTML += "</section>"
            }
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
    revealDashLink()
}
    
    

module.exports = writeNews

