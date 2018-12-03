import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getSearches, deleteSearch } from "../../actions/mySearchesActions";
import PropTypes from "prop-types";

class MySearches extends Component {
  componentDidMount() {
    this.props.getSearches();
  }

  onDeleteClick = idSearch => {
    this.props.deleteSearch(idSearch);
  };

  render() {
    const { searches } = this.props.search;
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
                  <Button color="info" style={{ marginTop: 10 }}>
                    View comments
                  </Button>
                  <Button
                    color="success"
                    style={{ marginLeft: 775, marginTop: 10 }}
                  >
                    Quick search
                  </Button>
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
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { getSearches, deleteSearch }
)(MySearches);
