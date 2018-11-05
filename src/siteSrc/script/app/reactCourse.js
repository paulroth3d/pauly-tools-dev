import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../style/react-course.scss';

import Person from '../components/Person';

class App extends Component {

  constructor(){
    super();
    this.state = {
      people: [{
        name: 'Paul',
        type: 'good',
        message: 'At least I try to be'
      }, {
        name: 'John',
        type: 'bad',
        message: null
      }],
      currentPerson: null
    };
    this.state.currentPerson = this.state.people[0];
    // this.switchNameHandler = this.switchNameHandler.bind(this);
  }

  switchNameHandler = () => {
    const newState = this.state;

    var currentPersonIndex = 0;
    if (this.state.currentPerson.name === 'John') {
      currentPersonIndex = 1;
    }

    var newPersonIndex = 0;
    if (currentPersonIndex === 0) {
      newPersonIndex = 1;
    } else {
      newPersonIndex = 0;
    }

    newState.currentPerson = this.state.people[newPersonIndex];
    this.setState(newState);
  }

  handlePersonSayHello = () => {
    console.log('person is saying hello');
  }

  /*
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty;
  }

  somethingHandler = () => {
    console.log('something else was clicked');
  }
  */

  /*
  switchNameHandler() {
    console.log('switch name was called');
  }
  */

  render() {

    return (
      <div className='App'>
        <h1>Hi. I'm a react app</h1>
        <p>This works</p>
        <Person name={this.state.currentPerson.name} type={this.state.currentPerson.type} clickHandler={this.handlePersonSayHello}>{this.state.currentPerson.message}</Person>
        <button onClick={this.switchNameHandler}>Switch Name</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);