import React, { Component } from "react";

class SearchRow extends Component {
  render() {
    return (
      <div>
        <a
          key={this.props.search.id}
          href={this.props.search.url}
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.search.name}</h5>
          </div>
          <p className="mb-1">{this.props.search.snippet}</p>
        </a>
      </div>
    );
  }
}

export default SearchRow;
