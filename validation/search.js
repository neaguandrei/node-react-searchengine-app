const Validator = require('validator');
const isEmpty =  require('./isEmpty');
module.exports =  function validateSearch(data) {
    let errors = {};

    //data.searchText = !isEmpty(data.searchText) ? data.searchText : '';
    
    if (Validator.isEmpty(data.searchText)) {
        errors.searchText = 'Search text is required to save a search!';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};