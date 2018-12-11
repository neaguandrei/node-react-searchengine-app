import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import SearchRow from "./SearchRow";
import { search } from "../../actions/searchActions";
import { addSearch, setQuickSearch, disableQuickSearch} from "../../actions/mySearchesActions";
import {
  getPreferences,
  setPreferences
} from "../../actions/preferencesActions";
import { createComment } from "../../actions/commentActions";

import classnames from "classnames";

// PROBLEMA LA VALUE JOS CU UNCONTROLLED COMPONENT
class Search extends Component {
  state = {
    query: "",
    rows: [],
    results: {},
    optionsState: [],
    errors: {},
    preferences: {},
    searches: [],
    isQuickSearch: false,
    quickSearchId: -1
  };

  // persistenta preferences
  loadPreferencesFromDb() {
    const userHeadersPreferences = {
      headers: {
        email: this.props.auth.user.email
      }
    };
    this.props.getPreferences(userHeadersPreferences);
  }
  //Functia care se apeleaza pt a verifica daca e quick search sau nu in mount
  quickSearchEnabledSearchVerification() {
    this.setState({
      searches: this.props.searches.searches,
      isQuickSearch: this.props.searches.isQuickSearch,
      quickSearchId: this.props.searches.quickSearchId
  });

  setTimeout(() => {
    console.log('State searches' + this.state.searches + ' rest: ' + this.state.isQuickSearch + ' ' + this.state.quickSearchId);
    if (this.state.isQuickSearch === true && this.state.quickSearchId !== -1) {
      console.log('Quick search activated!');
      let queryFromSearchId = -1;
      console.log('Quick search activated!' + this.state.searches.length);
      for (var i = 0; i < this.state.searches.length; i++) {
        if (this.state.searches[i].idSearch === this.state.quickSearchId) {
          console.log(this.state.searches[i].idSearch +  ' === ' + this.state.quickSearchId);
          queryFromSearchId = this.state.searches[i].searchText;
        }
      }

      if (queryFromSearchId !== -1) {
        console.log(queryFromSearchId + ' a fost gasit!');
        this.props.search(queryFromSearchId, localStorage.getItem("jwtToken"))
        .then(() => this.getSearches());  
      } else {
        console.log('Deactivating quick search');
      }
      setTimeout(() => {
        this.props.disableQuickSearch();
      }, 2000);
    }
  }, 2000);
  }
  componentDidMount() {
    //construiesc obiectul pt a prelua din .headers cand iau pe backend
    //preiau din backend preferences
    this.loadPreferencesFromDb();
    this.quickSearchEnabledSearchVerification();   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  getSearches() {
    var uniqueKey = 99999;
    let searchRows = [];
    this.props.results.results.forEach(value => {
      const searchRow = <SearchRow search={value} key={uniqueKey++} />;
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
    
    let myPromise = new Promise ((res, rej) => {
      this.props.addSearch({
        searchText: this.state.query,
        date: this.getCurrentDate(),
        userEmail: this.props.auth.user.email
      });
      setTimeout(function() {
        res('Search added. Comment will be added in 3 seconds.');
      }, 2000);
    })

    myPromise.then(successMessage => {
      console.log(successMessage);

      var { idSearch } = this.props.searches.searches[0];
      console.log(idSearch);
      var newComment = {
        commentText: 'empty',
        idSearch: idSearch
      }
      this.props.createComment(newComment);
    })
    .catch(err => console.log(err));
  }
  checkBoxOnChange(e) {
    switch (e.target.value) {
      case "webPages":
        this.setState({
          preferences: {
            webPages: !this.state.preferences.webPages
          }
        });
        console.log(this.state.preferences.webPages);
        break;
      case "news":
        this.setState({
          preferences: {
            news: !this.state.preferences.news
          }
        });
        break;
      case "images": 
        this.setState({
          preferences: {
            images: !this.state.preferences.images
          }
        });
        break;

      default:
        break;
    }

    let temp = {
      preferences: {
        webPages: this.state.preferences.webPages,
        news: this.state.preferences.news,
        images: this.state.preferences.images,
        from: this.state.preferences.from,
        userEmail: this.props.auth.user.email
      }
    };
    
    this.props.setPreferences(temp.preferences);
    this.loadPreferencesFromDb();
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
            value="webPages"
            defaultChecked={`"${this.state.webPages}"`}
            onChange={this.checkBoxOnChange.bind(this)}
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
            value="news"
            defaultChecked={`"${this.state.news}"`}
            onChange={this.checkBoxOnChange.bind(this)}
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
            value="images"
            defaultChecked={`"${this.state.images}"`}
            onChange={this.checkBoxOnChange.bind(this)}
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
          <select
            className="custom-select my-1 mr-sm-2 "
            id="selectTime"
            defaultValue="1"
          >
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
  preferences: PropTypes.object.isRequired,
  addSearch: PropTypes.func.isRequired,
  getPreferences: PropTypes.func.isRequired,
  setPreferences: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  searches: PropTypes.object.isRequired,
  createComment: PropTypes.func.isRequired,
  setQuickSearch: PropTypes.func.isRequired,
  disableQuickSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  query: state.query,
  results: state.results,
  preferences: state.preferences,
  errors: state.errors,
  auth: state.auth,
  searches: state.searches
});

export default connect(
  mapStateToProps,
  { search, addSearch, getPreferences, setPreferences, createComment, setQuickSearch, disableQuickSearch }
)(Search);
