const users = require("./users")
const tasks = require("./tasks")
const news = require("./news")
const messages = require("./messages")
const friends = require("./friends")
const events = require("./events")
const userEvent = require("./userEvent")
const userFriend = require("./userFriend")
const userNews = require("./userNews")
let getLocalStorage = require("./getLocalStorage")


const mainDB = getLocalStorage() || 
{
    "users": users,
    "tasks": tasks,
    "news": news,
    "messages": messages,
    "friends": friends,
    "events": events,
    "userEvent": userEvent,
    "userFriend": userFriend,
    "userNews": userNews
}


module.exports = mainDB