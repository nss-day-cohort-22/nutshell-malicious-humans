// Module Author: Jason Figueroa
// Module Purpose: The purpose of this module is to render all user task related 
// html to the user, capture any input from the user and hand the data off to the 
// taskFactory module for processing
const taskFactory = require("./taskFactory")
const idGenerator = require("./idGenerator")
const newButton = require("./newButton")
const removeElement = require("./removeElement")
const revealDashLink = require("./revealDashLink")

function taskController() {
    
    const dashboardSection = document.getElementById("Dashboard")
    
    function init() {
        
        if(document.getElementById("taskListForm")) {
            removeElement("Dashboard", "taskListForm")  
        }

        const tFactory = taskFactory()    
        const taskSection = document.createElement("section")
        taskSection.id = "taskListForm"
        
        const form = document.createElement("form")
        const ul = document.createElement("ul")
        ul.id = "unorderedTaskList"
        const sessionUserId = tFactory.getSessionUserId()
        const tasksForUser = tFactory.getTasksForUserId(sessionUserId)
        for(let i = 0; i < tasksForUser.length; i++) {
            const task = tasksForUser[i]
            if(!task.taskComplete) {
                const elementId = task.taskId
                const li = document.createElement("li")
                li.id = `task_${elementId}`
                const input = document.createElement("input")
                input.type = "checkbox"
                input.addEventListener("change", markTaskAsComplete)
                li.appendChild(input)
                const label = document.createElement("label")
                label.innerHTML = `${task.taskCompletionDate} ${task.taskTitle}`
                label.addEventListener("click", editTaskTitle)
                li.appendChild(label)
                ul.appendChild(li)
            }
        }
        form.appendChild(ul)
        taskSection.appendChild(form)
        dashboardSection.appendChild(taskSection)
        taskSection.appendChild(newButton("New Task", "newTaskBtn", displayNewTaskForm))
    }

    function editTaskTitle(e) {
        if(!document.getElementById("editTaskForm")) {
            const parentLi = e.target.parentNode
            const editForm = document.createElement("form")
            editForm.id = "editTaskForm"
            editForm.addEventListener("submit", function(e){e.preventDefault()}, false) // add this magical line to all forms to avoid a page refresh on enter
            const newTaskTitleInput = document.createElement("input")
            newTaskTitleInput.type = "text"
            newTaskTitleInput.addEventListener("keyup", saveNewTitle)
            const newTaskTitleLabel = document.createElement("label")
            newTaskTitleLabel.innerHTML = "Press Enter to Save"
            parentLi.appendChild(editForm)
            editForm.appendChild(newTaskTitleInput)
            editForm.appendChild(newTaskTitleLabel)
            newTaskTitleInput.focus()
        }
    }

    function saveNewTitle(e) {
        if(e.keyCode === 13) {
            const tFactory = taskFactory()
            const input = e.target
            const form = input.parentNode
            const li = form.parentNode
            const taskId = li.id.slice(li.id.length - 1) 
            
            // save edit to database
            tFactory.editTask(taskId, "taskTitle", input.value)
            
            // get rid of form
            li.removeChild(form)

            // update label
            const label = li.querySelector("label")
            const taskDate = label.innerHTML.split(" ")[0] 
            label.innerHTML = `${taskDate} ${input.value}`
        }
    }

    function markTaskAsComplete(e) {
        const taskId = e.target.parentNode.id
        
        const ul = document.getElementById("unorderedTaskList")
        const li = document.getElementById(taskId)
        
        const tFactory = taskFactory()
        
        tFactory.editTask(taskId.slice(taskId.length - 1), "taskComplete", true)

        ul.removeChild(li)
    }

    // TODO 11/10/2017 (this may not be needed)
    // need to convert this html string to created dom elements to add eventlistener to form to avoid refresh
    function displayNewTaskForm() {
        removeElement("taskListForm", "newTaskBtn")
        const newTaskForm = document.createElement("section")
        newTaskForm.id = "newTaskForm"

        const h2 = document.createElement("h2")
        h2.innerHTML = "New Task"
        const form = document.createElement("form")
        const inputLabel = document.createElement("label")
        inputLabel.htmlFor = "newTaskTitle"
        inputLabel.innerHTML = "New Task:"
        const input = document.createElement("input")
        input.type = "text"
        input.id = "newTaskTitle"
        input.required = true
        const dateLabel = document.createElement("label")
        dateLabel.htmlFor = "estCompletionDate"
        dateLabel.innerHTML = "Estimated Completion Date:"
        const datePicker = document.createElement("input")
        datePicker.type = "date"
        datePicker.id = "estCompletionDate"
        datePicker.required = true

        // assembling form
        form.appendChild(inputLabel)
        form.appendChild(input)
        form.appendChild(dateLabel)
        form.appendChild(datePicker)

        // appending form to section
        newTaskForm.appendChild(form)

        newTaskForm.appendChild(newButton("Submit", "newTaskSubmit", submitNewTask))
        newTaskForm.appendChild(newButton("Cancel", "newTaskCancel", cancelNewTask))
        dashboardSection.appendChild(newTaskForm)
    }

    function cancelNewTask() {
        removeElement("Dashboard", "newTaskForm")
        const taskListForm = document.getElementById("taskListForm")
        taskListForm.appendChild(newButton("New Task", "newTaskBtn", displayNewTaskForm))
    }

    function submitNewTask() {
        const newTaskTitle = document.getElementById("newTaskTitle").value
        const newTaskDate = document.getElementById("estCompletionDate").value

        // makeshift form validation
        if(!newTaskTitle && !newTaskDate) {
            alert("missing date and title")
        } else if(!newTaskTitle) {
            alert("missing title")
        } else if(!newTaskDate) {
            alert("missing date")
        } else {
            // if title and date are provided form is processed
            const tFactory = taskFactory()
            const sessionUserId = tFactory.getSessionUserId()
            tFactory.addTaskToLocalStorage(sessionUserId, newTaskTitle, newTaskDate)
            
            removeElement("Dashboard", "newTaskForm")
            init()
        }
    }

    init()
    revealDashLink()
} 

module.exports = taskController