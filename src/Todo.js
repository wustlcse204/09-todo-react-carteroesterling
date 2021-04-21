import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <div class="content">
        <h1>Carter's ToDo App</h1>
        <input type="text" id="entry-box" onKeyUp="enterKeyPress(event)" placeholder="Enter ToDo Here"></input>
        <button type="button" id="submit" onClick="addItem()">Submit</button>
        <p id="TheList"></p>
      </div>
    );
  }
}

export default Todo;
