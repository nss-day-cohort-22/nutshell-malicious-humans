// Module Author: Jason Figueroa
// Module Purpose: The purpose of this module is to handle data extraction and 
// manipulation for user tasks in the main database.
const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const idGenerator = require("./idGenerator")

// this function returns an object made up of methods allowing the developer to 
// interact with the database
function taskFactory() {
    return Object.create(null, {
        getSessionUserId: {
            value: function () {
                return getSessionStorage().user.userId
            } 
        },
        getTasksFromLocalStorage: {
            value: function () {
                return getLocalStorage().tasks
            }
        },
        getTasksForUserId: {
            value: function (id) {
                return this.getTasksFromLocalStorage().filter(task => task.userId === id)
            }
        },
        addTaskToLocalStorage: {
            value: function (userId, title, completionDate) {
                const db = getLocalStorage()
                db.tasks.push({
                    taskId: idGenerator(db.tasks.length).next().value,
                    userId: userId,
                    taskTitle: title,
                    taskCompletionDate: completionDate,
                    taskComplete: false
                })
                setLocalStorage(db)
            },
        },
        editTask: {
            value: function(taskId, key, value) {
                const db = getLocalStorage()
                
                db.tasks.forEach(task => {
                    if(task.taskId == taskId) {
                        task[key] = value
                    }
                })

                setLocalStorage(db)
            }
        }
    })
}

module.exports = taskFactory