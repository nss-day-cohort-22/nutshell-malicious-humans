//Author : Garrett Ward
//Function to autoscroll inputed element to bottom of element


const autoScroll = function (element) {

    element.scrollTo(0, element.scrollHeight)
}

module.exports = autoScroll