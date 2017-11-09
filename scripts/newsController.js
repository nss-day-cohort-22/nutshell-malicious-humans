const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const createNewArticle = require("./newsFactory")



let writeNews = () => {
    
    let mainDB = getLocalStorage()
    const activeUser = getSessionStorage()
    
    let newsOutpulEl = document.getElementById("Dashboard")
    newsOutpulEl.innerHTML = ""
    let newsHTML = ""

    let userNewsArray = mainDB.news.filter(article => {return article.userId === activeUser.user.userId })

    userNewsArray.forEach(
        article => {
            newsHTML += 
            `
            <section class = "newsArticle" id = "newsArticle__${article.newsId}>
                <h2>${activeUser.firstName} ${activeUser.lastName} posted a news article:
                <h1 class = "newsArticle__title"> ${article.title}</h1>
                <h3 class = "newsArticle__summary">Article Synopsis: ${article.summary}</h3>
                <h3 class = "newsArticle__url">${article.url}</h3
            </section>

            `
        }
    )

    newsOutpulEl.innerHTML = newsHTML

}



module.exports = writeNews

