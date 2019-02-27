import React, { Component } from 'react';
import logo from './logo.svg';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    //going to setup React state of our component
    this.state = {
      //array of notes
      notes: [
        { id: 1, noteContent: "Note 1 here!"},
        { id: 2, noteContent: "Note 2 here!"},
      ],
    }
  }

  addNote(note){
    //push the note onto the nodes array
    const previousNotes = this.state.notes;
    previousNotes.push({id: previousNotes.length+1, noteContent: note});
    this.setState({
      notes: previousNotes
    })
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
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;
