import React, { Component } from 'react';
import Tweet from './Tweet/Tweet';
import TweetForm from './TweetForm/TweetForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import queryString from 'query-string';

class App extends Component {

  constructor(props){
    super(props);
    this.addTweet = this.addTweet.bind(this);
    this.removeTweet = this.removeTweet.bind(this);
    this.seeUsers = this.seeUsers.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    //store list of tweets firebase
    this.database = this.app.database().ref().child('tweets');
    //going to setup React state of our component
    this.state = {
      //array of tweets
      tweets: [],
      usersVisible: false,
    }
  }

  componentWillMount(){
    const previousTweets = this.state.tweets;

    //DataSnapshot
    this.database.on('child_added', snap => {
      previousTweets.push({
        id: snap.key,
        tweetContent: snap.val().tweetContent,
        username: snap.val().username,
        timeStamp: snap.val().timeStamp,
      })

      this.setState({
        tweets: previousTweets
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousTweets.length; i++){
        if(previousTweets[i].id === snap.key){
          previousTweets.splice(i, 1);
        }
      }

      this.setState({
        tweets: previousTweets
      })
    })
  }

  addTweet(tweet, user, time){
    //user entered content pushed onto list in database
    this.database.push().set({tweetContent: tweet, username: user, timeStamp: time});
  }

  removeTweet(tweetId){
    this.database.child(tweetId).remove();
  }

  filterTweets(name){
    window.location= '/?user=' + name;
  }

  seeUsers(){
    debugger;
    this.setState({
      usersVisible: true,
    });
  }

  constructUsers(){
    var listUsers = [];
    for (var i = 0; i < this.state.tweets.length; i++) {
        listUsers.push(this.state.tweets[i].username);
    }
    var setUsers = new Set(listUsers);
    return setUsers;
  }

  helper() {
    const query = queryString.parse(window.location.search);
    if(this.state.usersVisible){
      const setUsers = this.constructUsers();
      var usersArray = Array.from(setUsers);
      debugger;
      return(
          usersArray.map((user) => {
            return (<Tweet username={user}/>);
          }
        )
      );
    } else {
      //map each note in tweets array into a note component
      return(
        this.state.tweets.map((tweet) => {
          if(!query.user || query.user === tweet.username){
            return (
              <Tweet username={tweet.username} tweetContent={tweet.tweetContent}
              tweetId={tweet.id} key={tweet.id} removeTweet ={this.removeTweet}
              timeStamp={tweet.timeStamp}/>
            );
          }
        })
      )
    }
  }

  render() {
    return (
      <div className="tweetsFooter">
        <div className="tweetsHeader">
          <div className="heading">Tweets</div>
        </div>
        <button className="userButton"
        onClick={this.seeUsers}>See all users</button>
        <div className="tweetsBody">
          {this.helper()}
        </div>
        <div className="tweetsFooter">
          <TweetForm filterTweets={this.filterTweets} setUser={this.setUser} addTweet={this.addTweet}/>
        </div>
      </div>
    );
  }
}

export default App;
