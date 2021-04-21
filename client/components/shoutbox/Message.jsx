import React from 'react';


export default function Message(props) {
  return(
    <div className={props.className + " bg-white rounded p-3 animated fadeInUp fast"}>
      {props.message.text}
    </div>
  );
}
