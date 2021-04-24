import React from 'react';

import Navbar from './Navbar.jsx';
import TodoApp from './todo/TodoApp.jsx';
import Markdowned from './markdowned/Markdowned.jsx';
import ShoutboxApp from './shoutbox/ShoutboxApp.jsx';


const APPS = {
  'markdowned': <Markdowned />,
  'shoutbox': <ShoutboxApp />,
  'todo': <TodoApp />
};


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'currentAppName': ''
    };
    this.setAppName = this.setAppName.bind(this);
  }

  componentDidMount() {
    let appName = window.localStorage.getItem('appName');
    appName
      ? this.setAppName(appName)
      : this.setAppName(Object.keys(APPS)[0]);
  }

  setAppName(appName) {
    this.setState({
      'currentAppName': appName
    }, () => window.localStorage.setItem('appName', appName));
  }

  render() {
    return(
      <div>
        <Navbar
          appNames={Object.keys(APPS)}
          currentAppName={this.state.currentAppName}
          setAppName={this.setAppName}
        />
        {APPS[this.state.currentAppName]}
      </div>
    );
  }
}
