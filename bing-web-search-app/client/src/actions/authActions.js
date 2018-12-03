import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode'; //ca sa extragem userul din stringul 'bearer token123123'

// Register user
export const registerUser = (userData, history) => dispatch => { //dispatch catre reducer
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login')) //in /api/users/register primim in json res.data userul. 
        .catch(err =>                       // ne folosim the history din withRouter pt a redirecta spre login dupa register
            dispatch({ // ajax call
                type: GET_ERRORS,
                payload: err.response.data
            })
            ); // punem in stateul errors obiectul gresit
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then( res => {
            console.log(res);
            // Save to local storage
            const { token } = res.data; //destructuring
            // Set token to local storage (pot pune doar strings)
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data + expiration time
            const decoded = jwtDecode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data
            })
            );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return { //decoded == user si SET_CURRENT_USER
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Scoatem tokenul din localStorage
    localStorage.removeItem('jwtToken');
    // Scoatem auth header pentru alte requesturi din viitor
    setAuthToken(false);
    // Userul curent va deveni empty object {} ce va modifica isAuthenticated in false
    dispatch(setCurrentUser({})); //o sa ducem stateul in initialState cu empty obj dupa ce actiunea trece prin reducer
}