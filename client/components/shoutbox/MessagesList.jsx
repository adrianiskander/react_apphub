import React from 'react';

import Message from './Message.jsx';


export default function MessagesList(props) {
  return(
    <div className={props.className}>
    {
      props.messages.map(message => {
        return <Message
          className="mb-3"
          key={message.uid}
          message={message}
        />
      })
    }
    </div>
  );
}
