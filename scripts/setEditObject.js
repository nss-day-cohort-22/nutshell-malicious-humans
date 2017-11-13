
const setEditObject = function (editObject) {
    let editObjectString = JSON.stringify(editObject)
    localStorage.setItem("editObject", editObjectString)
}


module.exports = setEditObject