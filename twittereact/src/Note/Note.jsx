import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{
  constructor(props){
    super(props);
    //passing parameters
    this.tweetContent = props.tweetContent;
    this.noteId = props.noteId;
  }

  handleremoveTweet(id){
    this.props.removeTweet(id);
  }

  render(props){
      return(
        <div className="note fade-in">
          <span className="closetbtn"
              onClick={() => this.handleremoveTweet(this.noteId)}>
              &times;
          </span>
          <p className="tweetContent">{this.tweetContent}</p>
        </div>
      )
  }
}

//set parameter type
Note.propTypes = {
  tweetContent:PropTypes.string
}

export default Note;
