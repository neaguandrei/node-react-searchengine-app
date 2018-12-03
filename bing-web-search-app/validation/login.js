const Validator = require('validator');
const isEmpty =  require('./isEmpty');
module.exports =  function validateLoginInput(data) {
    let errors = {}; //empty errors

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is not valid';
    }
    
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors) //e empty daca e valid, daca nu jsonul va contine erorile si vor fi returnate 
    };
};