import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { todos: [], input: '' };
    this.addItem = this.addItem.bind(this);
    this.remove = this.remove.bind(this);
    this.alphabet = this.alphabet.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    // AJAX goes here
    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var todos = JSON.parse(this.responseText);
        // If AJAX successful, pare the JSON and save to state
        self.setState({ todos: todos });
      }
    };
    createRequest.open("GET", "https://cse204.work/todos", true);
    createRequest.setRequestHeader("x-api-key", "436e43-c10a11-0b4d66-aca258-8b38cb");
    createRequest.send();
  }

  addItem(event) {
    event.preventDefault();
    var self = this;
    const newText = this.state.input;
    var val = { text: newText };
    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // save new Todo to state
        self.setState({
          todos: [...self.state.todos, JSON.parse(this.responseText)]
        })
        // clear the input field
        self.setState({ input: '' });
      }
    };
    createRequest.open("POST", "https://cse204.work/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", "436e43-c10a11-0b4d66-aca258-8b38cb");
    createRequest.send(JSON.stringify(val));
  }

  remove(event) {
    event.preventDefault();
    var self = this;
    var removing = event.target.parentNode.id;
    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // You need the id of the todo you want to delete as a variable.
        const remainingTodos = self.state.todos.filter((todo) => {
          // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
          if (todo.id !== removing) {
            return todo;
          }
        });
        // Update state with filtered list using this.setState();
        self.setState({ todos: remainingTodos });
      }
    };
    createRequest.open("DELETE", "https://cse204.work/todos/" + removing, true);
    createRequest.setRequestHeader("x-api-key", "436e43-c10a11-0b4d66-aca258-8b38cb");
    createRequest.send();
  }

  alphabet(event) {
    var todos = this.state.todos;
    todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });
    this.setState({ todos: todos })
  }

  onChange(event) {
    // Set the state to the value of the input
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div className="content">
        <h1>Carter's ToDo App</h1>
        <NewTodo addItem={this.addItem} onChange={this.onChange} input={this.state.input} />
        <button id = "sort" className="sort" onClick={this.alphabet}>Sort</button>
        {this.state.todos.map((todo) =>
          <Todo key={todo.id} id={todo.id} completed={todo.completed}
            text={todo.text} remove={this.remove} />
        )}
      </div>
    );
  }
}

export default App;
