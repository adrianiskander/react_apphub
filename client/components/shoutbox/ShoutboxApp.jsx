import React from 'react';

import {apiUrl} from './../../config.js';
import {scrollBottom} from './../../utils.js';

import MessageForm from './MessageForm.jsx';
import MessagesList from './MessagesList.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: `${apiUrl}/shoutbox`,
      messages: []
    }
    this.requestGetMessages = this.requestGetMessages.bind(this);
    this.requestPostMessage = this.requestPostMessage.bind(this);
  }

  componentDidMount() {
    this.requestGetMessages();
  }

  requestGetMessages() {
    let req = new XMLHttpRequest();
    req.open('GET', `${this.state.apiUrl}/messages`);
    req.send(null);
    req.onload = () => {
      if (req.status !== 200) return;
      let messages = JSON.parse(req.response).messages;
      this.setState({messages}, () => scrollBottom());
    }
  }

  requestPostMessage(message) {
    let req = new XMLHttpRequest();
    req.open('POST', `${this.state.apiUrl}/messages`);
    req.setRequestHeader('Content-Type', 'Application/JSON');
    req.send(JSON.stringify(message));
    req.onload = () => {
      if (req.status !== 201) return;
      let message = JSON.parse(req.response);
      let messagesCopy = [...this.state.messages];
      messagesCopy.push(message);
      this.setState({
        messages: messagesCopy
      }, () => scrollBottom());
    }
  }

  render() {
    return(
      <div className="container mt-3 mb-5 pb-4">
        <MessagesList
          messages={this.state.messages}
        />
        <MessageForm
          className="bg-white fixed-bottom p-3"
          requestPostMessage={this.requestPostMessage}
        />
      </div>
    );
  }
}
