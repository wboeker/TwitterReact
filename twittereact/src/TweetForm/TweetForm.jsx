import React, { Component } from 'react';
import './TweetForm.css';

class TweetForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      newTweetContent: '',
      username: '',
      timeStamp: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);//binds this to the component
    this.changeUser = this.changeUser.bind(this);
    this.writeTweet = this.writeTweet.bind(this);//this.writeTweet = this.writeNode.bind(this);
  }

  // When the user input changes, set the newTweetContent
  //to the value of what's in the input box
  handleUserInput(e){
    this.setState({
      newTweetContent: e.target.value, //the value of the text input
    })
  }

  changeUser(e){
    this.setState({
      username: e.target.value, //the value of the text input
    })
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  constructDate() {
    debugger;
    var d = new Date();
    var now = new Date();
    var x = "";
    var dmy = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    var h = this.addZero(d.getHours());
    var m = this.addZero(d.getMinutes());
    var s = this.addZero(d.getSeconds());
    x = dmy + " " + h + ":" + m + ":" + s;
    return x;
  }

  writeTweet(){
    // call a method that sets the tweetContent for a note to
    // the value of the input
    const content = this.state.newTweetContent;
    const user = this.state.username;
    const time = this.state.timeStamp;
    this.props.addTweet(content,user,time);
    //set newTweetContent back to an empty string (after onclick takes place)
    this.setState({
      newTweetContent: '',
      timeStamp: ''
    })
  }

  render(){
    return(
      <div className="formWrapper">
        <input className="usernameInput"
        placeholder="What's your username?"
        value={this.state.user}
        onChange={this.changeUser}/>

        <input className="tweetInput"
        placeholder="Write a new tweet..."
        value={this.state.newTweetContent}
        onChange={this.handleUserInput}/>

        <button className="tweetButton"
        onClick={this.writeTweet}>Tweet</button>
      </div>
    )
  }
  }

  export default TweetForm;
