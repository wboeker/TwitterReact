import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{
  constructor(props){
    super(props);
    //passing parameters
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
  }

  render(props){
      return(
        <div className="note fade-in">
          <p className="noteContent">{this.noteContent}</p>
        </div>
      )
  }
}

//set parameter type
Note.propTypes = {
  noteContent:PropTypes.string
}

export default Note;
