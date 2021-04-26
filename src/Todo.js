import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    var self= this;
    var checking = event.target.parentNode.id;
    var val = {completed: true};
    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // save new Todo to state
        self.setState({completed: true});
      }
    }
    createRequest.open("PUT", "https://cse204.work/todos/" + checking, true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", "436e43-c10a11-0b4d66-aca258-8b38cb");
    createRequest.send(JSON.stringify(val));
  }

  render() {
    var className = "todo";
    this.state = {completed: this.props.completed};
    if (this.state.completed) {
      className = "todo completed";
    }
    return (
      <div id= {this.props.id}>
        <button className="btn" onClick={this.props.remove}>X</button>
        <input id= "checkbox" className="checkbox" type="checkbox" onClick={this.toggle}></input>
        <p id="TheList">{this.props.text} </p>
      </div>
    );
  }
}

export default Todo;
