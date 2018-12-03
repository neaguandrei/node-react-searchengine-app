import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import SearchRow from "./SearchRow";
import { search } from "../../actions/searchActions";
import { addSearch } from "../../actions/mySearchesActions";
import { getPreferences, setPreferences } from '../../actions/preferencesActions';
import classnames from "classnames";

class Search extends Component {
  state = {
    query: "",
    rows: [],
    results: {},
    optionsState: [],
    errors: {},
    preferences: {}
  };    

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  getSearches() {
    let searchRows = [];
    this.props.results.results.forEach(value => {
      const searchRow = <SearchRow search={value} />;
      searchRows.push(searchRow);
    });
    this.setState({
      rows: searchRows
    });
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props
        .search(this.state.query, localStorage.getItem("jwtToken"))
        .then(() => this.getSearches());
    }
  };

  onChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.query);
    // if (this.state.query) {
    //   this.setState({
    //     errors: {}
    //   })
    // }
    //const { email } = this.props.auth.user;
    this.props.addSearch({
      searchText: this.state.query,
      date: this.getCurrentDate(),
      userEmail: "andreineagu.c@gmail.com"
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="form-group">
          <h1 className="display-5 mb-4 text-center"> </h1>
          <small id="searchHelp" className="form-text text-muted">
            Enter whatever comes in your mind
          </small>
          <input
            type="text"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.searchText // is-invalid o sa apara doar daca errors.firstName exista (errors vine din state). errors.firstName a fost declarat in validation
            })}
            id="searchBing"
            aria-describedby="searchHelp"
            placeholder="Search the web"
            name="searchText"
            onChange={this.onChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          {errors.searchText && (
                    <div className="invalid-feedback">{errors.searchText}</div>
                  )}
        </div>

        <small id="priorityHelp" className="form-text text-muted">
          Preferences
        </small>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cbWeb"
            value="option1"
          />
          <label className="form-check-label" htmlFor="cbWeb">
            Web pages
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cbNews"
            value="option2"
          />
          <label className="form-check-label" htmlFor="cbNews">
            News
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cbImages"
            value="option3"
          />
          <label className="form-check-label" htmlFor="cbImages">
            Images
          </label>
        </div>
        <br />
        <div>
          <small id="fromHelp" className="form-text text-muted">
            From
          </small>
          <select className="custom-select my-1 mr-sm-2 " id="selectTime">
            <option defaultValue>Choose...</option>
            <option value="1">24 hours ago</option>
            <option value="2">Past week</option>
            <option value="3">Past month</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-lg btn-block"
          onClick={this.onSubmit.bind(this)}
        >
          Save to quick search
        </button>
        <br />
        {this.state.rows}
      </div>
    );
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  query: PropTypes.string,
  results: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  preferences: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  query: state.query,
  results: state.results,
  preferences: state.preferences,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { search, addSearch, getPreferences, setPreferences }
)(Search);
