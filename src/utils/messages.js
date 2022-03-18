const generateMessage = (username,text) => {
    return {
        username: username.trim().toUpperCase(),
        text: text,
        createdAt: new Date().getTime()
    }
}
const generateLocationMessage = (username, url) => {
    return {
        username: username.trim().toUpperCase(),
        url,
        createdAt: new Date().getTime()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}