import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">

                <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>

                <hr/>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>

            </div>
        </Router>
    );
  }
}

export default App;
