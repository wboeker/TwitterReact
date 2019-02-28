import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addTweet = this.addTweet.bind(this);
    this.removeTweet = this.removeTweet.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    //store list of notes firebase
    this.database = this.app.database().ref().child('notes');
    //going to setup React state of our component
    this.state = {
      //array of notes
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    //DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        tweetContent: snap.val().tweetContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addTweet(note){
    //user entered content pushed onto list in database
    this.database.push().set({tweetContent: note});
  }

  removeTweet(noteId){
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {
            //map each note in notes array into a note component
            this.state.notes.map((note) => {
              return (
                <Note tweetContent={note.tweetContent} noteId={note.id} key={note.id} removeTweet ={this.removeTweet}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addTweet={this.addTweet}/>
        </div>
      </div>
    );
  }
}

export default App;
