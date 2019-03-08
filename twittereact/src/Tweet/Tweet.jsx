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
    this.loggedInUser = props.loggedInUser;

    this.state = {
      //map of users each user is following
      followMap: {},
    }
  }

  handleremoveTweet(id){
    this.props.removeTweet(id);
  }

  handleFollow(logInUser,followUser){
    alert(logInUser);
    alert(followUser);
    // const previousFollows = this.state.followMap;
    //
    // // this.database.on('child_added', snap => {
    // //   previousFollows.push({
    // //     id: snap.key,
    // //     username: snap.val().user,
    // //   })
    //
    //   this.setState({
    //     followMap: previousFollows,
    //   })
    // })
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
            <button className="followButton" onClick={() => this.handleFollow(this.loggedInUser,this.username)}>Follow</button>
        </div>
      )
  }
}

//set parameter type
Tweet.propTypes = {
  tweetContent:PropTypes.string,
  username:PropTypes.string,
  followUsername:PropTypes.string,
}

export default Tweet;
