import React, {Component} from 'react';
import PhotoList from './components/PhotoList';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';

export default class App extends Component {

    render() {
        return (

            <div>
                <h1>Hello React </h1>
                <PhotoList />
            </div>
    );
  }
}
