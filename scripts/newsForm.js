const writeNews = require("./newsController")
const createNewArticle = require("./newsFactory")
const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")

const activeUser = getSessionStorage()





let createNews = () => {
    createNewArticle()
    writeNews()
}

let newsForm = () => {
    let newsFormOutput = document.getElementById("Dashboard")

    let newsFormHTML = 
    `
    <section id = "newsForm">
        <input id= "newsForm__title" type="text" placeholder= "Article Title">
        <textarea id = "newsForm__summary" placeholder = "Article Summary"></textarea>
        <input id = "newsForm__url" type="text" placeholder = "Article URL">
        <button id = "createArticle">Post Article</button>
    </section>
    `

    newsFormOutput.innerHTML = newsFormHTML 
    let postNewsButton = document.getElementById("createArticle")
    postNewsButton.addEventListener("click", createNews)
}

module.exports = newsForm
