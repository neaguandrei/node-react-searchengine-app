import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//import axios from 'axios';
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

// REQUEST trebuie trimis din REDUX ACTION
// RESPONSE este trimis prin REDUX REDUCER pentru a ajunge la COMPONENTA

// npm install classnames --> if something's true then add this class
class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    //errors from redux state -> in props cu maps -> si cand avem new propr cu erori vor fi setate in comp state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  //onChange pentru cand userul scrie si o sa-i da fire, e = event. [e.target.name] => daca e email
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault(); //ca sa scot ce e default

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userType: "user", //default user
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    //withRouter
    this.props.registerUser(newUser, this.props.history); // this.props.history ne lasa sa redirectam din actionul: registerUser
    // //console.log(newUser); am pus proxy in package.json de aceea pot pune doar ruta
    // axios.post('/api/users/register', newUser)
    //     .then(res => console.log(res.data)) //in /api/users/register primim in json res.data userul
    //     .catch(err => this.setState({errors: err.response.data})); // punem in stateul errors obiectul gresit
  }

  //noValidate -> scoate validarea de la html5
  render() {
    //destructuring
    const { errors } = this.state; // acelasi lucru const errors = this.state.errors pentru a scoate errors din stea catre ce e in {}
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your BingSearchManager account to manage your searches!
              </p>
              <form noValidate onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.firstName // is-invalid o sa apara doar daca errors.firstName exista (errors vine din state). errors.firstName a fost declarat in validation
                    })} //primul param e ce e default - va avea mereu acele clase
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.firstName} // pun {} ca sa pot sa folosesc js expression
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.lastName
                    })}
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  {/* <small classNameName="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small> */}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//register e action dar e si prop
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  //pentru a pune stateul in proprietati si sa accesam dupa cu this.props.auth
  auth: state.auth, // "auth" vine de la rootReducer (index.js) auth: authReducer
  errors: state.errors
});
// export default Register; + //withRouter pt redirectare (44 + 140 )
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
