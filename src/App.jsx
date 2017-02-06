import React, {Component} from 'react';
import PhotoList from './components/PhotoList';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class App extends Component {
    static childContextTypes =
    {
        muiTheme: React.PropTypes.object
    }

    getChildContext()
    {
        return {
            muiTheme: getMuiTheme()
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
         );
  }
}
