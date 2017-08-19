import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './App.css';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default App;
