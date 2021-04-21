import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <section id="todos">
        <Todo />
        <NewTodo />
        
      </section>
    );
  }
}

export default App;
