import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; // ca sa ne conectam la React
import classnames from "classnames"; // pt validare
import { loginUser } from "../../actions/authActions";
import { getPreferences } from "../../actions/preferencesActions";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/main");
    }
  }
  
  //cand primim props
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/main"); // daca e logat -> dashboard
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); //ca sa scot ce e default

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
    

    //construiesc obiectul pt a prelua din .headers cand iau pe backend
    const userHeadersPreferences = {
      headers: {
        email: this.state.email
      }
    }
    this.props.getPreferences(userHeadersPreferences);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your BingSearchManager account
              </p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email // is-invalid o sa apara doar daca errors.firstName exista (errors vine din state). errors.firstName a fost declarat in validation
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password // is-invalid o sa apara doar daca errors.firstName exista (errors vine din state). errors.firstName a fost declarat in validation
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired, 
  getPreferences: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, getPreferences }
)(Login);
