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
    this.timeStamp = props.timeStamp;
  }

  handleremoveTweet(id){
    this.props.removeTweet(id);
  }

  render(props){
      return(
        <div className="note fade-in">
          <div className="buttonContainer">
            <div className="makeRight">
              <span className="closebtn"
                  onClick={() => this.handleremoveTweet(this.tweetId)}>
                  &times;
              </span>
            </div>
          </div>
          <div className="utContainer">
            <div className="userBox">
              <p className="userDisplay">User: {this.username}</p>
            </div>
            <div className="timeBox">
              <p className="timeStamp"> {this.timeStamp}</p>
            </div>
          </div>
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
