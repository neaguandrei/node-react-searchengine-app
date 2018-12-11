import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getSearches, deleteSearch } from "../../actions/mySearchesActions";
import { getComment } from "../../actions/commentActions";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import { enableQuickSearch } from "../../actions/mySearchesActions";

class MySearches extends Component {
 
  componentDidMount() {
    const userWithHeaders = {
      headers: {
        email: this.props.auth.user.email
      }
    }
    this.props.getSearches(userWithHeaders);
  }

  onDeleteClick = idSearch => {
    this.props.deleteSearch(idSearch);
  };

  viewComments = idSearch => {
    const commentHeaders = {
      headers: {
        idSearch: idSearch
      }
    }
    console.log('searching id: ' + idSearch);
    this.props.getComment(commentHeaders);
  }

  quickSearch = idSearch => {
    this.props.enableQuickSearch(idSearch);
  }

  render() {
    const { searches } = this.props.searches;
    return (
      
      <Container>
        <ListGroup>
          <TransitionGroup className="searches-list">
            {searches.map(({ idSearch, searchText }) => (
              <CSSTransition key={idSearch} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, idSearch)}
                  >
                    &times;
                  </Button>
                  {searchText} <br />
                  <Link to="/comment">
                  <Button
                   color="info"
                   style={{ marginTop: 10 }}
                   onClick={this.viewComments.bind(this, idSearch)}
                   >
                   View comment
                   </Button>
                  </Link>
                  <Link to="/main">
                  <Button
                    color="success"
                    style={{ marginLeft: 775, marginTop: 10 }}
                    onClick={this.quickSearch.bind(this, idSearch)}
                  >
                    Quick search
                  </Button>
                  </Link>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

MySearches.propTypes = {
  getSearches: PropTypes.func.isRequired,
  searches: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getComment: PropTypes.func.isRequired,
  enableQuickSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searches: state.searches,
  auth: state.auth,
  currentComment: state.currentComment
});

export default connect(
  mapStateToProps,
  { getSearches, deleteSearch, getComment, enableQuickSearch}
)(MySearches);
