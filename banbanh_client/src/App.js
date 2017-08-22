import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './App.css';
import './header.css';
import './style.css';

import Header from './components/Header';
import Body from './components/Body';
import Contact from './components/Contact';
import Fooder from './components/Fooder';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Body />
                <Contact />
                <Fooder />
            </div>
        );
    }
}

export default App;
