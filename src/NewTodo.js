import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id="todo">
        <form onSubmit={this.props.addItem}>
          <input type="text" id = "entry-box" placeholder="Enter ToDo Here" value={this.props.input} onChange={this.props.onChange} />
          <button id="submit" className="submit" type="submit" onClick={this.props.addItem}>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
