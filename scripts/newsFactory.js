const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const setLocalStorage = require("./setLocalStorage")
const idGenerator = require("./idGenerator")
const userNewsDB = require("./userNews")
const mainDB = getLocalStorage()


let NewsArticleObjFactory = (articleName, articleSum, articleURL) => {
    const activeUserObj = getSessionStorage()
    let lastId = mainDB.news[mainDB.news.length- 1] ||  {newsId: 0}
    let newsIdFactory = idGenerator(lastId.newsId)
    mainDB.news.push(Object.create(null, {
        "newsId": {
            value: newsIdFactory.next().value,
            enumerable:true
        },
        "userId": {
            value: activeUserObj.user.userId,
            enumerable: true
        },
        "title": {
            value: articleName,
            enumerable: true
        },
        "summary": {
            value: articleSum,
            enumerable: true
        },
        "url": {
            value: articleURL,
            enumerable: true
        },
        "date": {
            value: Date.now(),
            enumerable: true
        }
    }))
}



let createNewArticle = () => {
    let articleTitle = document.getElementById("newsForm__title").value
    let articleSummary = document.getElementById("newsForm__summary").value
    let articleURL = document.getElementById("newsForm__url").value

    NewsArticleObjFactory(articleTitle, articleSummary, articleURL)
    setLocalStorage(mainDB)

}

module.exports = createNewArticle


