const writeNews = require("./newsController")
const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")




let deleteObj = (event) => {
    let mainDB = getLocalStorage()
    let id = parseInt(event.target.id.split("_")[1])
    let article = document.getElementById("newsArticle__"+id)
    article.classList.add("hideIt")
    let newsArray = mainDB.news
    let articleIndex = newsArray.findIndex(object => {return object.newsId === id})
    if((articleIndex-1) === -1){
        newsArray.shift()
    } 
    else {
        newsArray.splice((articleIndex), 1)
    }
    
    mainDB.news = newsArray
    setLocalStorage(mainDB)
}

let deleteNews = () => {
    deleteObj(event)
}

module.exports = deleteNews