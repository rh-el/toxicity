const isValidEmail = (str: string): boolean => {
    const regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
    return regex.test(str)
}

const isValidUsernamePassword = (str: string): boolean => {
    return str.length >= 3
}


module.exports = { isValidEmail, isValidUsernamePassword }