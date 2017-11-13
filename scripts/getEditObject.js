
const getEditObject = function (editId, editText, editAuthor) {
    
    return {
        "updatedMessageId": editId,
        "updatedMessageText": editText,
        "updatedMessageAuthor": editAuthor,
    }
}

module.exports = getEditObject