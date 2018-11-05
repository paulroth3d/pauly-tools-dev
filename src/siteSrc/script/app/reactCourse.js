import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../style/react-course.scss';

import Person from '../components/Person';

class App extends Component {

  constructor(){
    super();
    this.state = {
      name: 'Paul',
      type: 'good'
    };
    this.switchNameHandler = this.switchNameHandler.bind(this);
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

  switchNameHandler() {
    console.log('switch name was called');
  }

  render() {

    return (
      <div className='App'>
        <h1>Hi. I'm a react app</h1>
        <p>This works</p>
        <Person name={this.state.name} type={this.state.type}>At least I try to be</Person>
        <button onClick={this.switchNameHandler}>Switch Name</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);