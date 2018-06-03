import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './actions/homeAction';

class App extends Component {


  render() {
    return (
        <div>
          <Home getMovieiddata={this.getMovie}/>
        </div> 
    );
  }
}

export default App;
