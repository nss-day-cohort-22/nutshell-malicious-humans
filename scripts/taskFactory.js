const getLocalStorage = require("./getLocalStorage")
const setLocalStorage = require("./setLocalStorage")
const getSessionStorage = require("./getSessionStorage")
const idGenerator = require("./idGenerator")

function taskFactory() {
    // function getTaskWithId(obj, taskId) {
    //     const taskObj = obj.getTasksForUserId(obj.getSessionUserId).filter(task => task.taskId === taskId)
    //     console.log(taskObj)
    // }
    // function markTaskAsComplete(e) {
    //     const taskId = this.id
    //     // console.log(taskId)
    //     getTaskWithId(taskId)
    // }
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
        // getTaskWithId: {
        //     value: function(taskId, tasks) {
        //         const taskObj = getTasksForUserId(getSessionUserId).filter(task => task.taskId === taskId)
        //         console.log(taskObj)
        //     }
        // },
        markTaskAsComplete: {
            value: function(taskId) {
                // let taskId = this.id.toString()
                // console.log(typeof taskId)
                // taskId = taskId.slice(this.id.length - 1)
                // console.log(taskId)
                // getTaskWithId(this, taskId)
                const db = getLocalStorage()
                
                db.tasks.forEach(task => { // slice the end of taskId 
                    if(task.taskId == taskId.slice(taskId.length - 1)) {
                        task.taskComplete = true
                    }
                })

                setLocalStorage(db)
            }
        } 
    })
}

module.exports = taskFactory