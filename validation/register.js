const Validator = require('validator');
const isEmpty =  require('./isEmpty');
module.exports =  function validateRegisterInput(data) {
    let errors = {}; //empty errors

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''; // daca nu este empty atunci este orice o fi
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (!Validator.isLength(data.firstName, {min: 2, max: 30})) {
        errors.firstName = 'First name must be between 2 and 30 characters';
    }
    if (!Validator.isLength(data.lastName, {min: 2, max: 30})) {
        errors.lastName = 'Last name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is not valid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 28})) {
        errors.password = 'Password must be between 6 and 28 characters!';
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm password field is required';
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors) //e empty daca e valid, daca nu jsonul va contine erorile si vor fi returnate 
    };
};