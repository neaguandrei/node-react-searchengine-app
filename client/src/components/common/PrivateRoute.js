import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route 
    {...rest}
    render = {props => 
        auth.isAuthenticated === true ? ( //daca este logat, loaduieste componenta
            <Component {...props} />
        ) : (
            <Redirect to="/login" /> //daca nu este logat, da redirect catre login
        )
    }
  />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
