//Kristen
//calculates today's date so that only future events can be added

const todayDate = () => {
    const today = new Date()
    const year = today.getFullYear().toString()
    const month = (today.getMonth()+1).toString()
    const day = today.getDate().toString()
        
    const fullDate = year + "-" + month + "-" + day

    return fullDate
}

module.exports = todayDate