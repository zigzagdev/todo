import React, { Component } from 'react'
import './App.css';
import ListContainer from './component/ListContainer'

   class App extends Component {
      render() {
        return (
            <div className="container">
            <div className="header">
             <h1>Content List</h1>
         </div>
         <ListContainer />
         </div>
       );
      }
    }

  export default App;
