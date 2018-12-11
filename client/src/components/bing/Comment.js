import React, { Component } from 'react'
import {getComment, updateComment} from '../../actions/commentActions';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
class Comment extends Component {
  state = {
    commentText: '',
    idSearch: ''
  }
  componentDidMount() {
    this.setState({
      idSearch: this.props.comments.currentComment.idSearch,
      commentText: this.props.comments.currentComment.commentText
    });

    if (this.state.commentText === undefined || this.state.commentText === null) {

    }
    console.log(this.props.comments.currentComment);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    e.target.value = e.target.value;
    console.log(e.target.value);
  }
  onSubmit(e) {
    e.preventDefault(); //ca sa scot ce e default
    console.log(this.props.comments.currentComment.commentText + ' ' + this.props.comments.currentComment.idSearch);

    let updatedObj = {
        commentText: this.state.commentText,
        idSearch: this.props.comments.currentComment.idSearch
    }
    console.log(this.state);
    this.props.updateComment(updatedObj);
  }
  render() {
    const { commentText } = this.props.comments.currentComment;
    return (
      <div>
        <form>
            <div className="form-group">
            <label htmlFor="textArea">Your comment related to the search</label>
            <input className="form-control" name="commentText" onChange={this.onChange.bind(this)} id="textArea" rows="5" defaultValue={commentText}></input>
            </div>
            
            <button className="btn btn-light" onClick={this.onSubmit.bind(this)}><Link to="/searches">
            Save
            </Link> </button>
            <button className="btn btn-light" style={{marginLeft: 15}}><Link to="/searches">
            Return
            </Link> </button>
        </form>
      </div> 
    )
  }
}

Comment.propTypes = {
  comments: PropTypes.object.isRequired,
  getComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comments: state.comments
});

export default connect(
  mapStateToProps,
  { getComment, updateComment}
)(Comment);
