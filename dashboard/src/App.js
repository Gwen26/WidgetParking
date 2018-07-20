import React, { Component } from 'react';
import { Dashboard, Widget } from 'react-realtime-dashboard';
import animatecss from 'animate.css';
import './App.css';
import Clock from 'clock';

class App extends Component {
    render() {
        return (
            <Dashboard row={4} col={3} gutter={10} animationClassIn='animated fadeIn' animationClassOut='animated fadeOut'>
                <Widget size='small'>
                    <Clock />
                </Widget>
            </Dashboard>
        );
    }
}

export default App;