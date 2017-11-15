//Tyler: This module creates a form that the user can complete to create a news article.

const writeNews = require("./newsController")
const createNewArticle = require("./newsFactory")
const getLocalStorage = require("./getLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const revealDashLink = require("./revealDashLink")

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
    <h1 id="newForm__formTitle">Add News Article</h1> <br>
    <input id= "newsForm__title" type="text" placeholder= "Article Title"> <br>
    <textarea id = "newsForm__summary" placeholder = "Article Summary"></textarea> <br>
    <input id = "newsForm__url" type="text" placeholder = "Article URL"> <br>
    <button id = "createArticle">Post Article</button>
    </section>
    `
    
    newsFormOutput.innerHTML = newsFormHTML 
    let postNewsButton = document.getElementById("createArticle")
    postNewsButton.addEventListener("click", createNews)
    revealDashLink()
}

module.exports = newsForm
