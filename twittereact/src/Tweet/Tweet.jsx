import React, { Component } from 'react';
import './Tweet.css';
import PropTypes from 'prop-types';

class Tweet extends Component{
  constructor(props){
    super(props);
    //passing parameters
    this.tweetContent = props.tweetContent;
    this.tweetId = props.tweetId;
    this.username = props.username;
  }

  handleremoveTweet(id){
    this.props.removeTweet(id);
  }

  render(props){
      return(
        <div className="note fade-in">
          <p className="userDisplay">User: {this.username}</p>
          <span className="closetbtn"
              onClick={() => this.handleremoveTweet(this.tweetId)}>
              &times;
          </span>
          <p className="tweetContent">{this.tweetContent}</p>
        </div>
      )
  }
}

//set parameter type
Tweet.propTypes = {
  tweetContent:PropTypes.string,
  username:PropTypes.string
}

export default Tweet;
