const taskFactory = require("./taskFactory")
const idGenerator = require("./idGenerator")
function taskController() {
    
    const dashboardSection = document.getElementById("Dashboard")
    
    function removeElement(parentId, childId) {
        document.getElementById(parentId).removeChild(document.getElementById(childId))
    }
    
    function init() {
        
        if(document.getElementById("taskListForm")) {
            removeElement("Dashboard", "taskListForm")  
        }

        const tFactory = taskFactory()    
        const taskSection = document.createElement("section")
        taskSection.id = "taskListForm"
        
        /* Temp Off */
        // let html = `<form>
        // <h1>Current Task(s)</h1>`
        // <ul>`
        /* End Temp Off */

        /* Test Area */
        const form = document.createElement("form")
        const ul = document.createElement("ul")
        ul.id = "unorderedTaskList"
        const sessionUserId = tFactory.getSessionUserId()
        const tasksForUser = tFactory.getTasksForUserId(sessionUserId)
        for(let i = 0; i < tasksForUser.length; i++) {
            const task = tasksForUser[i]
            if(!task.taskComplete) {
                const elementId = task.taskId
                // html += `<li>
                // <input type="checkbox" id="task_${elementId}">
                // <label for="task_${elementId}">${task.taskCompletionDate} ${task.taskTitle}</label>
                // </li>`
                const li = document.createElement("li")
                const input = document.createElement("input")
                input.id = `task_${elementId}`
                input.type = "checkbox"
                input.addEventListener("change", markTaskAsComplete)
                li.appendChild(input)
                const label = document.createElement("label")
                // label.setAttribute("for", `task_${elementId}`)
                label.innerHTML = `${task.taskCompletionDate} ${task.taskTitle}`
                label.addEventListener("click", editTaskTitle)
                li.appendChild(label)
                ul.appendChild(li)
            }
        }
        form.appendChild(ul)
        taskSection.appendChild(form)
        /* End Test Area */
        /* Temp Off */
        // html
        // html += `</ul>
        // </form>`
        /* End Temp Off */


        // taskSection.innerHTML = html
        dashboardSection.appendChild(taskSection)
        taskSection.appendChild(createInput("submit", "New Task", "newTaskBtn", displayNewTaskForm))
    }

    function editTaskTitle(e) {
        // e.cancelBubble = true
        // e.stopPropagation()
        // console.log(e)
        const parentLi = e.target.parentNode
        const editForm = document.createElement("form")
        editForm.addEventListener("submit", function(e){e.preventDefault()}, false) // add this magical line to all forms to avoid a page refresh on enter
        const newTaskTitleInput = document.createElement("input")
        newTaskTitleInput.type = "text"
        newTaskTitleInput.addEventListener("keyup", saveNewTitle)
        const newTaskTitleLabel = document.createElement("label")
        newTaskTitleLabel.innerHTML = "Press Enter to Save"
        parentLi.appendChild(editForm)
        editForm.appendChild(newTaskTitleInput)
        editForm.appendChild(newTaskTitleLabel)
    }

    function saveNewTitle(e) {
        const tFactory = taskFactory()
        const taskId = e.target.id.slice(e.target.id.length - 1)
        e.preventDefault()
        // e.cancelBubble = true
        // e.stopPropagation()
        if(e.keyCode === 13) {
            console.log(e.target.value)
            // save edit to database
            tFactory.editTask(taskId, "taskTitle", e.target.value) // TODO 11/10/2017 issue here
            // update dom
        }
    }

    function markTaskAsComplete(e) {
        const taskId = e.target.id.slice(e.target.id.length - 1)
        const tFactory = taskFactory()
        tFactory.editTask(taskId, "taskComplete", true)
        // console.log(this.id)
        document.getElementById("unorderedTaskList").removeChild(document.getElementById(taskId).parentNode) // TODO 11/10/2017 verify this works
        // removeElement("unorderedTaskList", taskId)
    }

    function createInput(type, value, id, fn) {
        const newInput = document.createElement("input")
        newInput.type = type
        newInput.value = value
        newInput.id = id
        newInput.addEventListener("click", fn)
        return newInput
    }

    // TODO 11/10/2017
    // need to convert this html string to created dom elements to add eventlistener to form to avoid refresh
    function displayNewTaskForm() {
        removeElement("taskListForm", "newTaskBtn")
        const newTaskForm = document.createElement("section")
        newTaskForm.id = "newTaskForm"

        let html = `<h2>New Task</h2>
        <form>`

        html += `<label for="newTaskTitle">New Task:</label>
        <input type="text" id="newTaskTitle">
        <label for="estCompletionDate">Estimated Completion Date:</label>
        <input type="date" id="estCompletionDate">`

        html += "</form>"

        newTaskForm.innerHTML = html
        dashboardSection.appendChild(newTaskForm)
        newTaskForm.appendChild(createInput("submit", "Submit", "newTaskSubmit", submitNewTask))
        newTaskForm.appendChild(createInput("submit", "Cancel", "newTaskCancel", cancelNewTask))
    }

    function cancelNewTask() {
        removeElement("Dashboard", "newTaskForm")
        const taskListForm = document.getElementById("taskListForm")
        taskListForm.appendChild(createInput("submit", "New Task", "newTaskBtn", displayNewTaskForm))
    }

    function submitNewTask() {
        const newTaskTitle = document.getElementById("newTaskTitle").value
        const newTaskDate = document.getElementById("estCompletionDate").value
        
        const tFactory = taskFactory()
        const sessionUserId = tFactory.getSessionUserId()
        tFactory.addTaskToLocalStorage(sessionUserId, newTaskTitle, newTaskDate)
        
        removeElement("Dashboard", "newTaskForm")
        init()
    }

    init()
} 

module.exports = taskController