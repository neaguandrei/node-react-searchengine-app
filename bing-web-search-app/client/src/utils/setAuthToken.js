import axios from 'axios';

// Verifica daca exista tokenul. Daca nu exista, il sterge - daca exista, il pune in header.
const setAuthToken = token => {
    if (token) {
        // Se aplica la toate requesturile
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Stergere Auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;