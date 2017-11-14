const userSignIn = require("./userSignIn")

const userFormEl = document.getElementById("userFormSection")

const signInForm = function () {

    document.getElementById("showUserForm").classList.add("hideIt") //hides sign-up button
    document.getElementById("showUserSignIn").classList.add("hideIt") 
    
    const formDiv = document.createElement("div") //creates a div to hold the form
    formDiv.id = "user_form"
    
    //creates content for the form
    let userFormString = `
                <label for="user_userName">Username</label>    
                    <input type="text" id="user_userName" name="user_userName" required="required">
                <label for="user_password">Password</label>    
                    <input type="password" id="user_password" name="user_password" required="required">
        
        ` 
    formDiv.innerHTML = userFormString //adds the form content to the div
        
    // creates register button for the form
    const formSubmitButton = document.createElement("input")
    formSubmitButton.type = "submit"
    formSubmitButton.value = "Sign in"
    formSubmitButton.id = "user_submitForm"
    formDiv.appendChild(formSubmitButton) //appends register button to the div

    const refreshButton = document.createElement
    
    userFormEl.appendChild(formDiv) //appends the div to the form element
    formSubmitButton.addEventListener("click", userSignIn)


}

module.exports = signInForm