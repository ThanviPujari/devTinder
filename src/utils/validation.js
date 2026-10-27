const validator = require('validator')
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is not valid.')
    }
    if (!validator.isEmail(emailId)) {
        throw new Error('Invalid Email.')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Enter a strong password.')
    }
    if (req.body.skills?.length > 10) {
        throw new Error("More than 10 skills aren't allowed.")
    }
}

module.exports = {
    validateSignUpData
}