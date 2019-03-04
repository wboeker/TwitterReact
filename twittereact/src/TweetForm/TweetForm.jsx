import React, { Component } from 'react';
import './TweetForm.css';

class TweetForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      newTweetContent: '',
      username: '',
      timeStamp: '',
      filterUser: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);//binds this to the component
    this.changeUser = this.changeUser.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.writeTweet = this.writeTweet.bind(this);//this.writeTweet = this.writeNode.bind(this);
    this.filterByUser = this.filterByUser.bind(this);
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

  handleFilter(e){
    this.setState({
      filterUser: e.target.value, //the value of the text input
    })
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  constructDate() {
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

  filterByUser(){
    const user = this.state.filterUser;
    this.props.filterTweets(user);
  }

  writeTweet(){
    // call a method that sets the tweetContent for a note to
    // the value of the input
    const date = this.constructDate();
    // this.setState({
    //   timeStamp: date
    // });
    const content = this.state.newTweetContent;

    const user = this.props.username ? this.props.username.displayName : "";
    // const time = this.state.timeStamp;

    this.props.addTweet(content,user,date);
    //set newTweetContent back to an empty string (after onclick takes place)
    this.setState({
      newTweetContent: '',
    });
  }

  render(){
    return(
      <div className="formWrapper">
        <input className="filterInput"
        placeholder="filter by user"
        value={this.state.filterUser}
        onChange={this.handleFilter}/>

        <button className="filterButton"
        onClick={this.filterByUser}>Filter</button>

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
